import * as types from '../constants/actions';

export const setDraggingNodeType = nodeType => ({
  type: types.SET_DRAGGING_NODE_TYPE,
  nodeType,
});

export const setNodeCanvasCoord = coord => ({
  type: types.SET_NODE_CANVAS_COORD,
  coord,
});

export const toggleAddEdgeButton = () => ({
  type: types.TOGGLE_ADD_EDGE_BUTTON,
});

export const toggleDeleteButton = () => ({
  type: types.TOGGLE_DELETE_BUTTON,
});

export const setGraphDataOrigin = graphDataOrigin => ({
  type: types.SET_GRAPH_DATA_ORIGIN,
  graphDataOrigin,
});

export const updateGraphDataJson = graphData => ({
  type: types.UPDATE_GRAPH_DATA_JSON,
  graphData,
});

export const openNodeDescriptionBox = () => ({
  type: types.OPEN_NODE_DESCRIPTION_BOX,
});

export const closeNodeDescriptionBox = () => ({
  type: types.CLOSE_NODE_DESCRIPTION_BOX,
});

export const updateNodeInfo = nodeData => ({
  type: types.UPDATE_NODE_INFO,
  nodeData,
});
