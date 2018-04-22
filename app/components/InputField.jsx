import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  addMessage = (values) => {
    this.props.reset();
    this.props.addTask({ text: values.text });
  }
  render() {
    return (
      <div className="input-field fixed-bottom offset-6 col-6 offset-xs-6 col-xs-6 offset-md-3 col-sm-8 offset-sm-4 col-md-9  offset-xl-2 col-xl-10">
        <form action="" onSubmit={this.props.handleSubmit(this.addMessage)}>
          <div className="form-group pt-3">
            <Field name='text' required component='input' type='text' placeholder="Write a message" />
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
};

export default reduxForm({
  form: 'newMessage',
})(InputField);
