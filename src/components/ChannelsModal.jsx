import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';

fontawesome.library.add(faCheck, faPlus);

class ChannelsModal extends React.Component {
  addChannel = async (values) => {
    if (!values.text) {
      return;
    }
    try {
      await this.props.addChannelToStorage({
        name: values.text,
      });
      this.props.reset();
      this.props.cleanModalState();
    } catch (e) {
      this.props.handleModalError();
    }
  }

  deleteChannel = async () => {
    try {
      await this.props.deleteChannelFromStorage(this.props.targetChannelId);
      this.props.cleanModalState();
    } catch (e) {
      this.props.handleModalError();
    }
  }

  editChannel = async (values) => {
    if (!values.name) {
      return;
    }
    try {
      await this.props.editChannelInStorage({
        id: this.props.targetChannelId,
        name: values.name,
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

  default = () => null;

  add = () => {
    const disabled = this.props.channelsAddState === 'requested';
    return (
      <div>
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
              />
              <div className="input-group-append">
                <button className="btn btn-dark rounded-0 text-warning shadow" disabled={disabled} type="submit">
                  <FontAwesomeIcon icon="plus"/>
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
      </div>
    );
  }
  delete = () => {
    const disabled = this.props.channelsDeletingState === 'requested';
    return (
    <div>
      <ModalBody>
        {this.props.modalError && this.renderError()}
        <h4>Are you sure you want delete
          <span className="text-danger">
            {` ${this.props.targetChannelName.toUpperCase()}`}
          </span> channel?
        </h4>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" disabled={disabled} onClick={() => this.deleteChannel()}>DELETE</Button>
        <Button color="secondary" onClick={() => this.props.cleanModalState()}>CANCEL</Button>
      </ModalFooter>
    </div>
    );
  }

  edit = () => {
    const disabled = this.props.channelsEditState === 'requested';
    return (
      <div>
        <ModalHeader toggle={this.props.cleanModalState}>Edit channel name</ModalHeader>
        <ModalBody>
          {this.props.modalError && this.renderError()}
          <form action="" onSubmit={this.props.handleSubmit(this.editChannel)}>
            <div className="input-group pt-3">
              <Field
                name='name'
                className="form-control form-control-lg border-dark rounded-0 shadow"
                component='input'
                type='text'
                placeholder="new name"
              />
              <div className="input-group-append">
                <button className="btn btn-dark rounded-0 text-warning shadow" disabled={disabled} type="submit">
                  <FontAwesomeIcon icon="check"/>
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
      </div>
    );
  }
  render() {
    return (
        <Modal isOpen={this.props.modal} toggle={this.props.cleanModalState}>
          { this[this.props.modalState]() }
        </Modal>
    );
  }
}

ChannelsModal.propTypes = {
  addChannelToStorage: PropTypes.func,
  reset: PropTypes.func,
  cleanModalState: PropTypes.func,
  handleModalError: PropTypes.func,
  deleteChannelFromStorage: PropTypes.func,
  editChannelInStorage: PropTypes.func,
  targetChannelId: PropTypes.number,
  channelsAddState: PropTypes.string,
  modalError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  channelsDeletingState: PropTypes.string,
  channelsEditState: PropTypes.string,
  modalState: PropTypes.string,
  targetChannelName: PropTypes.string,
  modal: PropTypes.bool,
};

export default reduxForm({
  form: 'newChannel',
})(ChannelsModal);
