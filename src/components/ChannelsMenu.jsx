import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import EditModal from './EditModal.jsx';
import DeleteModal from './DeleteModal.jsx';
import AddModal from './AddModal.jsx';

fontawesome.library.add(faPlusCircle, faPencilAlt, faTrashAlt);

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
    currentChannel: state.currentChannelId,
    user: state.user,
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
export default class ChannelsMenu extends React.Component {
  openAddModal = () => {
    this.props.openModal({ type: 'addModal' });
  }

  openDeleteModal = (targetChannelId, targetChannelName) => {
    this.props.openModal({
      type: 'deleteModal',
      targetChannelId,
      targetChannelName,
    });
  }

  openEditModal = (targetChannelId, targetChannelName) => {
    this.props.openModal({
      type: 'editModal',
      targetChannelId,
      targetChannelName,
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
                onClick={() => this.openEditModal(channel.id, channel.name)}
              >
                <FontAwesomeIcon icon="pencil-alt"/>
              </button>
              <button
                type="button"
                className="btn btn-dark ml-2 p-1 text-white-50"
                onClick={() => this.openDeleteModal(channel.id, channel.name)}
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
            <button type="button" className="btn btn-dark ml-2 text-warning" onClick={this.openAddModal}>
              <FontAwesomeIcon icon="plus-circle"/>
            </button>
          </h5>
          { this.renderChannels() }
        </div>
        <EditModal/>
        <DeleteModal/>
        <AddModal/>
      </div>
    );
  }
}

ChannelsMenu.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.array,
  currentChannel: PropTypes.number,
  setActiveChannel: PropTypes.func,
  openModal: PropTypes.func,
};
