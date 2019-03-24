import React, { Component } from 'react';
import { ChatContainer } from 'containers';
import withStyles from '@material-ui/core/styles/withStyles';
import { hot } from 'react-hot-loader/root';

import { appStyles } from 'styles';

class App extends Component {
  render() {
    return(
      <div>
        <h1>Флудильня</h1>
        <ChatContainer />
      </div>
    );
  }
}

export default hot(withStyles(appStyles)(App));
