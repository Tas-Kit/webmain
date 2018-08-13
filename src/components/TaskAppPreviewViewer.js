import React from 'react';
import { FormattedMessage } from 'react-intl';
import { STATUS_MAP_TWO, TIME_UNITS_MAP_TWO } from '../constants';

const TaskAppPreviewViewer = (props) => {
  const { task } = props;
  if (!task) return (<p><FormattedMessage id="taskUnavailableText" /></p>);
  return (
    <div>
      <p><FormattedMessage id="nameFieldName" />: {task.name}</p>
      <p><FormattedMessage id="statusFieldName" />: {STATUS_MAP_TWO[task.status]}</p>
      <p><FormattedMessage id="rolesFieldName" />: {task.roles.join(' ')}</p>
      <p><FormattedMessage id="expectedFieldName" />: {`${task.expected_effort_num} ${TIME_UNITS_MAP_TWO[task.expected_effor_unit]}`}</p>
    </div>
  );
};

export default TaskAppPreviewViewer;

