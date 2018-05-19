import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';
import { STATUS, STATUS_MAP_TWO, TIME_UNITS_MAP_TWO } from '../constants';

const initialState = {
  taskId: null,
  taskInfo: {
    name: '',
    status: STATUS[0],
    roles: [],
    description: '',
    deadline: '',
    effortTime: '',
    effortUnit: '',
  },
  taskUsers: [],
  tasks: [],
  pending: false,
  pendingRequestId: -1,
};

const handleRequest = (request, state) => {
  switch (request.type) {
    case apiTypes.GET_TASK_GRAPH: {
      return {
        ...state,
        pendingRequestId: request.id,
        pending: true,
      };
    }
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case apiTypes.GET_TASKS: {
      const tasksMap = response.json;
      const keys = Object.keys(tasksMap);
      const tasks = keys.map(key => ({
        info: tasksMap[key].task,
        permission: tasksMap[key].has_task,
      }));
      return { ...state, tasks };
    }
    case apiTypes.GET_TASK_GRAPH: {
      if (response.id === state.pendingRequestId) {
        const data = response.json.task_info;
        const taskInfo = {
          ...state.taskInfo,
          deadline: data.deadline || '',
          description: data.description || '',
          effortTime: data.expected_effort_num || '',
          effortUnit: TIME_UNITS_MAP_TWO[data.expected_effort_unit] || '',
          name: data.name,
          roles: data.roles || [],
          status: STATUS_MAP_TWO[data.status] || '',
        };
        const taskUsers = response.json.users;
        return {
          ...state,
          taskInfo,
          taskUsers,
          taskId: data.tid,
          pending: false,
          pendingRequestId: -1,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const taskManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.UPDATE_TASK_INFO: {
      return { ...state, taskInfo: action.taskInfo };
    }
    case types.RESET_TASK_INFO: {
      return { ...state, taskInfo: initialState.taskInfo, taskId: null };
    }
    case types.SET_ACTIVE_TASK_ID: {
      return { ...state, taskId: action.taskId };
    }
    case types.TOGGLE_TASK_ACTION_PENDING: {
      return { ...state, pending: !state.pending };
    }
    default:
      return state;
  }
};

export default taskManager;
