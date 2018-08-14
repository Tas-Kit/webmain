import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

const styles = {
  card: {
    minWidth: 275,
  },
  downloadText: {
    marginTop: '1em',
  },
};

function TaskAppCard(props) {
  const {
    classes, taskApp, handleCardClick, handleDownloadClick,
  } = props;

  return (
    <div>
      <Card className={classes.card} onClick={handleCardClick}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {taskApp.name}
          </Typography>
          <Typography component="p" variant="body1">
            {taskApp.description}
          </Typography>
          <Typography className={classes.downloadText} variant="body1">
            <FormattedMessage id="downloadNumberText" />: {taskApp.downloads}
          </Typography>

        </CardContent>
        <CardActions>
          <Button color="primary" size="small" onClick={handleDownloadClick} disabled={!taskApp.current_task || taskApp.isLoading}><FormattedMessage id="downloadButton" /></Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(TaskAppCard);
