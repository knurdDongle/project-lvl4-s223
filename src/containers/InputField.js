import { connect } from 'react-redux';
import Component from '../components/InputField.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    username: state.user.name,
    channelId: state.currentChannelId,
    messageCreatingState: state.messageCreatingState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
