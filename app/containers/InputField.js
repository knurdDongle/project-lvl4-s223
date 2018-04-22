import { connect } from 'react-redux';
import Component from '../components/InputField.jsx';
import * as actionCreators from '../actions';

const mapStateToProps = () => {
  const props = {};
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;
