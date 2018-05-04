import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import Radium from 'radium';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

fontawesome.library.add(faPaperPlane);

const mapStateToProps = (state) => {
  const props = {
    username: state.user.name,
    channelId: state.currentChannelId,
    messageCreatingState: state.messageCreatingState,
  };
  return props;
};

const styles = {
  inpt: {
    '@media screen and (min-width: 800px)': {
      marginLeft: '280px',
      color: 'red',
    },
    bottom: '10px',
    marginLeft: '10px',
    zIndex: '1',
  },
};

class InputField extends React.Component {
  addMessage = (values) => {
    if (!values.text) {
      return;
    }
    this.props.reset();
    this.props.addMessage({
      message: values.text, author: this.props.username, channel: this.props.channelId,
    });
  }
  render() {
    const disabled = this.props.messageCreatingState === 'requested';
    return (
      <div className="input-field fixed-bottom pr-2"
        style={styles.inpt}
       >
        <form action="" onSubmit={this.props.handleSubmit(this.addMessage)}>
          <div className="input-group pt-3">
            <Field
              name='text'
              className="form-control form-control-lg border-dark rounded-0 shadow"
              component='input'
              type='text'
              placeholder="Write a message" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0 text-warning shadow" disabled={disabled} type="submit">
                <FontAwesomeIcon icon="paper-plane"/> Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

InputField.propTypes = {
  reset: PropTypes.func,
  addTask: PropTypes.func,
  handleSubmit: PropTypes.func,
  addMessage: PropTypes.func,
  username: PropTypes.string,
  channelId: PropTypes.number,
  messageCreatingState: PropTypes.string,
};

export default connect(mapStateToProps, actionCreators)(reduxForm({
  form: 'newMessage',
})(Radium(InputField)));
