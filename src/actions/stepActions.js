import * as types from '../constants/actions';

export const updateStepInfo = (stepInfo = {}, sid = null) => ({
  type: types.UPDATE_STEP_INFO,
  stepInfo,
  sid,
});

export const resetStepInfo = () => ({
  type: types.RESET_STEP_INFO,
});

export const toggleTriggerPending = () => ({
  type: types.TOGGLE_TRIGGER_PENDING,
});

export const setIsStartEnd = isStartEnd => ({
  type: types.SET_IS_START_END,
  flag: isStartEnd,
});
