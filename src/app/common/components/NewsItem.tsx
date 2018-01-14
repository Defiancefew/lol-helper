import React from 'react';
import styled from 'styled-components';
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
