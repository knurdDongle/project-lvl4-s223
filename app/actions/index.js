import { createActions } from 'redux-actions';

export const getChannels = createActions('CHANNELS_GET');
export const getUserName = createActions('USER_NAME_GET');
export const setActiveChannel = createActions('ACTIVE_CHANNEL_SET');
export const addNewMessage = createActions('NEW_MESSAGE_ADD');
