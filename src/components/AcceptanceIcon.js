import React from 'react';

import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { ACCEPTANCE } from '../constants';

const AcceptanceIcon = props => {
  const { acceptance } = props;
  if (acceptance === ACCEPTANCE.ACCEPT) {
    return (<Done />);
  } else if (acceptance === ACCEPTANCE.WAITING) {
    return (<span>...</span>);
  } else if (acceptance === ACCEPTANCE.REJECT) {
    return (<Clear />);
  }
  return (<span />);
};

export default AcceptanceIcon;
