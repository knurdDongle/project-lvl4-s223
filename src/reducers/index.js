import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const defaultChannel = 1;

const currentOpenedModal = handleActions({
  [actions.openModal](state, { payload: { type, targetChannelId, targetChannelName } }) {
    return {
      ...state,
      type,
      targetChannelId: targetChannelId || null,
      targetChannelName: targetChannelName || null,
    };
  },
  [actions.closeModal](state) {
    return {
      ...state, type: 'none', targetChannelId: null, targetChannelName: null, error: false,
    };
  },
  [actions.handleModalError](state) {
    return {
      ...state, error: true,
    };
  },
}, {
  type: 'none', targetChannelId: null, targetChannelName: null, error: null,
});

const channels = handleActions({
  [actions.getChannels](state, { payload: { ch } }) {
    return { ...state, ch };
  },
  [actions.addNewChannel](state, { payload: channel }) {
    return [...state, channel];
  },
  [actions.deleteChannel](state, { payload: id }) {
    return state.filter(channel => channel.id !== id);
  },
  [actions.renameChannel](state, { payload: { id, name } }) {
    const newState = state.map(channel =>
      (channel.id === id ? { ...channel, name } : channel));
    return newState;
  },
}, {});

const currentChannelId = handleActions({
  [actions.setActiveChannel](state, { payload: channelId }) {
    return channelId;
  },
  [actions.deleteChannel](state, { payload: id }) {
    return state === id ? defaultChannel : state;
  },
}, {});

const messages = handleActions({
  [actions.addNewMessage](state, { payload: message }) {
    return [...state, message];
  },
  [actions.deleteChannel](state, { payload: id }) {
    return state.filter(msg => msg.channel !== id);
  },
}, {});

const user = handleActions({
  [actions.getUser](state, { payload: { userObj } }) {
    return { ...state, user: userObj };
  },
}, {});

const messageCreatingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const channelsDeletingState = handleActions({
  [actions.deleteChannelRequest]() {
    return 'requested';
  },
  [actions.deleteChannelFailure]() {
    return 'failed';
  },
  [actions.deleteChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const channelsAddState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
}, 'none');

const channelsEditState = handleActions({
  [actions.editChannelRequest]() {
    return 'requested';
  },
  [actions.editChannelFailure]() {
    return 'failed';
  },
  [actions.editChannelSuccess]() {
    return 'successed';
  },
}, 'none');

export default combineReducers({
  channels,
  currentChannelId,
  messageCreatingState,
  messages,
  user,
  channelsDeletingState,
  channelsAddState,
  channelsEditState,
  currentOpenedModal,
  form: formReducer,
});

