import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import newsMock from '../__mocks__/news.json';
import _ from 'lodash';

const StyledItem = styled.div`
  display: block;
  width: 33%;
  padding: 10px;
  & h3 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  & img {
    max-width: 100%;
    height: 180px;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;

// Reordering blocks since we are recieving rss
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  & .field-type-file {
    order: 0;
  }
  & .field-name-field-body-small {
    order: 1;
  }
  & .field-name-custom-author {
    margin-top: 10px;
    order: 2;
  }
`;

export interface INewsItemProps {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export const NewsItem: React.StatelessComponent<INewsItemProps> = ({ title, description, pubDate, link }) => {
  const stringToReplace = '/sites/default/files/';
  const replaceImgUrl = _.replace(description, stringToReplace, `https://euw.leagueoflegends.com${stringToReplace}`);
  return (
    <StyledItem>
      <h3>
        <a href={link}>{title}</a>
      </h3>
      <StyledContent dangerouslySetInnerHTML={{ __html: replaceImgUrl }} />
    </StyledItem>
  );
};

export interface INewsState {
  current: number;
  pageSize: number;
  news: any[];
}

const NewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-start;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export class News extends React.Component<{}, INewsState> {
  state: any = {
    current: 1,
    pageSize: 9,
    news: [],
  };

  componentDidMount() {
    // TODO: Remove mock once i choose where to store news
    this.setState({
      news: _.get(newsMock, 'rss.channel[0].item', []),
    });
  }

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
        <h1>Latest news:</h1>
        <NewsContainer>
          {_.map(this.paginate(), (singleStory: INewsItemProps, idx) => <NewsItem key={idx} {...singleStory} />)}
        </NewsContainer>
        <PaginationWrapper>
          <Pagination total={news.length} pageSize={pageSize} current={current} onChange={this.onChange} />
        </PaginationWrapper>
      </div>
    );
  }
}
