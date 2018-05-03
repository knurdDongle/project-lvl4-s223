import { connect } from 'react-redux';
import Component from '../components/DeleteModal.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channelsDeleteState: state.channelsDeleteState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
