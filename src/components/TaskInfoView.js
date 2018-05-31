import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = () => ({
  chip: {
    margin: '0px 2.5px',
  },
  trigger: {
    margin: '10px 0px',
  },
});

const inline = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px',
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
  iconButton: {
    width: 40,
    height: 40,
    minWidth: 'initial',
    minHeight: 'initial',
    borderRadius: '50%',
  },
  chip: {
    margin: '0px 5px',
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
  console.log(info);
  return (
    <div style={inline.main}>
      <div style={inline.row}>
        <span style={inline.fieldName}>Name*:</span>
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
        <span style={inline.fieldContent}>{`${info.effortTime} ${info.effortUnit}`}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Description:</span>
        <span style={inline.fieldContent}>{info.description}</span>
      </div>
      <div style={inline.row}>
        <span style={inline.fieldName}>Roles:</span>
        {info.roles.map(role => (
          <Chip key={`assignee_${role}`} label={role} className={classes.chip} />
        ))}
        {info.roles.length === 0 ? 'None' : null}
      </div>
    </div>
  );
};

export default withStyles(styles)(TaskInfoView);
