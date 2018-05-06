import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

fontawesome.library.add(faCheck, faPlus);

const mapStateToProps = (state) => {
  const props = {
    channelsEditState: state.channelsEditState,
    openedModal: state.currentOpenedModal.type,
    targetChannelId: state.currentOpenedModal.targetChannelId,
    targetChannelName: state.currentOpenedModal.targetChannelName,
    error: state.currentOpenedModal.error,
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
    this.textInput = React.createRef();
  }

  componentWillUpdate(next) {
    if (this.props.targetChannelId !== next.targetChannelId) {
      this.props.initialize({ name: next.targetChannelName });
    }
  }

  componentDidUpdate(prevProps) {
    // if (this.inputEl) {
    //   this.inputEl.setSelectionRange(0, 10);
    // }
    if (prevProps.targetChannelId === this.props.targetChannelId) {
      return;
    }
    if (this.textInput.current) {
      const input = this.textInput.current.getRenderedComponent();
      input.setSelectionRange(0, input.value.length);
    }
  }

  editChannel = async (values) => {
    if (!values.name) {
      return;
    }
    this.props.editChannel({
      id: this.props.targetChannelId,
      name: values.name,
    }, this.props.reset);
  }

  renderError = () => (
    <Alert color="danger">
      Oops... Something went wrong. Try one more time!
    </Alert>
  );

  render() {
    const disabled = this.props.channelsEditState === 'requested';
    const opened = this.props.openedModal === 'editModal';
    return (
        <Modal isOpen={opened} toggle={this.props.closeModal} autoFocus={false}>
          <ModalHeader toggle={this.props.closeModal}>Edit channel name</ModalHeader>
          <ModalBody>
            {this.props.error && this.renderError()}
            <form action="" onSubmit={this.props.handleSubmit(this.editChannel)}>
              <div className="input-group pt-3">
                <Field
                  name='name'
                  className="form-control form-control-lg border-dark rounded-0 shadow"
                  component='input'
                  type='text'
                  placeholder="new name"
                  ref={this.textInput}
                  autoFocus={true}
                  withRef
                />
                <div className="input-group-append">
                  <button className="btn btn-dark rounded-0 text-warning shadow" disabled={disabled} type="submit">
                    <FontAwesomeIcon icon="check"/>
                  </button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
    );
  }
}

EditModal.propTypes = {
  reset: PropTypes.func,
  editChannel: PropTypes.func,
  targetChannelId: PropTypes.number,
  error: PropTypes.bool,
  handleSubmit: PropTypes.func,
  channelsEditState: PropTypes.string,
  openedModal: PropTypes.string,
  initialize: PropTypes.func,
  closeModal: PropTypes.func,
};

export default reduxForm({
  form: 'newChannel',
})(EditModal);
