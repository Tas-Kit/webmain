import end from '../assets/svgs/end.svg';
import start from '../assets/svgs/start.svg';
import task1 from '../assets/svgs/task1.svg';
import task2 from '../assets/svgs/task2.svg';
import task3 from '../assets/svgs/task3.svg';
import task4 from '../assets/svgs/task4.svg';
import task5 from '../assets/svgs/task5.svg';

export const NODE_IMAGE_MAP = {
  e: end,
  s: start,
  0: task1,
  1: task2,
  2: task3,
  3: task4,
  4: task5,
};

export const NODE_COORD_MAP = {
  s: { x: 60, y: (window.innerHeight - 128) / 2 },
  e: { x: window.innerWidth - 300, y: (window.innerHeight - 128) / 2 },
};

export const NODE_LABEL_MAP = {
  e: 'End',
  s: 'Start',
};

export default { NODE_IMAGE_MAP, NODE_COORD_MAP };
