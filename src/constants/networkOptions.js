import { PINK, TOOLBAR_GREY } from './colors';

const networkOptions = {
  nodes: {
    shadow: {
      enabled: true,
      color: '#c8c8c8',
      size: 10,
      x: 3,
      y: 3,
    },
  },
  edges: {
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 1,
      },
    },
    selectionWidth: 0.5,
    arrowStrikethrough: false,
    smooth: {
      type: 'continuous',
      forceDirection: 'none',
    },
    color: {
      color: TOOLBAR_GREY,
      highlight: PINK,
    },
  },
  physics: {
    enabled: false,
  },
};

export default networkOptions;
