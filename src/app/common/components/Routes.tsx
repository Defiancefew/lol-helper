import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { App, DevTools, AppLayout, NoMatch } from './';
import { AuthForm } from '../../auth/components';

export const Routes = () => (
  <AppLayout>
    <DevTools />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/keycheck" component={AuthForm} />
      <Route component={NoMatch} />
    </Switch>
  </AppLayout>
);

export const ConnectedRoutes: any = connect(({ auth }: any) => auth, null)(Routes);
