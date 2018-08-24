import React from 'react';
import {
  TOOLTIP_BACKGROUND,
  TOOLTIP_BOX_SHADOW,
  TOOLTIP_BORDER,
  WHITE,
} from '../constants/colors';

const inline = {
  main: {
    position: 'absolute',
    backgroundColor: TOOLTIP_BACKGROUND,
    color: WHITE,
    fontSize: 10,
    boxShadow: `3px 3px 10px ${TOOLTIP_BOX_SHADOW}`,
    maxWidth: 150,
    padding: '6px 8px',
    lineHeight: 1.6,
    border: `1px solid ${TOOLTIP_BORDER}`,
    fontFamily: 'verdana',
  },
};

class NodeDescriptionBox extends React.Component {
  render() {
    const { nodeInfo } = this.props;
    return (
      nodeInfo.description &&
      <div
        style={{
          ...inline.main,
          left: nodeInfo.x,
          top: nodeInfo.y,
        }}
      >
        {nodeInfo.description}
      </div>
    );
  }
}

export default NodeDescriptionBox;
