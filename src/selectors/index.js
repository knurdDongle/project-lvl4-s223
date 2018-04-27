import { createSelector } from 'reselect';

const getMessages = state => state.messages;

const getActiveChannel = state => state.currentChannelId;

const messagesSelector = createSelector(
  [getMessages, getActiveChannel],
  (msgs, activeChannelId) =>
    msgs.filter(msg => msg.channel === activeChannelId),
);

export default messagesSelector;

