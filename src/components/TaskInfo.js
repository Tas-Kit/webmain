import React from 'react';

// mui component imports
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/Button';
import Chip from 'material-ui/Chip';

// mui svg imports
import AddRole from '@material-ui/icons/PersonAdd';
import Check from '@material-ui/icons/Check';

// react component imports
import { TimeUnitSelect, StatusSelect } from './Select';

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
};

class TaskInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      status: 'New',
      deadline: '',
      time: '',
      timeUnit: '',
      description: '',
      roles: [],
      inputingRole: false,
      roleName: '',
    };
  }

  handleChange = state => (e) => { this.setState({ [state]: e.target.value }); }

  handleAddRole = () => { this.setState({ inputingRole: true }); }

  handleAddRoleFinish = () => {
    const { roles, roleName } = this.state;
    if (roleName !== '') roles.push(roleName);
    this.setState({ roles, roleName: '', inputingRole: false });
  }

  handleDeleteRole = role => () => {
    const { roles } = this.state;
    const index = roles.indexOf(role);
    roles.splice(index, 1);
    this.setState({ roles });
  }

  render() {
    const {
      name,
      status,
      time,
      timeUnit,
      description,
      roles,
      inputingRole,
      roleName,
      deadline,
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
          <StatusSelect status={status} onChange={this.handleChange} />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Deadline:</span>
          <TextField
            id="deadline"
            type="date"
            value={deadline}
            onChange={this.handleChange('deadline')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Expected Effort:</span>
          <TextField
            id="time"
            value={time}
            label="Number"
            onChange={this.handleChange('time')}
            style={{ width: 150 }}
          />
          <TimeUnitSelect timeUnit={timeUnit} onChange={this.handleChange} />
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
        <div style={inline.row}>
          <span style={inline.fileName}>Roles:</span>
          {roles.map((role, index) => (
            <Chip
              key={`role_${index + 1}`}
              label={role}
              onDelete={this.handleDeleteRole(role)}
              style={inline.chip}
            />
          ))}
          {inputingRole ?
            <TextField
              autoFocus
              id="adding_role"
              value={roleName}
              onChange={this.handleChange('roleName')}
              onBlur={this.handleAddRoleFinish}
            />
            : null
          }
          <IconButton color="primary" style={inline.iconButton} onClick={this.handleAddRole}>
            {inputingRole && roleName !== '' ? <Check /> : <AddRole />}
          </IconButton>
        </div>
      </div>
    );
  }
}

export default TaskInfo;
