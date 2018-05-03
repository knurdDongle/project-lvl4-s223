import React from 'react';
import { Modal, ModalHeader, ModalBody, Alert } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';

fontawesome.library.add(faCheck, faPlus);

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
    try {
      await this.props.editChannel({
        id: this.props.targetChannelId,
        name: values.name,
      });
      this.props.reset();
      this.setState({
        error: false,
      });
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
    const disabled = this.props.channelsEditState === 'requested';
    if (this.inputEl) {
      this.inputEl.setSelectionRange(0, 10);
    }
    return (
        <Modal isOpen={this.props.modal} toggle={this.props.cleanModalState} autoFocus={false}>
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
  cleanModalState: PropTypes.func,
  handleModalError: PropTypes.func,
  editChannel: PropTypes.func,
  targetChannelId: PropTypes.number,
  modalError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  channelsEditState: PropTypes.string,
  modal: PropTypes.bool,
  initialize: PropTypes.func,
};

export default reduxForm({
  form: 'newChannel',
})(EditModal);
