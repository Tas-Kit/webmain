import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from './constants/theme';
import MainPage from './pages/MainPage';
import ReduxService from './services/ReduxService';
import AutoIntlProvider from './components/AutoIntlProvider';

const App = () => (
  <AutoIntlProvider>
    <Provider store={ReduxService.store}>
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <BrowserRouter basename="/main">
            <Switch>
              <Route path="/" component={MainPage} />
              <Route component={MainPage} />
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      </MuiThemeProvider>
    </Provider>
  </AutoIntlProvider>
);

export default App;
