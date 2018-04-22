import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default class ChannelsMenu extends React.Component {
  renderUserName = () => {
    const { name } = this.props.user;
    return <h4>{name}</h4>;
  }
  renderChannels = () => {
    const { channels, currentChannel } = this.props;
    return channels.length < 1 ? null :
      (<ul> { channels.map((channel) => {
        const channelClassNames = cn({
          act: currentChannel === channel.id,
        });
        return (
          <li key={channel.id}>
            <a href="" className={channelClassNames}>
              # {channel.name}
            </a>
          </li>
        );
      })} </ul>);
  }
  render() {
    return (
      <div className="col-6 col-xs-6 col-sm-4 bg-dark col-md-3 col-xl-2 sidebar">
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
