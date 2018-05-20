import moment from 'moment';
import {
  MIN_ALLOW_WINDOW_WIDTH,
  DRAWER_WIDTH,
  APP_BAR_HEIGHT,
  TOOL_BAR_HEIGHT,
  STATUS_MAP,
  STATUS_MAP_TWO,
  TIME_UNITS_MAP,
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

export const mapTaskInfoRequestData = data => ({
  name: data.name,
  roles: data.roles,
  status: STATUS_MAP[data.status],
  expected_effort_num: data.effortTime === '' ? null : data.effortTime,
  expected_effort_unit: data.effortUnit === '' ? null : TIME_UNITS_MAP[data.effortUnit],
  description: data.description.trim() === '' ? null : data.description,
  deadline: data.deadline === '' ? null : (new Date(data.deadline)).toISOString(),
});
