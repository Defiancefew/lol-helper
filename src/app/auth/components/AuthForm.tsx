import React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'models';
import { Input, Button } from 'antd';
import styled from 'styled-components';
import { checkKey } from '../actions';
import { Icon } from '../../common/components';

export interface IAuthFormState {
  apiValue: string;
}

export interface IConnectedDispatch {
  checkKey: typeof checkKey;
}

type IAuthFormProps = IConnectedDispatch & IStore['auth'];

const ModalWrapper = styled.div`
  display: flex;
`;

const AuthWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
`;

export class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
  state = {
    apiValue: '',
  };

  onChange = (e: React.ChangeEvent<any>) => this.setState({ apiValue: e.currentTarget.value });

  onSubmit = () => this.props.checkKey(this.state.apiValue);

  render() {
    const { isApiChecked } = this.props;
    const { apiValue } = this.state;

    return (
      <AuthWrapper>
        <h2>Your key {isApiChecked ? 'is still valid' : 'has expired'}</h2>
        <ModalWrapper>
          <Input value={apiValue} onChange={this.onChange} placeholder="Enter your api key" />
          <Button type="primary" onClick={this.onSubmit}>
            Submit
          </Button>
        </ModalWrapper>
      </AuthWrapper>
    );
  }
}

export const connectedAuthForm = connect<IStore['auth'], IConnectedDispatch>(({ auth }: IStore) => auth, {
  checkKey,
})(AuthForm);
