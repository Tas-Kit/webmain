import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './constants/theme';

import TaskView from './views/TaskView';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <TaskView />
      </div>
    </React.Fragment>
  </MuiThemeProvider>
);

export default App;
