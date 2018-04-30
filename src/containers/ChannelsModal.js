import { connect } from 'react-redux';
import Component from '../components/ChannelsModal.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channelsAddState: state.channelsAddState,
    channelsEditState: state.channelsEditState,
    channelsDeletingState: state.channelsDeletingState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
