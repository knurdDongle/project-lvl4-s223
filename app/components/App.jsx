import React from 'react';
import ChannelsMenu from '../containers/ChannelsMenu';
import Display from '../containers/Display';
import InputField from '../containers/InputField';

const App = () => (
    <div className="container-fluid">
        <div className="row mt-1">
          <ChannelsMenu />
          <Display />
          <InputField />
        </div>
      </div>
);

export default App;
