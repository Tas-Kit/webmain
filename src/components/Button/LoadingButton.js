import React from 'react';

// ui components
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

// constants
import { PRIMARY, SECONDARY } from '../../constants/colors';

const LoadingButton = (props) => {
  const { loading, buttonName, onClick, color } = props;

  const inline = {
    buttonWrapper: {
      position: 'relative',
    },
    progress: {
      color: color === 'primary' ? PRIMARY : SECONDARY,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  };
  return (
    <div style={inline.buttonWrapper}>
      <Button onClick={onClick} color={color}>
        {!loading && buttonName}
      </Button>
      {loading && <CircularProgress size={24} style={inline.progress} />}
    </div>
  );
};

export default LoadingButton;
