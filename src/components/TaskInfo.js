import React from 'react';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

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

class TaskInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      status: '',
      time: '',
      timeUnit: '',
      description: '',
    };
  }

  handleChange = state => (e) => { this.setState({ [state]: e.target.value }); }

  renderTimeUnits = () => {
    const timeUnits = ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'];
    const { timeUnit } = this.state;
    return (
      <TextField
        select
        id="expected_effort"
        value={timeUnit}
        onChange={this.handleChange('timeUnit')}
        style={{ width: 200 }}
      >
        {timeUnits.map(unit => (
          <MenuItem key={unit} value={unit}>
            {`${unit}(s)`}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  render() {
    // hard coded for now, later take data from api response
    const statuses = ['New', 'Status1', 'Status2'];

    const {
      name,
      status,
      time,
      description,
    } = this.state;

    return (
      <div style={inline.main}>
        <div style={inline.row}>
          <span style={inline.fileName}>Name:</span>
          <TextField
            id="name"
            value={name}
            onChange={this.handleChange('name')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Status:</span>
          <Select
            value={status}
            onChange={this.handleChange('status')}
          >
            {[
              <MenuItem key="" value="" />,
              ...statuses.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              )),
            ]}
          </Select>
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Deadline:</span>
          <TextField
            id="deadline"
            type="datetime-local"
            value={time}
            onChange={this.handleChange('time')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Expected Effort:</span>
          <TextField
            id="time"
            InputProps={{ endAdornment: this.renderTimeUnits(), style: { width: 210 } }}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Description:</span>
          <TextField
            id="description"
            multiline
            rowsMax="6"
            value={description}
            onChange={this.handleChange('description')}
            style={{ width: 400 }}
          />
        </div>
      </div>
    );
  }
}

export default TaskInfo;
