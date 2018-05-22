import * as types from '../constants/actions';

const initialState = {
  addEdgeSelected: false,
  draggingIndex: -1,
  canvasCoord: { x: 0, y: 0 },
};

const handleRequest = (request, state) => {
  switch (request.type) {
    default:
      return state;
  }
};

const handleResponse = (response, state) => {
  switch (response.type) {
    default:
      return state;
  }
};

const graphManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.SET_DRAGGING_INDEX: {
      return { ...state, draggingIndex: action.index };
    }
    case types.SET_NODE_CANVAS_COORD: {
      return { ...state, canvasCoord: action.coord };
    }
    case types.TOGGLE_ADD_EDGE_BUTTON: {
      return { ...state, addEdgeSelected: !state.addEdgeSelected };
    }
    default:
      return state;
  }
};

export default graphManager;
