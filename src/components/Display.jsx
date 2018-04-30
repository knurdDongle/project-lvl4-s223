import React from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import Radium from 'radium';

const styles = {
  msg: {
    ':hover': {
      backgroundColor: '#f9f9f9',
    },
  },
};

class Display extends React.Component {
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    scroll.scrollToBottom();
  }
  renderMessages = () => {
    const { messages } = this.props;
    if (messages.length < 1) {
      return null;
    }
    return (<ul className="list-unstyled"> {
      messages.map((msg, ind) => (
        <li className="m-0 mb-3 border-bottom border-light" style={styles.msg} key={ind}>
          <h5 className="d-inline pr-2 pb-1">{msg.author}</h5>
          <p className="time d-inline small text-muted">{msg.time}</p>
          <p>{msg.message}</p>
        </li>))}
      </ul>);
  }
  render() {
    return (
      <div className="col-6 offset-6 col-xs-6 offset-xs-6 offset-sm-4 col-sm-8 offset-md-3 col-md-9 offset-xl-2 col-xl-10 mt-3 pb-5">
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
