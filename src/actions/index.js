import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const getChannels = createAction('CHANNELS_GET');
export const getUserName = createAction('USER_NAME_GET');
export const setActiveChannel = createAction('ACTIVE_CHANNEL_SET');
export const addNewMessage = createAction('NEW_MESSAGE_ADD');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessageToStorage = ({ message, author, channel }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const date = new Date();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const time = `${hours}:${minutes}`;
    const attributes = {
      message, author, channel, time,
    };
    await axios.post(routes.messagesUrl(channel), { data: { attributes } });
    dispatch(addMessageSuccess());
  } catch (e) {
    console.log(e);
    dispatch(addMessageFailure());
  }
};
