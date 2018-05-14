import { createMuiTheme } from 'material-ui/styles';
import { PRIMARY, SECONDARY } from './colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: PRIMARY }, // primary is light blue
    secondary: { main: SECONDARY },
  },
});

export default theme;
