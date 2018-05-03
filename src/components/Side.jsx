import React from 'react';
import Sidebar from 'react-sidebar';
import PropTypes from 'prop-types';

const mql = window.matchMedia('(min-width: 800px)');

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mql,
      docked: props.docked,
      open: props.open,
    };
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  onSetSidebarOpen = (open) => {
    console.log('open');
    this.setState({ sidebarOpen: open });
  }

  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  render() {
    return (
     <Sidebar sidebar={this.props.children}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      />
    );
  }
}

Side.propTypes = {
  docked: PropTypes.bool,
  open: PropTypes.bool,
  children: PropTypes.any,
};

export default Side;