import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { connect } from 'react-redux';
import { disableBodyScroll } from 'body-scroll-lock';
import { animateScroll as scroll } from 'react-scroll';
import messagesSelector from '../selectors';
import * as actionCreators from '../actions';

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
    '@media screen and (max-width: 799px)': {
      marginTop: '50px',
      paddingBottom: '40px',
      '-webkit-overflow-scrolling': 'touch',
    },
    overflowY: 'scroll',
    height: '95vh',
    width: '100%',
  },
};

const mapStateToProps = (state) => {
  const props = {
    messages: messagesSelector(state),
  };
  return props;
};

class Display extends React.Component {
  componentDidMount() {
    this.targetElement = document.querySelector('#display');
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    scroll.scrollToBottom({ containerId: 'display' });
  }

  renderMessages = () => {
    const { messages } = this.props;
    if (messages.length < 1) {
      return null;
    }
    disableBodyScroll(this.targetElement);
    return (<ul className="list-unstyled pb-3"> {
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
      <div className="col mt-2" id="display" ref={(el) => { this.elToScroll = el; } } style={styles.resp}>
        {this.renderMessages()}
      </div>
    );
  }
}

Display.propTypes = {
  messages: PropTypes.array,
  currentChannelId: PropTypes.number,
};

export default connect(mapStateToProps, actionCreators)(Radium(Display));

