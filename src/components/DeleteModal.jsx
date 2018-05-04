import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    channelsDeleteState: state.channelsDeleteState,
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
export default class DeleteModal extends React.Component {
  deleteChannel = async () => {
    try {
      await this.props.removeChannel(this.props.targetChannelId);
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
    const disabled = this.props.channelsDeleteState === 'requested';
    return (
        <Modal isOpen={this.props.modal} toggle={this.props.cleanModalState}>
          <ModalBody>
            {this.props.modalError && this.renderError()}
            <h4>Are you sure you want delete
              <span className="text-danger">
                {` ${this.props.targetChannelName}`}
              </span> channel?
            </h4>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" disabled={disabled} onClick={() => this.deleteChannel()}>DELETE</Button>
            <Button color="secondary" onClick={() => this.props.cleanModalState()}>CANCEL</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

DeleteModal.propTypes = {
  cleanModalState: PropTypes.func,
  handleModalError: PropTypes.func,
  removeChannel: PropTypes.func,
  targetChannelId: PropTypes.number,
  modalError: PropTypes.bool,
  channelsDeleteState: PropTypes.string,
  modalState: PropTypes.string,
  targetChannelName: PropTypes.string,
  modal: PropTypes.bool,
};
