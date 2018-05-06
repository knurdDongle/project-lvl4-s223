import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

fontawesome.library.add(faPlus);

const mapStateToProps = (state) => {
  const props = {
    channelsAddState: state.channelsAddState,
    openedModal: state.currentOpenedModal.type,
    error: state.currentOpenedModal.error,
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
class AddModal extends React.Component {
  addChannel = (values) => {
    if (!values.text) {
      return;
    }
    this.props.addChannel({ name: values.text }, this.props.reset);
  }

  renderError = () => (
    <Alert color="danger">
      Oops... Something went wrong. Try one more time!
    </Alert>
  );

  render() {
    const disabled = this.props.channelsAddState === 'requested';
    const opened = this.props.openedModal === 'addModal';
    return (
        <Modal isOpen={opened} toggle={this.props.closeModal} autoFocus={false}>
          <ModalHeader toggle={this.props.closeModal}>Add Channel</ModalHeader>
          <ModalBody>
            {this.props.error && this.renderError()}
            <form action="" onSubmit={this.props.handleSubmit(this.addChannel)}>
              <div className="input-group pt-3">
                <Field
                  name='text'
                  className="form-control form-control-lg border-dark rounded-0 shadow"
                  component='input'
                  type='text'
                  placeholder="channel name"
                  autoFocus={true}
                />
                <div className="input-group-append">
                  <button className="btn btn-dark rounded-0 text-warning shadow" disabled={disabled} type="submit">
                    <FontAwesomeIcon icon="plus"/>
                  </button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
    );
  }
}

AddModal.propTypes = {
  addChannel: PropTypes.func,
  reset: PropTypes.func,
  targetChannelId: PropTypes.number,
  channelsAddState: PropTypes.string,
  error: PropTypes.bool,
  handleSubmit: PropTypes.func,
  modalState: PropTypes.string,
  targetChannelName: PropTypes.string,
  openedModal: PropTypes.string,
  closeModal: PropTypes.func,
};

export default reduxForm({
  form: 'newChannel',
})(AddModal);
