import { createMuiTheme } from '@material-ui/core/styles';
import { LIGHT_BLUE, PINK } from './colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: LIGHT_BLUE }, // primary is light blue
    secondary: { main: PINK },
  },
});

export default theme;
