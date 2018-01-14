import React from 'react';
import { Checkbox, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { IStore } from 'models';
import styled from 'styled-components';
import { toggleModal, toggleOption } from '../actions';

const Line = styled.div`
  margin-top: 10px;
`;

export class OptionsMain extends React.Component<any, any> {
  handleChange = (e: React.ChangeEvent<any>) => {
    const { name, checked } = e.target;

    return this.props.toggleOption({ name, value: checked });
  };

  render() {
    const { isVisible, toggleModal, initKeyCheck } = this.props;
    return (
      <Modal visible={isVisible} title="Options" footer={null} onCancel={() => toggleModal(false)}>
        <Line>
          <Checkbox name="initKeyCheck" onChange={this.handleChange} checked={initKeyCheck}>
            Check api key on init
          </Checkbox>
        </Line>
        <Line>
          <Checkbox disabled>Offline mode</Checkbox>
        </Line>
        <Line>
          <Button disabled>Update static</Button>
        </Line>
      </Modal>
    );
  }
}

export const ConnectedModal = connect(({ options }: IStore) => options, { toggleModal, toggleOption })(OptionsMain);
