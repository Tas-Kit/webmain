import * as types from '../constants/actions';

export const setDraggingIndex = index => ({
  type: types.SET_DRAGGING_INDEX,
  index,
});

export default { setDraggingIndex };
