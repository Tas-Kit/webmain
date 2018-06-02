import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';
import { mapNodeResponseData, getColoredEdge } from '../utils/functions';
import gs from '../services/GraphService';

const initialState = {
  addEdgeSelected: false,
  draggingNodeType: '',
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
    case apiTypes.SAVE_GRAPH: {
      gs.clearAll();
      const updatedNodes = mapNodeResponseData(response.json.nodes);
      const updatedEdges = getColoredEdge(response.json.edges, updatedNodes);
      gs.updateNode(updatedNodes);
      gs.updateEdge(updatedEdges);
      return state;
    }
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
    case types.SET_DRAGGING_NODE_TYPE: {
      return { ...state, draggingNodeType: action.nodeType };
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
