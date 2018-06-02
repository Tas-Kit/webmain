import { EDGE_GREY, BLACK } from './colors';

const networkOptions = {
  nodes: {
    shadow: {
      enabled: true,
      color: '#c8c8c8',
      size: 10,
      x: 3,
      y: 3,
    },
    font: {
      face: 'roboto',
      size: 15,
      color: BLACK,
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
      color: EDGE_GREY,
      // highlight: PINK,
    },
    scaling: {
      min: 2,
      max: 2,
      label: {
        enabled: false,
      },
    },
    value: 2,
  },
  physics: {
    enabled: false,
  },
};

export default networkOptions;
