import moment from 'moment';
import Cookies from 'js-cookie';
import {
  MIN_ALLOW_WINDOW_WIDTH,
  DRAWER_WIDTH,
  APP_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
  STATUS_MAP,
  STATUS_MAP_TWO,
  TIME_UNITS_MAP,
  TIME_UNITS_MAP_TWO,
} from '../constants';

import {
  NODE_COORD_MAP,
  NODE_STATUS_COLOR_MAP,
  START_NODE,
  END_NODE,
} from '../constants/nodes';

import * as svgStrings from '../assets/svgStrings';

import gs from '../services/GraphService';

export const getAdaptedWidth = () => {
  if (window.innerWidth >= MIN_ALLOW_WINDOW_WIDTH) {
    return window.innerWidth - DRAWER_WIDTH;
  }
  return MIN_ALLOW_WINDOW_WIDTH;
};

export const getAdaptedHeight = () => window.innerHeight - APP_BAR_HEIGHT - TOOL_BAR_HEIGHT;

export const mapTaskInfoResponseData = data => ({
  name: data.name,
  roles: data.roles,
  status: STATUS_MAP_TWO[data.status],
  effortTime: data.expected_effort_num || '',
  effortUnit: data.expected_effort_unit ? TIME_UNITS_MAP_TWO[data.expected_effort_unit] : '',
  description: data.description || '',
  deadline: data.deadline ? moment(data.deadline).format('YYYY-MM-DD') : '',
});

export const mapTaskInfoRequestData = data => ({
  name: data.name,
  roles: data.roles,
  status: STATUS_MAP[data.status],
  expected_effort_num: data.effortTime === '' ? null : data.effortTime,
  expected_effort_unit: data.effortUnit === '' ? null : TIME_UNITS_MAP[data.effortUnit],
  description: data.description.trim() === '' ? null : data.description,
  deadline: data.deadline === '' ? null : (new Date(data.deadline)).toISOString(),
});

export const mapStepInfoToNode = data => ({
  name: data.name,
  label: data.name,
  status: STATUS_MAP[data.status],
  description: data.description,
  reviewers: data.reviewerRoles,
  assignees: data.assigneeRoles,
  deadline: data.deadline,
  expected_effort_num: data.effortTime,
  expected_effort_unit: data.effortUnit,
  is_optional: data.optional,
  id: data.id,
  x: data.x,
  y: data.y,
  node_type: data.node_type,
  image: data.image,
  shape: 'image',
  size: 40,
});


export const logout = () => {
  if (window) {
    Cookies.remove('JWT');
    window.location.replace('/login');
  }
};

export const backToMain = () => {
  if (window) {
    window.location.replace('/');
  }
};

export const mapNodeToRequestData = data => ({
  status: data.status,
  pos_x: data.x,
  pos_y: data.y,
  name: data.name,
  reviewers: data.reviewers,
  assignees: data.assignees,
  node_type: data.node_type,
  deadline: (data.deadline === '' || data.deadline === null) ? null : (new Date(data.deadline)).toISOString(),
  expected_effort_unit: (data.expected_effort_unit === '' || data.expected_effort_unit === null) ?
    null : TIME_UNITS_MAP[data.expected_effort_unit],
  sid: data.id,
  is_optional: data.is_optional,
  expected_effort_num: (data.expected_effort_num === '' || data.expected_effort_num === null)
    ? null : data.expected_effort_num,
  description: (data.description === null || data.description === '') ? null : data.description,
});

export const mapNodeToStepInfo = data => ({
  name: data.label,
  effortTime: data.expected_effort_num || 'None',
  effortUnit: data.expected_effort_unit || '',
  deadline: data.deadline ? moment(data.deadline).format('YYYY-MM-DD') : 'None',
  status: STATUS_MAP_TWO[data.status],
  description: data.description || 'None',
  assigneeRoles: data.assignees,
  reviewerRoles: data.reviewers,
  optional: data.is_optional,
});

export const mapNodeResponseData = nodes => (
  nodes.map((node) => {
    let svgString;
    if (node.node_type === START_NODE || node.node_type === END_NODE) {
      svgString = svgStrings[node.node_type]();
    } else {
      const color = NODE_STATUS_COLOR_MAP[node.status];
      svgString = svgStrings[node.node_type](color);
    }
    const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    let canvasCoord;
    if (node.pos_x && node.pos_y) {
      canvasCoord = { x: node.pos_x, y: node.pos_y };
    } else {
      const DOMCoord = NODE_COORD_MAP[node.node_type];
      canvasCoord = gs.network.DOMtoCanvas(DOMCoord);
    }
    return ({
      ...node,
      id: node.sid,
      old_id: node.id,
      shape: 'image',
      image: imageUrl,
      label: node.name,
      x: canvasCoord.x,
      y: canvasCoord.y,
      size: 40,
    });
  })
);
