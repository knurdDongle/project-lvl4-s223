import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions({
  [actions.getChannels](state, { payload: { ch } }) {
    return { ...state, ch };
  },
}, {});

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload: { channelId } }) {
    return { ...state, currentChannelId: channelId };
  },
}, {});

const messages = handleActions({
  [actions.addNewMessage](state, { payload: { message } }) {
    return { ...state, message };
  },
}, {});

const user = handleActions({
  [actions.getUser](state, { payload: { userObj } }) {
    return { ...state, user: userObj };
  },
}, {});

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  user,
  form: formReducer,
});

