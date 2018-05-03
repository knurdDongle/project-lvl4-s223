import React from 'react';
import { StyleRoot } from 'radium';
import ChannelsMenu from '../containers/ChannelsMenu';
import Display from '../containers/Display';
import InputField from '../containers/InputField';
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
