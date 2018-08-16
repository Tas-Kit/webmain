import * as types from '../constants/actions';

export const toggleIsCreator = () => ({
  type: types.TOGGLE_IS_CREATOR,
});

export const resetLatestDownloadTid = () => ({
  type: types.RESET_LATEST_DOWNLOAD_TID,
});

export default {
  toggleIsCreator,
};
