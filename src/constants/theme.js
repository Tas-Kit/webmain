import { createMuiTheme } from 'material-ui/styles';
import { PRIMARY } from './colors';
import purple from 'material-ui/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: { main: PRIMARY }, // primary is light blue
    // secondary: { main: '' },
  },
});

export default theme;
