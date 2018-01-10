import React from 'react';
import styled from 'styled-components';
import { Input, Select, Button } from 'antd';

const { Option } = Select;

export interface ISetMainInputs {
  setType: 'global' | 'champion';
  type: string;
  map: string;
  mode: string;
  title: string;
  onChange(e: any): void;
  blockAdd(): void;
  saveSet(): void;
}

const InputsWrapper = styled.div`
  display: flex;
`;

export class SetMainInputs extends React.Component<ISetMainInputs> {
  // Faking default event type just to avoid writing handler for each select
  handleSelect = (name: string, value: string) => this.props.onChange({ currentTarget: { value, name } });

  render() {
    const { onChange, blockAdd, type, map, mode, setType, title, saveSet } = this.props;

    return (
      <InputsWrapper>
        <Input placeholder="Title" onChange={onChange} name="title" value={title} />

        <Button onClick={blockAdd}>Add block</Button>

        <Select value={setType} onChange={(value: string) => this.handleSelect('setType', value)}>
          <Option value="global">Global</Option>
          <Option value="champion">Champion</Option>
        </Select>

        <Select value={type} onChange={(value: string) => this.handleSelect('type', value)}>
          <Option value="global">id</Option>
          <Option value="custom">account</Option>
        </Select>

        <Select value={map} onChange={(value: string) => this.handleSelect('map', value)}>
          <Option value="any">Any</Option>
          <Option value="SR">Summoners Rift</Option>
          <Option value="HA">Howling Abyss</Option>
          <Option value="TT">Twisted Treeline</Option>
          <Option value="CS">Crystal Scar</Option>
        </Select>

        <Select value={mode} onChange={(value: string) => this.handleSelect('mode', value)}>
          <Option value="any">Any</Option>
          <Option value="CLASSIC">Classic</Option>
          <Option value="ARAM">Aram</Option>
          <Option value="ODIN">Odin</Option>
        </Select>

        <Button onClick={saveSet} type="primary">
          Save item set
        </Button>
      </InputsWrapper>
    );
  }
}
