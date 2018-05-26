import React from 'react';
import TextField from '@material-ui/core/TextField';

// ui components
import { ExpectedEffortSelect, OptionsSelect, MultiSelect } from './Select';
import { TaskitCheckbox } from './TaskitCheckbox';
import TextInput from './TextInput';
import TextArea from './TextArea';

// constants
import { STATUS } from '../constants';

const inline = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px',
    minWidth: 400,
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
  },
};

class StepInfoView extends React.Component {
  handleChange = key => (e) => {
    const { info, update } = this.props;
    update({ ...info, [key]: e.target.value });
  }

  handleCheckboxChange = key => (e) => {
    const { info, update } = this.props;
    update({ ...info, [key]: e.target.checked });
  }

  render() {
    const { info, roles } = this.props;
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
          <span style={inline.fieldName}>Optional:</span>
          <span style={inline.fieldContent}>{info.optional}</span>
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Assignee:</span>
          <span style={inline.fieldContent}>{info.assigneeRoles}</span>
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Reviewer:</span>
          <span style={inline.fieldContent}>{info.reviewerRoles}</span>
        </div>
      </div>
    );
  }
}

export default StepInfoView;
