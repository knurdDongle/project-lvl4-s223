import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(faPaperPlane);

class InputField extends React.Component {
  addMessage = (values) => {
    if (!values.text) {
      return;
    }
    this.props.reset();
    this.props.addMessageToStorage({
      message: values.text, author: this.props.username, channel: this.props.channelId,
    });
  }
  render() {
    const disabled = this.props.messageCreatingState === 'requested';
    return (
      <div className="input-field fixed-bottom offset-6 col-6 offset-xs-6 col-xs-6 offset-md-3 col-sm-8 offset-sm-4 col-md-9 offset-xl-2 col-xl-10"
        style={{ bottom: '10px' }}>
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
  addMessageToStorage: PropTypes.func,
  username: PropTypes.string,
  channelId: PropTypes.number,
  messageCreatingState: PropTypes.string,
};

export default reduxForm({
  form: 'newMessage',
})(InputField);
