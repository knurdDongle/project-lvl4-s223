import { connect } from 'react-redux';
import Component from '../components/Display.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;

