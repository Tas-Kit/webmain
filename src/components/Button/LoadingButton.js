import React from 'react';

// ui components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// constants
import { LIGHT_BLUE, PINK } from '../../constants/colors';

const LoadingButton = (props) => {
  const {
    loading,
    buttonName,
    onClick,
    color,
    className,
  } = props;

  const getColorObject = (colorValue) => {
    switch (colorValue) {
      case 'primary':
        return LIGHT_BLUE;
      case 'secondary':
        return PINK;
      default:
        return colorValue;
    }
  };

  const inline = {
    buttonWrapper: {
      position: 'relative',
      display: 'inline-block',
    },
    progress: {
      color: getColorObject(color),
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  };
  return (
    <div style={inline.buttonWrapper}>
      <Button onClick={onClick} color={color} className={className}>
        {!loading && buttonName}
      </Button>
      {loading && <CircularProgress size={24} style={inline.progress} />}
    </div>
  );
};

LoadingButton.defaultProps = {
  className: {},
};

export default LoadingButton;
