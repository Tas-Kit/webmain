import * as types from '../constants/actions';
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
};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case 'get_tasks': {
      const tasksMap = response.json;
      const keys = Object.keys(tasksMap);
      const tasks = keys.map(key => ({
        info: tasksMap[key].task,
        permission: tasksMap[key].has_task,
      }));
      return { ...state, tasks };
    }
    case 'get_task_graph': {
      console.log(response.json);
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
      };
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
    case types.SET_USER_ROLE: {
      const taskUsers = state.taskUsers.map((item) => {
        if (item.has_task.id === action.userId) {
          return {
            ...item,
            has_task: {
              ...item.has_task,
              role: action.role,
            },
          };
        }
        return item;
      });
      return { ...state, taskUsers };
    }
    case types.SET_USER_SUPER_ROLE: {
      const taskUsers = state.taskUsers.map((item) => {
        if (item.has_task.id === action.userId) {
          return {
            ...item,
            has_task: {
              ...item.has_task,
              super_role: action.superRole,
            },
          };
        }
        return item;
      });
      return { ...state, taskUsers };
    }
    case types.REMOVE_USER: {
      return {
        ...state,
        taskUsers: (state.taskUsers
          .filter(item => item.has_task.id !== action.userId)),
      };
    }
    default:
      return state;
  }
};

export default taskManager;
