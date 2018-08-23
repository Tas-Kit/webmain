import * as types from '../constants/actions';
import * as apiTypes from '../constants/apiTypes';
import { mapNodeResponseData, getColoredEdge } from '../utils/functions';
import gs from '../services/GraphService';

const initialState = {
  addEdgeSelected: false,
  deleteSelected: false,
  draggingNodeType: '',
  canvasCoord: { x: 0, y: 0 },
  graphDataOrigin: {
    nodes: [],
    edges: [],
  },
  currentGraphData: {
    nodes: [],
    edges: [],
  },

  // description box of each node on mobile
  descriptionOpened: false,
  nodeInfo: {
    x: null,
    y: null,
    description: null,
  },
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
    case types.TOGGLE_DELETE_BUTTON: {
      return { ...state, deleteSelected: !state.deleteSelected };
    }
    case types.SET_GRAPH_DATA_ORIGIN: {
      return { ...state, graphDataOrigin: action.graphDataOrigin };
    }
    case types.UPDATE_GRAPH_DATA_JSON: {
      return { ...state, currentGraphData: action.graphData };
    }
    case types.UPDATE_NODE_INFO: {
      return { ...state, nodeInfo: action.nodeData };
    }
    case types.OPEN_NODE_DESCRIPTION_BOX: {
      return { ...state, descriptionOpened: true };
    }
    default:
      return state;
  }
};

export default graphManager;
