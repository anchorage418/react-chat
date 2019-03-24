import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from 'styles/theme';

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);
