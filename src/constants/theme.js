import { createMuiTheme } from 'material-ui/styles';
import { PRIMARY } from './colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: PRIMARY }, // primary is light blue
  },
});

export default theme;
