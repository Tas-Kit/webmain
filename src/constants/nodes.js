// Node Type
export const NORMAL_NODE = 'n';
export const START_NODE = 's';
export const END_NODE = 'e';

// future node node type
// name can be changed
export const CHECK_LIST_NODE = 'cl';
export const FILE_NODE = 'f';
export const JOIN_NODE = 'j';
export const MULTIPLE_CHOICE_NODE = 'mc';
export const SUB_TASK_NODE = 'st';

export const NODE_COORD_MAP = {
  s: { x: 60, y: (window.innerHeight - 128) / 2 },
  e: { x: window.innerWidth - 300, y: (window.innerHeight - 128) / 2 },
};

export const NODE_STATUS_COLOR_MAP = {
  n: '#4f86cc',
  ip: '#f3ca50',
  rr: '#FF6B6B',
  c: '#83b369',
  s: '#c6ccd2',
};

export default {
  NODE_COORD_MAP,
  NORMAL_NODE,
  START_NODE,
  END_NODE,
};
