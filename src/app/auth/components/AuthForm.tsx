import React from 'react';
import { connect } from 'react-redux';
import { IStore } from 'models';
import { Input, Button } from 'antd';
import { checkKey } from '../actions';
import { AuthFormWrapper } from './';

export interface IAuthFormState {
  apiValue: string;
}

export interface IConnectedDispatch {
  checkKey: typeof checkKey;
}

type IAuthFormProps = IConnectedDispatch & IStore['auth'];

export class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
  state = {
    apiValue: '',
  };

  onChange = (e: React.ChangeEvent<any>) => this.setState({ apiValue: e.currentTarget.value });

  onSubmit = () => this.props.checkKey(this.state.apiValue);

  render() {
    return (
      <AuthFormWrapper>
        <Input onChange={this.onChange} placeholder="Enter your api key" />
        <Button onClick={this.onSubmit}>Submit</Button>
      </AuthFormWrapper>
    );
  }
}

export const connectedAuthForm = connect<IStore['auth'], IConnectedDispatch>(({ auth }: IStore) => auth, {
  checkKey,
})(AuthForm);
