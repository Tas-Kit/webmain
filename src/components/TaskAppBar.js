import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { FormattedMessage } from 'react-intl';

import { APP_BAR_TITLE } from '../constants';
import { PINK } from '../constants/colors';

const styles = {
  appBar: {
    padding: '20px 0px',
    textAlign: 'center',
    fontSize: APP_BAR_TITLE,
  },
  flex: {
    flex: 1,
  },
  unsaved: {
    color: PINK,
  },
};

const TaskAppBar = (props) => {
  const { title = '', classes } = props;
  const renderTitle = () => {
    if (title === '') {
      return <FormattedMessage id="appBarWelcomeMessage" />;
    }
    const { editMode } = props.currentUserManager;
    const { graphDataOrigin, currentGraphData } = props.graphManager;
    console.log(graphDataOrigin);
    console.log(currentGraphData);
    const unsaved = JSON.stringify(graphDataOrigin) !== JSON.stringify(currentGraphData);
    if (unsaved && editMode) {
      return (
        <div>{title}<span className={classes.unsaved}> (<FormattedMessage id="unsaveChangesLabel" />) </span></div>
      );
    }
    return `${title}`;
  };
  return (
    <AppBar className={classes.appBar} position="static" color="default">
      {renderTitle()}
    </AppBar>
  );
};

const mapStateToProps = store => ({
  graphManager: store.graphManager,
  currentUserManager: store.currentUserManager,
});

export default connect(mapStateToProps)(withStyles(styles)(TaskAppBar));
