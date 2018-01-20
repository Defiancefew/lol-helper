import React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'models';
import { Input, Button, notification } from 'antd';
import styled from 'styled-components';
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
  text-align: center;
`;

export class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
  state = {
    apiValue: '',
  };

  onChange = (e: React.ChangeEvent<any>) => this.setState({ apiValue: e.currentTarget.value });

  onSubmit = () => {
    const { apiValue } = this.state;

    if (apiValue.length === 0) {
      return notification.error({
        message: 'Key is too short',
        description: '',
      });
    }

    return this.props.checkKey(this.state.apiValue);
  };

  render() {
    const { isApiChecked } = this.props;
    const { apiValue } = this.state;

    return (
      <Auth>
        <h2>Your key {isApiChecked ? 'is still valid' : 'has expired'}</h2>
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
