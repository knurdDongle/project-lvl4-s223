import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const styles = {
  msg: {
    ':hover': {
      backgroundColor: '#f9f9f9',
    },
  },
  resp: {
    '@media screen and (min-width: 800px)': {
      marginLeft: '260px',
    },
    overflowY: 'scroll',
    maxHeight: '95vh',
    width: '100%',
  },
};

class Display extends React.Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    const { elToScroll } = this;
    elToScroll.scrollTop = elToScroll.scrollHeight - elToScroll.clientHeight;
  }
  renderMessages = () => {
    const { messages } = this.props;
    if (messages.length < 1) {
      return null;
    }
    return (<ul className="list-unstyled"> {
      messages.map((msg, ind) => (
        <li className="m-0 mb-3 border-bottom border-light" key={ind}>
          <h5 className="d-inline pr-2 pb-1">{msg.author}</h5>
          <p className="time d-inline small text-muted">{msg.time}</p>
          <p>{msg.message}</p>
        </li>))}
      </ul>);
  }
  render() {
    return (
      <div className="col mt-2" ref={(el) => { this.elToScroll = el; } } style={styles.resp}>
        {this.renderMessages()}
      </div>
    );
  }
}

Display.propTypes = {
  messages: PropTypes.array,
  currentChannelId: PropTypes.number,
};

export default Radium(Display);
