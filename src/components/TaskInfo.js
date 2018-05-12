import React from 'react';

// mui components
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/Button';
import Chip from 'material-ui/Chip';

// mui svgs
import AddRole from '@material-ui/icons/PersonAdd';
import Check from '@material-ui/icons/Check';

// ui components
import { ExpectedEffortSelect, OptionsSelect } from './Select';

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
      inputingRole: false,
      roleName: '',
    };
  }

  handleAddRole = () => { this.setState({ inputingRole: true }); }

  handleAddRoleFinish = () => {
    const { roleName } = this.state;

    if (roleName !== '') {
      const { info, update } = this.props;
      const roles = [...info.roles];
      roles.push(roleName);
      update({ ...info, roles });
    }

    this.setState({ roleName: '', inputingRole: false });
  }

  handleDeleteRole = role => () => {
    const { info, update } = this.props;
    const roles = [...info.roles];
    const index = roles.indexOf(role);
    roles.splice(index, 1);
    update({ ...info, roles });
  }

  handleChange = key => (e) => {
    const { info, update } = this.props;
    update({ ...info, [key]: e.target.value });
  }

  render() {
    const {
      inputingRole,
      roleName,
    } = this.state;

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
          <span style={inline.fileName}>Status:</span>
          <OptionsSelect
            options={STATUS}
            selectFieldName={info.status}
            onChange={this.handleChange('status')}
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
          <span style={inline.fileName}>Expected Effort:</span>
          <ExpectedEffortSelect
            time={info.effortTime}
            timeUnit={info.effortUnit}
            onChangeTime={this.handleChange('effortTime')}
            onChangeUnit={this.handleChange('effortUnit')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Description:</span>
          <TextField
            id="description"
            multiline
            rowsMax="6"
            value={info.description}
            onChange={this.handleChange('description')}
            style={{ width: 400 }}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fileName}>Roles:</span>
          {info.roles.map((role, index) => (
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
              onChange={(e) => { this.setState({ roleName: e.target.value }); }}
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
