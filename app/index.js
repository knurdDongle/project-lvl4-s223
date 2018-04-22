import faker from 'faker';
// import gon from 'gon';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App.jsx';
import reducers from './reducers';
import '../assets/application.css';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

let user;
if (!cookies.get('slackProject')) {
  user = { name: faker.name.findName() };
  cookies.set('slackProject', { ...user }, { expires: 7 });
} else {
  user = cookies.getJSON('slackProject');
}
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  { ...window.gon, user },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
