import { connect } from 'react-redux';
import Component from '../components/ChannelsMenu.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannel: state.currentChannelId,
    user: state.user,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
