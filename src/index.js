import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import reducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(logger, thunk),
    window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
