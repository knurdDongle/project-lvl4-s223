import faker from 'faker';
// import gon from 'gon';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App.jsx';
import reducers from './reducers';
import '../assets/application.css';
import * as actions from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (!cookies.get('slackProject')) {
  cookies.set('slackProject', { name: faker.name.findName() }, { expires: 7 });
}
const user = cookies.getJSON('slackProject');

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  { ...window.gon, user },
  compose(applyMiddleware(thunk)),
);

/* eslint-enable */

const socket = io(window.location.hostname);
socket.on('newMessage', (message) => {
  const { data: { attributes } } = message;
  store.dispatch(actions.addNewMessage(attributes));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
