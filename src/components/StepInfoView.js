import React, { Fragment } from 'react';
import { Slider } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';
import { LoadingButton } from './Button';
import PickList from './PickList';

import { DOUBLE_SLIDER, PICK_LIST } from '../constants/components';
import {
  START_NODE,
  END_NODE,
  START_NODE_DISPLAY_LABEL,
  END_NODE_DISPLAY_LABEL
} from '../constants/nodes';
import { NEW, IN_PROGRESS, READY_FOR_REVIEW } from '../constants';
import MarkdownViewer from './MarkdownViewer';

const inline = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px',
    minWidth: 600
  },
  row: {
    margin: '13px 0px'
  },
  fieldName: {
    position: 'relative',
    top: 3,
    marginRight: 10,
    fontSize: 13,
    fontWeight: 500
  },
  fieldContent: {
    position: 'relative',
    top: 3,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 600,
    display: 'inline-block'
  },
  triggerMain: {
    marginLeft: 'auto'
  }
};

const styles = () => ({
  chip: {
    margin: '0px 2.5px'
  },
  trigger: {
    margin: '10px 0px'
  }
});

const StepInfoView = props => {
  const getTriggerButtonName = () => {
    const { info } = props;
    if (info.status === IN_PROGRESS && info.reviewerRoles.length === 0) {
      return <FormattedMessage id="triggerToComplete" />;
    } else if (info.status === IN_PROGRESS && info.reviewerRoles.length > 0) {
      return <FormattedMessage id="triggerToReview" />;
    } else if (info.status === READY_FOR_REVIEW) {
      return <FormattedMessage id="triggerToComplete" />;
    }
    return <FormattedMessage id="trigger" />;
  };

  const allowTrigger = () => {
    const { info, userTaskRole } = props;
    if (info.status === NEW && info.nodeType === START_NODE) {
      return true;
    } else if (info.status === IN_PROGRESS && info.assigneeRoles.length === 0) {
      return true;
    } else if (
      info.status === READY_FOR_REVIEW &&
      info.reviewerRoles.length === 0
    ) {
      return true;
    } else if (
      info.status === IN_PROGRESS &&
      info.assigneeRoles.indexOf(userTaskRole) >= 0
    ) {
      return true;
    } else if (
      info.status === READY_FOR_REVIEW &&
      info.reviewerRoles.indexOf(userTaskRole) >= 0
    ) {
      return true;
    }
    return false;
  };

  const renderExpectedEfforts = info => {
    if (info.effortTime === '' && info.effortUnit === '') {
      return null;
    }
    return `${info.effortTime} ${info.effortUnit}(s)`;
  };

  const renderComponent = data => {
    console.log(data);
    switch (data.type) {
      case DOUBLE_SLIDER: {
        const getValue = () => {
          if (data.values) return data.values;
          return [data.valueRange.min, data.valueRange.max];
        };

        const getStep = () => {
          if (data.values) return 1;
          return data.valueRange.interval;
        };

        const displayValue = value => {
          if (data.displayFunc) {
            return data.displayFunc(value);
          }
          return value;
        };

        return (
          <Slider
            range
            step={getStep()}
            defaultValue={getValue()}
            tipFormatter={displayValue}
          />
        );
      }
      case PICK_LIST: {

        return (
          <PickList data={data} />
        )
      }
      default:
        return <div />;
    }
  };

  const {
    info,
    classes,
    triggerPending,
    onTrigger,
    componentLoaded,
    objects
  } = props;
  return (
    <div style={inline.main}>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="nameFieldName" />:
        </span>
        <span style={inline.fieldContent}>
          {(info.nodeType === START_NODE && START_NODE_DISPLAY_LABEL) ||
            (info.nodeType === END_NODE && END_NODE_DISPLAY_LABEL) ||
            info.name}
        </span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="statusFieldName" />:
        </span>
        <span style={inline.fieldContent}>{info.status}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="deadlineFieldName" />:
        </span>
        <span style={inline.fieldContent}>{info.deadline}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="expectedFieldName" />:
        </span>
        <span style={inline.fieldContent}>{renderExpectedEfforts(info)}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="descriptionFieldName" />:
        </span>
        <MarkdownViewer source={info.description} />
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="optionalFieldName" />:
        </span>
        <div style={inline.fieldContent}>
          <Checkbox disabled checked={info.optional} />
        </div>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="assigneeFieldName" />:
        </span>
        <div style={inline.fieldContent}>
          {info.assigneeRoles.map(role => (
            <Chip
              key={`assignee_${role}`}
              label={role}
              className={classes.chip}
            />
          ))}
          {info.assigneeRoles.length === 0 ? 'None' : null}
        </div>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>
          <FormattedMessage id="reviewerFieldName" />:
        </span>
        <div style={inline.fieldContent}>
          {info.reviewerRoles.map(role => (
            <Chip
              key={`reviewer_${role}`}
              label={role}
              className={classes.chip}
            />
          ))}
          {info.reviewerRoles.length === 0 ? 'None' : null}
        </div>
      </div>

      {/* Step Components */}
      {componentLoaded &&
        objects.map(object => (
          <Fragment>
            {object.components.map(renderComponent)}
          </Fragment>
        ))}

      <Tooltip
        title={allowTrigger() ? '' : <FormattedMessage id="triggerTitle" />}
      >
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
