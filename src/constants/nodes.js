const detectLocale = () => {
  if (navigator) {
    return navigator.language.split(/[-_]/)[0];
  }
  return 'en';
};
const currentLocale = detectLocale();

const enDictionary = {
  START_NODE_DISPLAY_LABEL: 'Start',
  END_NODE_DISPLAY_LABEL: 'End',
};

const zhDictionary = {
  START_NODE_DISPLAY_LABEL: '开始',
  END_NODE_DISPLAY_LABEL: '结束',
};

const dictionaries = {
  en: enDictionary,
  zh: zhDictionary,
};

const currentDictionary = dictionaries[currentLocale];

// Node Type
export const NORMAL_NODE = 'n';
export const START_NODE = 's';
export const END_NODE = 'e';

// Node Display Label
export const { START_NODE_DISPLAY_LABEL, END_NODE_DISPLAY_LABEL } = currentDictionary;

// future node node type
// name can be changed
export const CHECK_LIST_NODE = 'cl';
export const FILE_NODE = 'f';
export const JOIN_NODE = 'j';
export const MULTIPLE_CHOICE_NODE = 'mc';
export const SUB_TASK_NODE = 'st';

export const NODE_SIZE = 40;
export const NODE_OFFSET = NODE_SIZE * 4;

export const NODE_STATUS_COLOR_MAP = {
  n: '#4f86cc',
  ip: '#f3ca50',
  rr: '#FF6B6B',
  c: '#83b369',
  s: '#c6ccd2',
};

export const NODE_NAME_ID_MAP = {
  [NORMAL_NODE]: 'basicNode',
  [CHECK_LIST_NODE]: 'checkListNode',
  [FILE_NODE]: 'fileNode',
  [JOIN_NODE]: 'joinNode',
  [MULTIPLE_CHOICE_NODE]: 'multipleChoiceNode',
  [SUB_TASK_NODE]: 'subTaskNode',
};

export default {
  NORMAL_NODE,
  START_NODE,
  END_NODE,
  NODE_SIZE,
  NODE_NAME_ID_MAP,
};
