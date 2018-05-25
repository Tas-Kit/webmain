import sortBy from 'lodash/sortBy';
import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';
import { mapTaskInfoResponseData } from '../utils/functions';
import { STATUS } from '../constants';

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
  taskNodes: [],
  taskEdges: [],
  tasks: [],
  savePending: false,
  deletePending: false,
  pending: false, // use it only when creating or loading a task
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
        const taskUsers = sortBy(
          response.json.users,
          [
            o => o.has_task.acceptance, o => o.has_task.super_role,
            o => o.has_task.role, o => o.basic.username,
          ],
        );
        const taskInfo = mapTaskInfoResponseData(data);
        return {
          ...state,
          taskId: data.tid,
          taskInfo,
          taskUsers,
          taskNodes: response.json.nodes,
          taskEdges: response.json.edges,
          pending: false,
          pendingRequestId: -1,
        };
      }
      return state;
    }
    case apiTypes.CREATE_INVITATION: {
      return {
        ...state,
        taskUsers: [...state.taskUsers, response.json],
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
      return {
        ...state, taskInfo: initialState.taskInfo, taskId: null, taskUsers: [],
      };
    }
    case types.SET_ACTIVE_TASK_ID: {
      return { ...state, taskId: action.taskId };
    }
    case types.TOGGLE_TASK_ACTION_PENDING: {
      return { ...state, pending: !state.pending };
    }
    case types.TOGGLE_TASK_DELETE_PENDING: {
      return { ...state, deletePending: !state.deletePending };
    }
    case types.TOGGLE_TASK_SAVE_PENDING: {
      return { ...state, savePending: !state.savePending };
    }
    case types.SET_USER_ROLE: {
      const taskUsers = state.taskUsers.map((item) => {
        if (item.basic.uid === action.userId) {
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
        if (item.basic.uid === action.userId) {
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
          .filter(item => item.basic.uid !== action.userId)),
      };
    }
    default:
      return state;
  }
};

export default taskManager;
