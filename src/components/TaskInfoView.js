import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from 'react-intl';
import MarkdownViewer from './MarkdownViewer'


const styles = () => ({
  chip: {
    margin: '0px 2.5px',
  },
});

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
};

const TaskInfoView = (props) => {
  const { info, classes } = props;
  return (
    <div style={inline.main}>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="nameFieldName" />*:</span>
        <span style={inline.fieldContent}>{info.name}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="statusFieldName" />:</span>
        <span style={inline.fieldContent}>{info.status}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="deadlineFieldName" />:</span>
        <span style={inline.fieldContent}>{info.deadline}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="expectedFieldName" />:</span>
        <span style={inline.fieldContent}>{`${info.effortTime} ${info.effortUnit}`}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="descriptionFieldName" />:</span>
        <MarkdownViewer source={info.description} />
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="rolesFieldName" />:</span>
        <div style={inline.fieldContent}>
          {info.roles.map(role => (
            <Chip key={`assignee_${role}`} label={role} className={classes.chip} />
          ))}
          {info.roles.length === 0 ? 'None' : null}
        </div>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}><FormattedMessage id="allowLinkSharingFieldName" />:</span>
        <div style={inline.fieldContent}>
          {info.allowLinkSharing ? <FormattedMessage id="yesButton" /> : <FormattedMessage id="noButton" />}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(TaskInfoView);
