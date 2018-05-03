import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import EditModal from '../containers/EditModal';
import DeleteModal from '../containers/DeleteModal';
import AddModal from '../containers/AddModal';

fontawesome.library.add(faPlusCircle, faPencilAlt, faTrashAlt);

export default class ChannelsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      editModal: {
        modalIsOpen: false,
        targetChannelId: null,
        targetChannelName: '',
        modalError: false,
      },
      deleteModal: {
        modalIsOpen: false,
        targetChannelId: null,
        targetChannelName: '',
        modalError: false,
      },
      addModal: {
        modalIsOpen: false,
        modalError: false,
      },
    };
  }

  onSetSidebar = (open) => {
    this.setState({
      ...this.state,
      sidebarOpen: open,
    });
  }

  handleModalError = () => {
    this.setState({
      ...this.state,
      modal: {
        modalError: true,
      },
    });
  }

  cleanModalsState = () => {
    this.setState({
      ...this.state,
      editModal: {
        modalIsOpen: false,
        targetChannelId: null,
        targetChannelName: '',
        modalError: false,
      },
      deleteModal: {
        modalIsOpen: false,
        targetChannelId: null,
        targetChannelName: '',
        modalError: false,
      },
      addModal: {
        modalIsOpen: false,
        modalError: false,
      },
    });
  }


  openEditChannelModal = (id, name) => {
    this.setState({
      ...this.state,
      editModal: {
        modalIsOpen: true,
        targetChannelId: id,
        targetChannelName: name,
      },
    });
  }

  openDeleteChannelModal = (id, name) => {
    this.setState({
      ...this.state,
      deleteModal: {
        modalIsOpen: true,
        targetChannelId: id,
        targetChannelName: name,
      },
    });
  }

  openAddChannelModal = () => {
    this.setState({
      ...this.state,
      addModal: {
        modalIsOpen: true,
      },
    });
  }

  renderUserName = () => {
    const { name } = this.props.user;
    return <h3 className="text-white pt-4 pb-4 border-bottom border-secondary">{name}</h3>;
  }

  changeActiveChannel = id => (e) => {
    e.preventDefault();
    this.props.setActiveChannel(id);
  }

  renderChannels = () => {
    const { channels, currentChannel } = this.props;
    if (channels.length < 1) {
      return null;
    }
    return (
      <ul className="list-unstyled pt-1"> { channels.map((channel) => {
        const active = currentChannel === channel.id;
        const channelClassNames = cn({
          'bg-warning': active,
          'bg-light': !active,
        });
        return (
          <li key={channel.id} className="pl-4 pt-3">
            <a href="" className={`${channelClassNames} p-1 text-dark`} onClick={this.changeActiveChannel(channel.id)}>
              {`${String.fromCharCode(35)} ${channel.name}`}
            </a>
            {channel.removable &&
            <div className="d-inline float-right">
              <button
                type="button"
                className="btn btn-dark ml-2 p-1 text-white-50"
                onClick={() => this.openEditChannelModal(channel.id, channel.name)}
              >
                <FontAwesomeIcon icon="pencil-alt"/>
              </button>
              <button
                type="button"
                className="btn btn-dark ml-2 p-1 text-white-50"
                onClick={() => this.openDeleteChannelModal(channel.id, channel.name)}
              >
                <FontAwesomeIcon icon="trash-alt"/>
              </button>
            </div> }

          </li>
        );
      })} </ul>);
  }
  render() {
    return (
      <div className="bg-dark h-100 pl-2 pr-3" style={ { width: '270px' } }>
      { this.renderUserName() }
        <div className="mt-3">
          <h5 className="text-white pl-2">
            Channels
            <button type="button" className="btn btn-dark ml-2 text-warning" onClick={this.openAddChannelModal}>
              <FontAwesomeIcon icon="plus-circle"/>
            </button>
          </h5>
          { this.renderChannels() }
        </div>
        <EditModal
          modal={this.state.editModal.modalIsOpen}
          targetChannelId={this.state.editModal.targetChannelId}
          targetChannelName={this.state.editModal.targetChannelName}
          modalError={this.state.editModal.modalError}
          cleanModalState={this.cleanModalsState}
        />
        <DeleteModal
          modal={this.state.deleteModal.modalIsOpen}
          targetChannelId={this.state.deleteModal.targetChannelId}
          targetChannelName={this.state.deleteModal.targetChannelName}
          modalError={this.state.deleteModal.modalError}
          cleanModalState={this.cleanModalsState}
        />
        <AddModal
          modal={this.state.addModal.modalIsOpen}
          modalError={this.state.addModal.modalError}
          cleanModalState={this.cleanModalsState}
        />
      </div>
    );
  }
}

ChannelsMenu.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.array,
  currentChannel: PropTypes.number,
  setActiveChannel: PropTypes.func,
};
