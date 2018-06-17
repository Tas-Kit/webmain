import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NODE_STATUS_COLOR_MAP } from '../../constants/nodes';

const inline = {
  main: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  legend: {
    margin: '10px 20px',
  },
  colorBall: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
  },
  text: {
    position: 'relative',
    top: -1,
    display: 'inline-block',
    fontSize: 11,
    margin: '0px 10px',
  },
};

const ColorLegend = () => {
  const statusTypes = Object.keys(NODE_STATUS_COLOR_MAP);
  return (
    <div style={inline.main}>
      {statusTypes.map(status => (
        <div key={status} style={inline.legend}>
          <div style={{ ...inline.colorBall, backgroundColor: NODE_STATUS_COLOR_MAP[status] }} />
          <div style={inline.text}><FormattedMessage id={status} /></div>
        </div>
      ))}
    </div>
  );
};

export default ColorLegend;
