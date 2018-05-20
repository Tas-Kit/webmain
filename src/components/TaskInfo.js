import React from 'react';

// mui components
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

// mui svgs
import AddRole from '@material-ui/icons/PersonAdd';
import Check from '@material-ui/icons/Check';

// ui components
import { ExpectedEffortSelect, OptionsSelect } from './Select';
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
    const { inputingRole, roleName } = this.state;
    const { info } = this.props;

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
          <span style={inline.fieldName}>Roles:</span>
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
