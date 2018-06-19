const detectLocale = () => {
  if (navigator) {
    return navigator.language.split(/[-_]/)[0];
  }
  return 'en';
};
const currentLocale = detectLocale();

const enDictionary = {
  NEW: 'New',
  IN_PROGRESS: 'In Progress',
  READY_FOR_REVIEW: 'Rready For Review',
  COMPLETED: 'Completed',
  SKIPPED: 'Skipped',
  SECOND: 'Second',
  MINUTE: 'Minute',
  HOUR: 'Hour',
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year',
  OWNER: 'Owner',
  ADMIN: 'Admin',
  STANDARD: 'Standard',
};

const zhDictionary = {
  NEW: '新',
  IN_PROGRESS: '进行中',
  READY_FOR_REVIEW: '待审核',
  COMPLETED: '完成',
  SKIPPED: '跳过',
  SECOND: '秒',
  MINUTE: '分钟',
  HOUR: '小时',
  DAY: '日',
  WEEK: '周',
  MONTH: '月',
  YEAR: '年',
  OWNER: '所有者',
  ADMIN: '管理员',
  STANDARD: '普通',
};

const dictionaries = {
  en: enDictionary,
  zh: zhDictionary,
};

const currentDictionary = dictionaries[currentLocale];

const ACCEPT = 'a';
const REJECT = 'r';
const WAITING = 'w';

export const ACCEPTANCE = {
  ACCEPT,
  REJECT,
  WAITING,
};

export const ACCEPTANCES = {
  [ACCEPTANCE.ACCEPT]: 'Accept',
  [ACCEPTANCE.REJECT]: 'Reject',
  [ACCEPTANCE.WAITING]: 'Waiting',
};

// Status

export const {
  NEW, IN_PROGRESS, READY_FOR_REVIEW, COMPLETED, SKIPPED,
} = currentDictionary;


export const STATUS = [NEW, IN_PROGRESS, READY_FOR_REVIEW, COMPLETED, SKIPPED];

export const STATUS_MAP = {
  [NEW]: 'n',
  [IN_PROGRESS]: 'ip',
  [READY_FOR_REVIEW]: 'rr',
  [COMPLETED]: 'c',
  [SKIPPED]: 's',
};

export const STATUS_MAP_TWO = {
  n: NEW,
  ip: IN_PROGRESS,
  rr: READY_FOR_REVIEW,
  c: COMPLETED,
  s: SKIPPED,
};

// Time Units
export const {
  SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR,
} = currentDictionary;

export const TIME_UNITS = [SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR];


export const TIME_UNITS_MAP = {
  [SECOND]: 's',
  [MINUTE]: 'm',
  [HOUR]: 'h',
  [DAY]: 'd',
  [WEEK]: 'w',
  [MONTH]: 'M',
  [YEAR]: 'y',
};

export const TIME_UNITS_MAP_TWO = {
  s: SECOND,
  m: MINUTE,
  h: HOUR,
  d: DAY,
  w: WEEK,
  M: MONTH,
  y: YEAR,
};

export const { OWNER, ADMIN, STANDARD } = currentDictionary;
export const SUPER_ROLE = {
  OWNER: 10,
  ADMIN: 5,
  STANDARD: 0,
};

export const SUPER_ROLES = {
  [SUPER_ROLE.OWNER]: OWNER,
  [SUPER_ROLE.ADMIN]: ADMIN,
  [SUPER_ROLE.STANDARD]: STANDARD,
};

// Component Size
export const MIN_ALLOW_WINDOW_WIDTH = 840;
export const DRAWER_WIDTH = 240;
export const APP_BAR_HEIGHT = 67;
export const TOOL_BAR_HEIGHT = 64;

// Font Size
export const TEXT_FIELD_TITLE = 14;
export const DIALOG_MESSAGE = 13;
export const APP_BAR_TITLE = 17;
export const LETTER_AVARTAR = 16;

// validation rules
export const TASK_INFO_RULE = {
  name: 'required',
  expected_effort_num: 'required_with:expected_effort_unit',
  expected_effort_unit: 'required_with:expected_effort_num',
};

export const STEP_INFO_RULE = {
  name: 'required',
  effortTime: 'required_with:effortUnit',
  effortUnit: 'required_with:effortTime',
};

export default {
  ACCEPTANCE,
  ACCEPTANCES,
  TIME_UNITS,
  STATUS,
  STATUS_MAP,
  TIME_UNITS_MAP,
  SUPER_ROLE,
  SUPER_ROLES,
  MIN_ALLOW_WINDOW_WIDTH,
  DRAWER_WIDTH,
  APP_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
  TEXT_FIELD_TITLE,
  DIALOG_MESSAGE,
  APP_BAR_TITLE,
  LETTER_AVARTAR,
  TASK_INFO_RULE,
  STEP_INFO_RULE,
};
