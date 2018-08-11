import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';

const initialState = {
  taskApps: {},
  currentTaskAppIds: [],
  isLoading: false,

};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  const data = response.json;
  switch (response.type) {
    case apiTypes.GET_CURRENT_TASK_APP: {
      const newTaskApps = {};
      const newTaskAppIds = [];
      data.forEach((element) => {
        newTaskAppIds.push(element.app_id);
        newTaskAppIds[element.app_id] = element;
      });
      return {
        ...state,
        taskApps: { ...state.taskApps, newTaskApps },
        currentTaskAppIds: newTaskAppIds,
      };
    }
    case apiTypes.UPDATE_TASK_APP: {
      const modifiedTaskApp = {};
      modifiedTaskApp[data.app_id] = data;
      return {
        ...state,
        taskApps: { ...state.taskApps, modifiedTaskApp },
      };
    }
    case apiTypes.UPLOAD_TASK_APP: {
      const modifiedTaskApp = {};
      modifiedTaskApp[data.app_id] = data;
      return {
        ...state,
        taskApps: { ...state.taskApps, modifiedTaskApp },
      };
    }
    default:
      return state;
  }
};

const taskAppManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    default:
      return state;
  }
};

export default taskAppManager;
