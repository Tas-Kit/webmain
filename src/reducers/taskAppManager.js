import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';

const initialState = {
  taskApps: {},
  currentTaskAppIds: [],
  // used for full reducer loading
  isLoading: false,
  isCreatorMode: false,
};

const handleRequest = (request, state) => {
  switch (request.type) {
    case apiTypes.GET_CURRENT_TASK_APP: {
      return { ...state, isLoading: true };
    }
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
      data.task_app_list.forEach((element) => {
        newTaskAppIds.push(element.app_id);
        newTaskApps[element.app_id] = { ...element, isLoading: false };
      });
      return {
        ...state,
        taskApps: newTaskApps,
        currentTaskAppIds: newTaskAppIds,
        isLoading: false,
      };
    }
    case apiTypes.UPDATE_TASK_APP: {
      const currTaskApp = data.task_app;
      return {
        ...state,
        taskApps: { ...state.taskApps, [currTaskApp.app_id]: { ...currTaskApp, isLoading: false } },
      };
    }
    case apiTypes.UPLOAD_TASK_APP: {
      const modifiedTaskApps = {};
      const modifiedTaskApp = { ...data, isLoading: false };
      modifiedTaskApps[data.app_id] = modifiedTaskApp;
      return {
        ...state,
        taskApps: { ...state.taskApps, modifiedTaskApps },
      };
    }
    case apiTypes.CREATE_TASK_APP: {
      const currTaskApp = data.task_app;
      return {
        ...state,
        currentTaskAppIds: state.currentTaskAppIds.concat([currTaskApp.app_id]),
        taskApps: { ...state.taskApps, [currTaskApp.app_id]: { ...currTaskApp, isLoading: false } },
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
    case types.TOGGLE_IS_CREATOR: {
      return { ...state, isCreatorMode: !state.isCreatorMode };
    }
    default:
      return state;
  }
};

export default taskAppManager;
