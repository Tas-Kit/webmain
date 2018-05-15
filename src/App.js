import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from './constants/theme';
import TaskView from './views/TaskView';
import ReduxService from './services/ReduxService';
import AutoIntlProvider from "./components/AutoIntlProvider";

const App = () => (
  <AutoIntlProvider>
    <Provider store={ReduxService.store}>
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            <TaskView />
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    </Provider>
  </AutoIntlProvider>
);

export default App;
