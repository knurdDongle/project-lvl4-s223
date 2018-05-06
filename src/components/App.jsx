import React from 'react';
import { StyleRoot } from 'radium';
import ChannelsMenu from '../components/ChannelsMenu.jsx';
import Display from '../components/Display.jsx';
import InputField from '../components/InputField.jsx';
import Side from './Side.jsx';

const App = () => (
  <StyleRoot>
    <div className="container-fluid">
      <div className="row mt-1">
        <Side >
          <ChannelsMenu />
        </Side>
        <Display />
        <InputField />
      </div>
    </div>
  </StyleRoot>
);

export default App;
