import React from 'react';
import TextField from 'material-ui/TextField';

// ui components
import ExpectedEffortSelect from './Select/ExpectedEffortSelect';
import OptionsSelect from './Select/OptionsSelect';

// constants
import { STATUS } from '../constants';

const inline = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px 24px',
  },
  row: {
    margin: '13px 0px',
  },
  fileName: {
    position: 'relative',
    top: 3,
    marginRight: 10,
    fontSize: 14,
    fontWeight: 600,
  },
};

class StepInfo extends React.Component {
  componentDidMount = () => {}

  handleChange = key => (e) => {
    const { info, update } = this.props;
    update({ ...info, [key]: e.target.value });
  }

  render() {
    const { info } = this.props;
    return (
      <div style={inline.main}>
        <div style={inline.row}>
          <span style={inline.fileName}>Name:</span>
          <TextField
            id="name"
            value={info.name}
            onChange={this.handleChange('name')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Expected Effort:</span>
          <ExpectedEffortSelect
            time={info.effortTime}
            timeUnit={info.effortUnit}
            onChangeTime={this.handleChange('effortTime')}
            onChangeUnit={this.handleChange('effortUnit')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Deadline:</span>
          <TextField
            id="deadline"
            type="date"
            value={info.deadline}
            onChange={this.handleChange('deadline')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Status:</span>
          <OptionsSelect
            options={STATUS}
            selectFieldName={info.status}
            onChange={this.handleChange('status')}
          />
        </div>
        {/*
          <div style={inline.row}>
          <span style={inline.fileName}>Assignee:</span>
          <OptionsSelect
          options={STATUS}
          selectFieldName={info.status}
          onChange={this.handleChange('status')}
          />
          </div>
        */}
        {/*
          <div style={inline.row}>
          <span style={inline.fileName}>Reviewer:</span>
          <OptionsSelect
          options={STATUS}
          selectFieldName={info.status}
          onChange={this.handleChange('status')}
          />
          </div>
        */}
      </div>
    );
  }
}

export default StepInfo;
