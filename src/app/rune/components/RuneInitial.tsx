import React from 'react';
import styled from 'styled-components';

export interface IRuneInitialProps {
  id: number;
  title: string;
  selectPrimary(idx: number): void;
}

const Wrapper = styled.div`
  width: 185px;
  height: 390px;
  background: ${props => `url('/static/img/runes/${props.title}.jpg')`};
  background-size: cover;
  filter: brightness(50%);
  transition: filter 0.3s;
  &:hover {
    cursor: pointer;
    filter: brightness(125%) contrast(115%);
  }
`;

export class RuneInitial extends React.Component<IRuneInitialProps> {
  onRuneClick = () => this.props.selectPrimary(this.props.id);

  render() {
    const { title, id } = this.props;
    return (
      <Wrapper title={title.toLowerCase()} onClick={this.onRuneClick}>
        {title}
      </Wrapper>
    );
  }
}
