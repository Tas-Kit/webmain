import React from 'react';
import { FormattedMessage } from 'react-intl';

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
import Editor from '../components/Editor';

// constants
import { STATUS, TEXT_FIELD_TITLE } from '../constants';
import { Switch } from './Switch';

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

  handleSwitch = key => (e) => {
    const { info, update } = this.props;
    update({ ...info, [key]: e.target.checked });
  }

  render() {
    const { inputingRole, roleName } = this.state;
    const { info } = this.props;

    return (
      <div style={inline.main}>
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="nameFieldName" />}*:</span>
          <TextInput
            id="name"
            value={info.name}
            onChange={this.handleChange('name')}
            validationRule="required|max:200"
            errorMessage={<FormattedMessage id="nameFieldErrorMessage" />}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="statusFieldName" />}:</span>
          <OptionsSelect
            options={STATUS}
            selectFieldName={info.status}
            onChange={this.handleChange('status')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="deadlineFieldName" />}:</span>
          <TextField
            id="deadline"
            type="date"
            value={info.deadline}
            onChange={this.handleChange('deadline')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="expectedFieldName" />}:</span>
          <ExpectedEffortSelect
            time={info.effortTime}
            timeUnit={info.effortUnit}
            onChangeTime={this.handleChange('effortTime')}
            onChangeUnit={this.handleChange('effortUnit')}
          />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="descriptionFieldName" />}:</span>
          <Editor key={info.name} value={info.description} onChange={this.handleChange('description')} />
        </div>
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="rolesFieldName" />}:</span>
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
        <div style={inline.row}>
          <span style={inline.fieldName}>{<FormattedMessage id="allowLinkSharingFieldName" />}:</span>
          <Switch checked={info.allowLinkSharing} onChange={this.handleSwitch('allowLinkSharing')} value="allowLinkSharing" />
        </div>
      </div>
    );
  }
}

export default TaskInfo;
