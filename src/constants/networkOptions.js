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
    smooth: {
      forceDirection: 'none',
    },
    color: {
      color: '#ccc',
      highlight: '#ccc',
      hover: '#ccc',
      inherit: 'from',
      opacity: 0.8,
    },
  },
  physics: {
    enabled: false,
  },
};

export default networkOptions;
