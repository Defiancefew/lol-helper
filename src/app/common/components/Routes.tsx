import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App, DevTools } from './';

export const Routes = () => (
  <div>
    <DevTools />
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </div>
);
