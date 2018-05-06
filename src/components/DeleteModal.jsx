import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channelsDeleteState: state.channelsDeleteState,
    openedModal: state.currentOpenedModal.type,
    targetChannelId: state.currentOpenedModal.targetChannelId,
    targetChannelName: state.currentOpenedModal.targetChannelName,
    error: state.currentOpenedModal.error,
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
export default class DeleteModal extends React.Component {
  deleteChannel = () => {
    this.props.removeChannel(this.props.targetChannelId);
  }

  renderError = () => (
    <Alert color="danger">
      Oops... Something went wrong. Try one more time!
    </Alert>
  );

  render() {
    const disabled = this.props.channelsDeleteState === 'requested';
    const opened = this.props.openedModal === 'deleteModal';
    return (
        <Modal isOpen={opened} toggle={this.props.closeModal}>
          <ModalBody>
            {this.props.error && this.renderError()}
            <h4>Are you sure you want delete
              <span className="text-danger">
                {` ${this.props.targetChannelName}`}
              </span> channel?
            </h4>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" disabled={disabled} onClick={() => this.deleteChannel()}>DELETE</Button>
            <Button color="secondary" onClick={this.props.closeModal}>CANCEL</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

DeleteModal.propTypes = {
  removeChannel: PropTypes.func,
  targetChannelId: PropTypes.number,
  error: PropTypes.bool,
  channelsDeleteState: PropTypes.string,
  modalState: PropTypes.string,
  targetChannelName: PropTypes.string,
  openedModal: PropTypes.string,
  closeModal: PropTypes.func,
};
