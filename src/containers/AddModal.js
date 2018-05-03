import { connect } from 'react-redux';
import Component from '../components/AddModal.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channelsAddState: state.channelsAddState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
