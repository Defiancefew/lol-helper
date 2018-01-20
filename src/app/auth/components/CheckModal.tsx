import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IStore } from 'models';
import { Modal, Spin } from 'antd';

export class ApiCheckModal extends React.Component<any, any> {
  render() {
    const { isLoading } = this.props;

    return (
      <Modal visible={isLoading} footer={null}>
        <Spin /> Checking your api key
      </Modal>
    );
  }
}

export const ConnectedModal = connect(({ auth }: IStore) => auth)(ApiCheckModal);

export const StyledModal = styled(ConnectedModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
