import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { LoadingButton } from './Button';
import { START_NODE } from '../constants/nodes';
import { NEW, IN_PROGRESS, READY_FOR_REVIEW } from '../constants';

const inline = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px',
    minWidth: 600,
  },
  row: {
    margin: '13px 0px',
  },
  fieldName: {
    position: 'relative',
    top: 3,
    marginRight: 10,
    fontSize: 13,
    fontWeight: 500,
  },
  fieldContent: {
    position: 'relative',
    top: 3,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 600,
    display: 'inline-block',
  },
  triggerMain: {
    marginLeft: 'auto',
  },
};

const styles = () => ({
  chip: {
    margin: '0px 2.5px',
  },
  trigger: {
    margin: '10px 0px',
  },
});

const StepInfoView = (props) => {
  const getTriggerButtonName = () => {
    const { info } = props;
    if (info.status === IN_PROGRESS && info.reviewerRoles.length === 0) {
      return 'Complete';
    } else if (info.status === IN_PROGRESS && info.reviewerRoles.length > 0) {
      return 'Submit For Review';
    } else if (info.status === READY_FOR_REVIEW) {
      return 'Complete';
    }
    return 'Trigger';
  };

  const allowTrigger = () => {
    const { info, userTaskRole } = props;
    if (info.status === NEW && info.nodeType === START_NODE) {
      return true;
    } else if (info.status === IN_PROGRESS && info.assigneeRoles.length === 0) {
      return true;
    } else if (info.status === READY_FOR_REVIEW && info.reviewerRoles.length === 0) {
      return true;
    } else if (info.status === IN_PROGRESS && info.assigneeRoles.indexOf(userTaskRole) >= 0) {
      return true;
    } else if (info.status === READY_FOR_REVIEW && info.reviewerRoles.indexOf(userTaskRole) >= 0) {
      return true;
    }
    return false;
  };

  const renderExpectedEfforts = (info) => {
    if (info.effortTime === '' && info.effortUnit === '') {
      return null;
    }
    return `${info.effortTime} ${info.effortUnit}(s)`;
  };

  const {
    info,
    classes,
    triggerPending,
    onTrigger,
  } = props;
  return (
    <div style={inline.main}>
      <div style={inline.row}>
        <span style={inline.fieldName}>Name:</span>
        <span style={inline.fieldContent}>{info.name}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Status:</span>
        <span style={inline.fieldContent}>{info.status}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Deadline:</span>
        <span style={inline.fieldContent}>{info.deadline}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Expected Effort:</span>
        <span style={inline.fieldContent}>{renderExpectedEfforts(info)}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Description:</span>
        <span style={inline.fieldContent}>{info.description}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Optional:</span>
        <div style={inline.fieldContent}>
          <Checkbox disabled checked={info.optional} />
        </div>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Assignee:</span>
        <div style={inline.fieldContent}>
          {info.assigneeRoles.map(role => (
            <Chip key={`assignee_${role}`} label={role} className={classes.chip} />
          ))}
          {info.assigneeRoles.length === 0 ? 'None' : null}
        </div>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Reviewer:</span>
        <div style={inline.fieldContent}>
          {info.reviewerRoles.map(role => (
            <Chip key={`reviewer_${role}`} label={role} className={classes.chip} />
          ))}
          {info.reviewerRoles.length === 0 ? 'None' : null}
        </div>
      </div>
      <Tooltip title={allowTrigger() ? '' : 'You don\'t have the authority to trigger.'}>
        <div style={inline.triggerMain}>
          <LoadingButton
            variant="outlined"
            color="primary"
            className={classes.trigger}
            disabled={!allowTrigger()}
            buttonName={getTriggerButtonName()}
            loading={triggerPending}
            onClick={onTrigger}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default withStyles(styles)(StepInfoView);
