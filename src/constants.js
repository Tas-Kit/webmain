const detectLocale = () => {
  if (navigator) {
    return navigator.language.split(/[-_]/)[0];
  }
  return 'en';
};
const currentLocale = detectLocale();

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
export const NEW = currentLocale === 'en' ? 'New' : '新';
export const IN_PROGRESS = currentLocale === 'en' ? 'In Progress' : '进行中';
export const READY_FOR_REVIEW = currentLocale === 'en' ? 'Ready For Review' : '待审核';
export const COMPLETED = currentLocale === 'en' ? 'Completed' : '完成';
export const SKIPPED = currentLocale === 'en' ? 'Skipped' : '跳过';

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
export const SECOND = currentLocale === 'en' ? 'Second' : '秒';
export const MINUTE = currentLocale === 'en' ? 'Minute' : '分钟';
export const HOUR = currentLocale === 'en' ? 'Hour' : '小时';
export const DAY = currentLocale === 'en' ? 'Day' : '天';
export const WEEK = currentLocale === 'en' ? 'Week' : '周';
export const MONTH = currentLocale === 'en' ? 'Month' : '月';
export const YEAR = currentLocale === 'en' ? 'Year' : '年';

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

export const SUPER_ROLE = {
  OWNER: 10,
  ADMIN: 5,
  STANDARD: 0,
};

export const SUPER_ROLES = {
  [SUPER_ROLE.OWNER]: 'Owner',
  [SUPER_ROLE.ADMIN]: 'Admin',
  [SUPER_ROLE.STANDARD]: 'Standard',
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
