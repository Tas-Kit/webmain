import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';
import { mapNodeResponseData } from '../utils/functions';
import { STATUS } from '../constants';
import gs from '../services/GraphService';

const initialState = {
  stepId: null,
  stepInfo: {
    name: '',
    effortTime: '',
    effortUnit: '',
    deadline: '',
    status: STATUS[0],
    description: '',
    assigneeRoles: [],
    reviewerRoles: [],
    optional: false,
  },
  triggerPending: false,
};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case apiTypes.TRIGGER: {
      const updatedNodes = mapNodeResponseData(response.json.nodes);
      gs.updateNode(updatedNodes);
      return state;
    }
    default:
      return state;
  }
};

const stepManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.UPDATE_STEP_INFO: {
      return { ...state, stepInfo: action.stepInfo, stepId: action.sid };
    }
    case types.RESET_STEP_INFO: {
      return { ...state, stepInfo: initialState.stepInfo };
    }
    case types.TOGGLE_TRIGGER_PENDING: {
      return { ...state, triggerPending: !state.triggerPending };
    }
    default:
      return state;
  }
};

export default stepManager;
