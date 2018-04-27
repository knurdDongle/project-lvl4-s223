import { connect } from 'react-redux';
import Component from '../components/Display.jsx';
import * as actionCreators from '../actions';
import messagesSelector from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;

