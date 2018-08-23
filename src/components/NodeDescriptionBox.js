import React from 'react';

const inline = {
  main: {
    position: 'absolute',
    x: 0,
    y: 0,
  },
};

class NodeDescriptionBox extends React.Component {
  constructor() {
    super();
    this.state = {
      nodeInfo: {
        description: '',
        x: 0,
        y: 0,
      },
    };
  }

  render() {
    const { nodeInfo } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          left: nodeInfo.x,
          top: nodeInfo.y,
        }}
      >
        {'text'}
        {nodeInfo.description}
      </div>
    );
  }
}

export default NodeDescriptionBox;
