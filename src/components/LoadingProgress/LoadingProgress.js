import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingProgress = (props) => {
  const { style } = props;
  return (
    <CircularProgress color="primary" style={{ margin: 'auto', ...style }} />
  );
};

LoadingProgress.defaultProps = {
  style: {},
};

export default LoadingProgress;
