import moment from 'moment';
import {
  MIN_ALLOW_WINDOW_WIDTH,
  DRAWER_WIDTH,
  APP_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
  STATUS_MAP_TWO,
  TIME_UNITS_MAP_TWO,
} from '../constants';

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
});
