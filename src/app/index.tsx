import React from 'react';
import ReactDom from 'react-dom';
import Root from './common/components/Root';
import { history, configureStore } from './common/configureStore';
import 'antd/dist/antd.less'; // tslint:disable-line:no-submodule-imports
import { checkKey } from './auth/actions';

const { persistor, store } = configureStore();
const root = document.createElement('div');

const onBeforeLift = () => {
  store.dispatch(checkKey(store.getState().auth.apiKey));
};

document.body.appendChild(root);

ReactDom.render(<Root store={store} history={history} persistor={persistor} onBeforeLift={onBeforeLift} />, root);
