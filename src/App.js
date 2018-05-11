import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './constants/theme';

import TaskView from './views/TaskView';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <TaskView />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
