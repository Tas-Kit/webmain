import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';

const inline = {
  instructions: {
    marginLeft: 20,
    marginTop: 20,
  },
};

const DisplayWorkflowPage = () => (
  <div style={inline.instructions}>
    <Button variant="outlined" color="primary">
      <FormattedMessage id="displayWorkflow" defaultMessage="" />
    </Button>
  </div>
);

export default DisplayWorkflowPage;
