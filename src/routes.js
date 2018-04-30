const root = 'api/v1';

export default {
  messagesUrl: channelId => [root, 'channels', channelId, 'messages'].join('/'),
  channelsUrl: () => [root, 'channels'].join('/'),
  deleteOrEditChannelUrl: channelId => [root, 'channels', channelId].join('/'),
};
