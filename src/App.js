import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';

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
          <BrowserRouter>
            <Route path="/" component={MainPage} />
          </BrowserRouter>
        </React.Fragment>
      </MuiThemeProvider>
    </Provider>
  </AutoIntlProvider>
);

export default App;
