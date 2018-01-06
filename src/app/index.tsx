import React from 'react';
import ReactDom from 'react-dom';
import Root from './common/components/Root';
import { history, configureStore } from './common/configureStore';
import 'antd/dist/antd.less'; // tslint:disable-line:no-submodule-imports

const store = configureStore();
const root = document.createElement('div');

document.body.appendChild(root);

ReactDom.render(<Root store={store} history={history} />, root);
