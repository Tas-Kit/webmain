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

export const NODE_SIZE = 40;

export const NODE_STATUS_COLOR_MAP = {
  n: '#4f86cc',
  ip: '#f3ca50',
  rr: '#FF6B6B',
  c: '#83b369',
  s: '#c6ccd2',
};

export default {
  NORMAL_NODE,
  START_NODE,
  END_NODE,
  NODE_SIZE,
};
