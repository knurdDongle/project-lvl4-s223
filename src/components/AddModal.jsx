import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';

fontawesome.library.add(faPlus);

class AddModal extends React.Component {
  addChannel = async (values) => {
    if (!values.text) {
      return;
    }
    try {
      await this.props.addChannel({
        name: values.text,
      });
      this.props.reset();
      this.props.cleanModalState();
    } catch (e) {
      this.props.handleModalError();
    }
  }

  renderError = () => (
    <Alert color="danger">
      Oops... Something went wrong. Try one more time!
    </Alert>
  );

  render() {
    const disabled = this.props.channelsAddState === 'requested';
    return (
        <Modal isOpen={this.props.modal} toggle={this.props.cleanModalState} autoFocus={false}>
          <ModalHeader toggle={this.props.cleanModalState}>Add Channel</ModalHeader>
          <ModalBody>
            {this.props.modalError && this.renderError()}
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
  cleanModalState: PropTypes.func,
  handleModalError: PropTypes.func,
  targetChannelId: PropTypes.number,
  channelsAddState: PropTypes.string,
  modalError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  modalState: PropTypes.string,
  targetChannelName: PropTypes.string,
  modal: PropTypes.bool,
};

export default reduxForm({
  form: 'newChannel',
})(AddModal);
