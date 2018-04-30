import faker from 'faker';
// import gon from 'gon';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import gon from 'gon';
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
  { ...gon, user },
  compose(applyMiddleware(thunk)),
);

/* eslint-enable */

const socket = io();
socket.on('connect', () => console.log('connected'))
  .on('newMessage', (message) => {
    const { data: { attributes } } = message;
    store.dispatch(actions.addNewMessage(attributes));
  })
  .on('newChannel', (channel) => {
    const { data: { attributes } } = channel;
    store.dispatch(actions.addNewChannel(attributes));
  })
  .on('removeChannel', (channelToDelete) => {
    const { data: { id } } = channelToDelete;
    store.dispatch(actions.deleteChannel(id));
  })
  .on('renameChannel', (channel) => {
    const { data: { attributes: { name, id } } } = channel;
    store.dispatch(actions.renameChannel({ name, id }));
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
