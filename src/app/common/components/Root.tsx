import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Routes } from './Routes';
import { ConnectedModal } from '../../auth/components';

export const Root: React.SFC<any> = ({ history, store, persistor, onBeforeLift }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
        <ConnectedModal />
        <Routes />
      </PersistGate>
    </ConnectedRouter>
  </Provider>
);

export default hot(module)(Root);
