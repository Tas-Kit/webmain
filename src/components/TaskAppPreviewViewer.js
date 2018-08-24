import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@material-ui/core';
import { STATUS_MAP_TWO, TIME_UNITS_MAP_TWO } from '../constants';

const TaskAppPreviewViewer = (props) => {
  const { task, handleDownloadClick } = props;
  if (!task) return (<p><FormattedMessage id="taskUnavailableText" /></p>);
  return (
    <div>
      <p><FormattedMessage id="nameFieldName" />: {task.name}</p>
      <p><FormattedMessage id="descriptionFieldName" />: {task.description}</p>
      <p><FormattedMessage id="statusFieldName" />: {STATUS_MAP_TWO[task.status]}</p>
      <p><FormattedMessage id="rolesFieldName" />: {task.roles.join(' ')}</p>
      <p><FormattedMessage id="expectedFieldName" />: {task.expected_effort_unit ? `${task.expected_effort_num} ${TIME_UNITS_MAP_TWO[task.expected_effort_unit]}` : <FormattedMessage id="noneText" />}</p>
      <Button color="primary" size="small" onClick={handleDownloadClick} ><FormattedMessage id="downloadButton" /></Button>
    </div>
  );
};

export default TaskAppPreviewViewer;

