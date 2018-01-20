import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Checkbox, Button, Row, Col, Input } from 'antd';

export interface ISetCategoriesState {
  isFiltersShown: boolean;
}

export interface ISetCategoriesProps {
  categories: {
    [key: string]: boolean;
  };
  onChange(name: string): void;
  searchItem(e: React.ChangeEvent<any>): void;
}

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 10px 0;
`;

export class SetCategories extends React.Component<ISetCategoriesProps, ISetCategoriesState> {
  state = {
    isFiltersShown: false,
  };

  toggleFilters = () =>
    this.setState(prevState => ({
      isFiltersShown: !prevState.isFiltersShown,
    }));

  render() {
    const { isFiltersShown } = this.state;
    const { categories, onChange, searchItem } = this.props;
    const chunkKeys = _.chunk(_.keys(categories), 5);
    const mapChunks = _.map(chunkKeys, (chunk, idx) => (
      <Row key={idx}>
        {_.map(chunk, (category: string) => (
          <Col span={4} key={category}>
            <Checkbox onChange={() => onChange(category)} checked={categories[category]} key={category} name={category}>
              {category}
            </Checkbox>
          </Col>
        ))}
      </Row>
    ));

    return (
      <div>
        <ButtonsWrapper>
          <Button icon="filter" onClick={this.toggleFilters} />
          <Input placeholder="search" onChange={searchItem} />
        </ButtonsWrapper>
        {isFiltersShown && <div>{mapChunks}</div>}
      </div>
    );
  }
}
