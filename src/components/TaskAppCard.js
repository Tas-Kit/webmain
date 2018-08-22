import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { CardHeader, Tooltip, Avatar } from '@material-ui/core';

const styles = {
  card: {
    width: 360,
    height: 160,
    display: 'flex',
    flexDirection: 'column',
  },
  full: {
    flex: 1,
  },
  header: {
    padding: '1em',
  },
};

function TaskAppCard(props) {
  const {
    classes, taskApp, handleCardClick, handleDownloadClick,
  } = props;

  const { username } = taskApp.author;

  return (
    <div>
      <Card className={classes.card} onClick={handleCardClick}>
        <CardHeader
          avatar={
            <Tooltip title={username}>
              <Avatar >{username ? username[0] : ''}</Avatar>
            </Tooltip>}
          title={taskApp.name}
          className={classes.header}
        />
        <CardContent className={classes.full}>
          <Typography component="p" variant="body1">
            {taskApp.description.slice(0, 40)}
            {taskApp.description.length > 40 && '...'}
          </Typography>

        </CardContent>
        <CardActions>
          <Button color="primary" size="small" onClick={handleDownloadClick} disabled={!taskApp.current_task || taskApp.isLoading}><FormattedMessage id="downloadButton" /></Button>
          <Typography variant="body1">
            {taskApp.downloads}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(TaskAppCard);
