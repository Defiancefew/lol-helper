import React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'models';
import { Input, Button, notification } from 'antd';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { checkKey } from '../actions';

export interface IAuthFormState {
  apiValue: string;
}

export interface IConnectedDispatch {
  checkKey: typeof checkKey;
}

type IAuthFormProps = IConnectedDispatch & IStore['auth'];

const Modal = styled.div`
  display: flex;
`;

const Auth = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const KeyWrapper = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const Title = ({ isApiChecked, apiKey, onClick }: any) => (
  <p>
    {apiKey.length === 0 ? (
      'No api key specified'
    ) : (
      <span>
        Api key <KeyWrapper onClick={onClick}>{apiKey}</KeyWrapper>
        {isApiChecked ? ' is still valid' : ' has expired'}
      </span>
    )}
  </p>
);

export class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
  state = {
    apiValue: '',
  };

  onChange = (e: React.ChangeEvent<any>) => this.setState({ apiValue: e.currentTarget.value });

  onSubmit = () => {
    const { apiValue } = this.state;

    if (apiValue.length === 0) {
      return notification.error({
        message: 'Key is empty',
        description: '',
      });
    }

    return this.props.checkKey(this.state.apiValue);
  };

  onClick = () => {
    notification.info({
      message: 'Key copied to clipboard',
      description: '',
    });

    return copy(this.props.apiKey);
  };

  render() {
    const { isApiChecked, apiKey } = this.props;
    const { apiValue } = this.state;

    return (
      <Auth>
        <Title isApiChecked={isApiChecked} apiKey={apiKey} onClick={this.onClick} />
        <Modal>
          <Input value={apiValue} onChange={this.onChange} placeholder="Enter your api key" />
          <Button type="primary" onClick={this.onSubmit}>
            Submit
          </Button>
        </Modal>
      </Auth>
    );
  }
}

export const connectedAuthForm = connect(({ auth }: IStore) => auth, {
  checkKey,
})(AuthForm);
