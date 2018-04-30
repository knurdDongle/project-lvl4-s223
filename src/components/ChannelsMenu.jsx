import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import ChannelsModal from '../containers/ChannelsModal';

fontawesome.library.add(faPlusCircle, faPencilAlt, faTrashAlt);

export default class ChannelsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: {
        modalIsOpen: false,
        modalState: 'default',
        targetChannelId: null,
        targetChannelName: '',
        modalError: false,
      },
    };
  }

  handleModalError = () => {
    this.setState({
      ...this.state,
      modal: {
        modalError: true,
      },
    });
  }

  cleanModalState = () => {
    this.setState({
      ...this.state,
      modal: {
        modalIsOpen: false,
        modalState: 'default',
        targetChannelId: null,
        targetChannelName: '',
        modalError: false,
      },
    });
  }

  deleteChannelModal = (id, name) => {
    this.setState({
      ...this.state,
      modal: {
        modalState: 'delete',
        modalIsOpen: !this.state.modalIsOpen,
        targetChannelId: id,
        targetChannelName: name,
      },
    });
  }

  addChannelModal = () => {
    this.setState({
      ...this.state,
      modal: {
        modalState: 'add',
        modalIsOpen: !this.state.modalIsOpen,
      },
    });
  }

  editChannelModal = (id, name) => {
    this.setState({
      ...this.state,
      modal: {
        modalState: 'edit',
        modalIsOpen: !this.state.modalIsOpen,
        targetChannelId: id,
        targetChannelName: name,
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
          <li key={channel.id} className="pl-3 pt-3">
            <a href="" className={`${channelClassNames} p-1 text-dark`} onClick={this.changeActiveChannel(channel.id)}>
              {`${String.fromCharCode(35)} ${channel.name}`}
            </a>
            {channel.removable &&
            <div className="d-inline float-right">
              <button
                type="button"
                className="btn btn-dark ml-2 p-1 text-white-50"
                onClick={() => this.editChannelModal(channel.id, channel.name)}
              >
                <FontAwesomeIcon icon="pencil-alt"/>
              </button>
              <button
                type="button"
                className="btn btn-dark ml-2 p-1 text-white-50"
                onClick={() => this.deleteChannelModal(channel.id, channel.name)}
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
      <div className="fixed-top col-6 col-xs-6 col-sm-4 bg-dark col-md-3 col-xl-2 h-100">
      { this.renderUserName() }
        <div className="mt-3">
          <h5 className="text-white pl-2">
            Channels
            <button type="button" className="btn btn-dark ml-2 text-warning" onClick={this.addChannelModal}>
              <FontAwesomeIcon icon="plus-circle"/>
            </button>
          </h5>
          { this.renderChannels() }
        </div>
        <ChannelsModal
          modal={this.state.modal.modalIsOpen}
          modalState={this.state.modal.modalState}
          targetChannelId={this.state.modal.targetChannelId}
          targetChannelName={this.state.modal.targetChannelName}
          modalError={this.state.modal.modalError}
          handleModalError={this.handleModalError}
          cleanModalState={this.cleanModalState} />
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
