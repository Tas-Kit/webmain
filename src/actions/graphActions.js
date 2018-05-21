import * as types from '../constants/actions';

export const setDraggingIndex = index => ({
  type: types.SET_DRAGGING_INDEX,
  index,
});

export const setNodeCanvasCoord = coord => ({
  type: types.SET_NODE_CANVAS_COORD,
  coord,
});
