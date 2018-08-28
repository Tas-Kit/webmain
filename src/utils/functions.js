import moment from 'moment';
import Cookies from 'js-cookie';
import qs from 'qs';
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
  NODE_STATUS_COLOR_MAP,
  START_NODE,
  END_NODE,
  NODE_SIZE,
  START_NODE_DISPLAY_LABEL,
  END_NODE_DISPLAY_LABEL,
  NODE_OFFSET,
} from '../constants/nodes';

import * as svgStrings from '../assets/svgStrings';

import gs from '../services/GraphService';

import { LOGIN_URL } from '../constants/apiUrls';

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
  allowLinkSharing: data.allow_link_sharing,
  origin: data.origin,
});

export const mapTaskInfoRequestData = data => ({
  name: data.name,
  roles: data.roles,
  status: STATUS_MAP[data.status],
  expected_effort_num: data.effortTime === '' ? null : data.effortTime,
  expected_effort_unit: data.effortUnit === '' ? null : TIME_UNITS_MAP[data.effortUnit],
  description: data.description.trim() === '' ? null : data.description,
  deadline: data.deadline === '' ? null : (new Date(data.deadline)).toISOString(),
  allow_link_sharing: data.allowLinkSharing,
});

export const mapStepInfoToNode = (data) => {
  const node = {
    name: data.name,
    label: data.name,
    status: STATUS_MAP[data.status],
    description: data.description,
    reviewers: data.reviewerRoles,
    assignees: data.assigneeRoles,
    deadline: data.deadline,
    expected_effort_num: data.effortTime,
    expected_effort_unit: TIME_UNITS_MAP[data.effortUnit] || '',
    is_optional: data.optional,
    id: data.id,
    x: Math.round(data.x / NODE_OFFSET) * NODE_OFFSET,
    y: Math.round(data.y / NODE_OFFSET) * NODE_OFFSET,
    node_type: data.node_type,
    image: data.image,
    shape: 'image',
    size: NODE_SIZE,
  };
  if (data.description) {
    node.title = data.description;
  }
  return node;
};


export const logout = () => {
  if (window) {
    Cookies.remove('JWT');
    const destination = `${window.location.origin}/web/basic/login`;
    window.location = destination;
  }
};

export const backToMain = () => {
  if (window) {
    window.location.replace('/');
  }
};

export const redirectToLogin = (currPath) => {
  if (window) {
    const path = currPath || window.location.pathname;
    const query = qs.stringify({ redirect: path });
    const destination = `${LOGIN_URL}?${query}/`;
    window.location.replace(destination);
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
    null : data.expected_effort_unit,
  sid: data.id,
  is_optional: data.is_optional,
  expected_effort_num: (data.expected_effort_num === '' || data.expected_effort_num === null)
    ? null : data.expected_effort_num,
  description: (data.description === null || data.description === '') ? null : data.description,
});

export const mapNodeToStepInfo = (data) => {
  let currName = data.label;
  if (data.node_type === START_NODE) {
    currName = 'Start';
  } else if (data.node_type === END_NODE) {
    currName = 'End';
  }
  return ({
    name: currName,
    effortTime: data.expected_effort_num || '',
    effortUnit: TIME_UNITS_MAP_TWO[data.expected_effort_unit] || '',
    deadline: data.deadline ? moment(data.deadline).format('YYYY-MM-DD') : '',
    status: STATUS_MAP_TWO[data.status],
    description: data.description || '',
    assigneeRoles: data.assignees,
    reviewerRoles: data.reviewers,
    optional: data.is_optional,
    nodeType: data.node_type,
  });
};

export const mapNodeResponseData = nodes => (
  nodes.map((node) => {
    let svgString;
    let displayLabel = node.name;
    if (node.node_type === START_NODE || node.node_type === END_NODE) {
      const color = NODE_STATUS_COLOR_MAP[node.status];
      svgString = svgStrings[node.node_type](color);
      displayLabel = node.node_type === START_NODE ? START_NODE_DISPLAY_LABEL : END_NODE_DISPLAY_LABEL;
    } else {
      const color = NODE_STATUS_COLOR_MAP[node.status];
      svgString = svgStrings[node.node_type](color);
    }
    const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    const visNode = {
      ...node,
      id: node.sid,
      old_id: node.id,
      shape: 'image',
      image: imageUrl,
      label: displayLabel,
      x: node.pos_x ? node.pos_x : 0.0,
      y: node.pos_y ? node.pos_y : 0.0,
      size: NODE_SIZE,
    };
    if (node.description) { visNode.title = node.description; }
    return visNode;
  })
);

export const getColoredEdge = (edges, nodes) => (
  edges.map((edge) => {
    const fromNodeId = edge.from;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id === fromNodeId) {
        return {
          ...edge,
          color: {
            color: NODE_STATUS_COLOR_MAP[node.status],
            highlight: NODE_STATUS_COLOR_MAP[node.status],
          },
        };
      }
    }
    return edge;
  })
);

export const getColoredEdgeByNode = (node) => {
  const edges = gs.activeData.edges.get({
    filter: option => option.from === node.id,
  });

  return (
    edges.map(edge => ({
      ...edge,
      color: {
        color: NODE_STATUS_COLOR_MAP[node.status],
        highlight: NODE_STATUS_COLOR_MAP[node.status],
      },
    }))
  );
};

export default {
  getAdaptedWidth,
  getAdaptedHeight,
  mapTaskInfoResponseData,
  mapTaskInfoRequestData,
  mapStepInfoToNode,
  logout,
  mapNodeToRequestData,
  mapNodeToStepInfo,
  mapNodeResponseData,
  getColoredEdge,
};
