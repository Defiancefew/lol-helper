import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { logger, isDev } from 'utils';
import { routerMiddleware } from 'react-router-redux';
import DevTools from './components/DevTools';
import { rootReducer } from './rootReducer';
import { createBrowserHistory } from 'history';
import { persistStore } from 'redux-persist';

export const history = createBrowserHistory();
const router = routerMiddleware(history);

export function configureStore(initialState?: any) {
  const middlewares = [thunk, router];

  if (isDev) {
    middlewares.push(logger);
  }

  const composeArguments = [applyMiddleware(...middlewares)];

  if (isDev) {
    composeArguments.push(DevTools.instrument());
  }

  const store = createStore(rootReducer, initialState, compose.apply(null, composeArguments));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  const persistor = persistStore(store);

  return { store, persistor };
}
