import * as types from '../constants/actions';

export const updateStepInfo = (stepInfo = {}) => ({
  type: types.UPDATE_STEP_INFO,
  stepInfo,
});

export const resetStepInfo = () => ({
  type: types.RESET_STEP_INFO,
});
