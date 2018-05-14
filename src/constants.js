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

export const TIME_UNITS = ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year'];
export const STATUS = ['New', 'In Progress', 'Ready For Review', 'Completed', 'Skipped'];

export const STATUS_MAP = {
  'New': 'n',
  'In Progress': 'ip',
  'Ready For Review': 'rr',
  'Completed': 'c',
  'Skipped': 's',
};

export const TIME_UNITS_MAP = {
  Second: 's',
  Minute: 'm',
  Hour: 'h',
  Day: 'd',
  Week: 'w',
  Month: 'm',
  Year: 'y',
};

// Component Size
export const MIN_ALLOW_WINDOW_WIDTH = 840;
export const DRAWER_WIDTH = 240;
export const APP_BAR_HEIGHT = 63;
export const TOOL_BAR_HEIGHT = 64;

// Font Size
export const TEXT_FIELD_TITLE = 14;
export const DIALOG_MESSAGE = 13;
export const APP_BAR_TITLE = 20;
export const LETTER_AVARTAR = 16;

export default {
  ACCEPTANCE,
  ACCEPTANCES,
  TIME_UNITS,
  STATUS,
  STATUS_MAP,
  TIME_UNITS_MAP,
  MIN_ALLOW_WINDOW_WIDTH,
  DRAWER_WIDTH,
  APP_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
  TEXT_FIELD_TITLE,
  DIALOG_MESSAGE,
  APP_BAR_TITLE,
  LETTER_AVARTAR,
};
