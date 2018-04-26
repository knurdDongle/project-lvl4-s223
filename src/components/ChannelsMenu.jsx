import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class ChannelsMenu extends React.Component {
  renderUserName = () => {
    const { name } = this.props.user;
    return <h3 className="text-white pt-4 pb-4 border-bottom border-secondary">{name}</h3>;
  }

  renderChannels = () => {
    const { channels, currentChannel } = this.props;
    return channels.length < 1 ? null :
      (<ul className="list-unstyled mt-4"> { channels.map((channel) => {
        const active = currentChannel === channel.id;
        const channelClassNames = cn({
          'bg-warning': active,
          'bg-light': !active,
        });
        return (
          <li key={channel.id} className="pl-3 mb-2">
            <a href="" className={`${channelClassNames} p-1 text-dark`}>
            {`${String.fromCharCode(35)} ${channel.name}`}
            </a>
          </li>
        );
      })} </ul>);
  }
  render() {
    return (
      <div className="fixed-top col-6 col-xs-6 col-sm-4 bg-dark col-md-3 col-xl-2 h-100">
        { this.renderUserName() }
        { this.renderChannels() }
      </div>
    );
  }
}

ChannelsMenu.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.array,
  currentChannel: PropTypes.number,
};
