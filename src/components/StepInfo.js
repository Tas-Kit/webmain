import React from 'react';
import TextField from 'material-ui/TextField';

// ui components
import ExpectedEffortSelect from './Select/ExpectedEffortSelect';
import OptionsSelect from './Select/OptionsSelect';
import TextInput from './TextInput';
import TextArea from './TextArea';

// constants
import { STATUS, TEXT_FIELD_TITLE } from '../constants';

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
    fontSize: TEXT_FIELD_TITLE,
    fontWeight: 500,
  },
};

class StepInfo extends React.Component {
  componentDidMount = () => {}

  handleChange = key => (e) => {
    const { info, update } = this.props;
    update({ ...info, [key]: e.target.value });
  }

  render() {
    const { info, roles } = this.props;
    return (
      <div style={inline.main}>
        <div style={inline.row}>
          <span style={inline.fieldName}>Name*:</span>
          <TextInput
            id="name"
            value={info.name}
            onChange={this.handleChange('name')}
            validationRule="required|max:200"
            errorMessage="Name is required and less than 200 characters."
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Status:</span>
          <OptionsSelect
            options={STATUS}
            selectFieldName={info.status}
            onChange={this.handleChange('status')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Deadline:</span>
          <TextField
            id="deadline"
            type="date"
            value={info.deadline}
            onChange={this.handleChange('deadline')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Expected Effort:</span>
          <ExpectedEffortSelect
            validationRule="numeric"
            errorMessage="Time value expects a number."
            time={info.effortTime}
            timeUnit={info.effortUnit}
            onChangeTime={this.handleChange('effortTime')}
            onChangeUnit={this.handleChange('effortUnit')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Description:</span>
          <TextArea
            id="description"
            value={info.description}
            onChange={this.handleChange('description')}
            validationRule="max:2000"
            errorMessage="Description should be no more than 2000 characters."
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Assignee:</span>
          <OptionsSelect
            allowNone
            label="Role"
            options={roles}
            selectFieldName={info.assigneeRole}
            onChange={this.handleChange('assigneeRole')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>Reviewer:</span>
          <OptionsSelect
            allowNone
            label="Role"
            options={roles}
            selectFieldName={info.reviewerRole}
            onChange={this.handleChange('reviewerRole')}
          />
        </div>
      </div>
    );
  }
}

export default StepInfo;
