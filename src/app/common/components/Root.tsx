import React from 'react';
import { Provider, Store } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { hot } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Routes } from './Routes';
import { ConnectedModal } from '../../auth/components';
import { IStore } from 'models';
import { History } from 'history';

export interface IRootProps {
  history: History;
  store: Store<IStore>;
  persistor: any;
  onBeforeLift(): void;
}

export const Root: React.SFC<IRootProps> = ({ history, store, persistor, onBeforeLift }) => (
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
