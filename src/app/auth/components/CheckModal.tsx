import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Modal, Spin } from 'antd';

export class ApiCheckModal extends React.Component<any, any> {
  render() {
    const { isLoading, isApiChecked } = this.props;

    return (
      <Modal visible={isLoading} footer={null}>
        <Spin /> Checking your api key
      </Modal>
    );
  }
}

export const StyledModal = styled(ApiCheckModal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConnectedModal: any = connect(({ auth }: any) => auth, null)(StyledModal);
