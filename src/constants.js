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

export default {
  ACCEPTANCE,
  ACCEPTANCES,
  TIME_UNITS,
  STATUS,
};
