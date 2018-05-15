import React from 'react';

import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { ACCEPTANCE } from '../constants';

const AcceptanceIcon = (props) => {
  const { acceptance } = props;
  switch (acceptance) {
    case ACCEPTANCE.ACCEPT:
      return <Done />;
    case ACCEPTANCE.WAITING:
      return <span>...</span>;
    case ACCEPTANCE.REJECT:
      return <Clear />;
    default:
      return <span />;
  }
};

export default AcceptanceIcon;
