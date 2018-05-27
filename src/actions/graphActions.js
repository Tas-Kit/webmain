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
