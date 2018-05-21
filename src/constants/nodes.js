import end from '../assets/svgs/end.svg';
import start from '../assets/svgs/start.svg';
import task1 from '../assets/svgs/task1.svg';

// Node Type
export const NORMAL_NODE = 'n';
export const START_NODE = 's';
export const END_NODE = 'e';

export const NODE_IMAGE_MAP = {
  e: end,
  s: start,
  0: task1,
};

export const NODE_COORD_MAP = {
  s: { x: 60, y: (window.innerHeight - 128) / 2 },
  e: { x: window.innerWidth - 300, y: (window.innerHeight - 128) / 2 },
};

export default {
  NODE_IMAGE_MAP,
  NODE_COORD_MAP,
  NORMAL_NODE,
  START_NODE,
  END_NODE,
};
