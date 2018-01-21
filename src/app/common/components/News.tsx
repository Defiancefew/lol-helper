import React from 'react';
import { Pagination, notification } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { parseString } from 'xml2js';
import _ from 'lodash';
import { newsUrl } from 'utils';
import { NewsItem, INewsItemProps } from './';
import { INewsItem } from 'models';

export interface INewsState {
  current: number;
  pageSize: number;
  news: INewsItem[];
}

const NewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-start;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
`;

export class News extends React.Component<{}, INewsState> {
  state: any = {
    current: 1,
    pageSize: 9,
    news: [],
  };

  setNews = (news: any) => this.setState({ news: _.get(news, 'rss.channel[0].item', []) });

  componentDidMount() {
    return axios({
      url: newsUrl,
      transformRequest: [
        (data, headers) => {
          // This is needed to avoid access error since axios adds X-Riot-Token on every request
          delete headers.common['X-Riot-Token'];
          return data;
        },
      ],
    })
      .then(resp => {
        if (resp.status === 200) {
          return parseString(resp.data, (err: any, news: any) => {
            if (err) {
              this.emitError('Failed to parse downoladed news');
            }

            return this.setNews(news);
          });
        }

        return this.emitError('Failed to load news');
      })
      .catch(err => this.emitError());
  }

  emitError = (message?: string) =>
    notification.error({
      message: message || 'Unexpected error',
      description: '',
    });

  paginate() {
    const { current, pageSize, news } = this.state;
    const pageNumber = current - 1;
    return _.slice(news, pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }

  onChange = (current: number) => this.setState({ current });

  render() {
    const { current, news, pageSize } = this.state;

    return (
      <div>
        <h1>News</h1>
        <NewsContainer>
          {_.map(this.paginate(), (singleStory: INewsItemProps, idx) => <NewsItem key={idx} {...singleStory} />)}
        </NewsContainer>
        <Footer>
          {!_.isEmpty(news) && (
            <Pagination total={news.length} pageSize={pageSize} current={current} onChange={this.onChange} />
          )}
        </Footer>
      </div>
    );
  }
}
