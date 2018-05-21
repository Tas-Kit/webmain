import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Link from '@material-ui/icons/Link';
import task1 from '../../assets/svgs/task1.svg';

import { LIGHT_PINK, TRANSPARENT_LIGHT_BLUE } from '../../constants/colors';

const inline = {
  main: {
    display: 'flex',
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    bottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    backgroundColor: 'rgba(222, 222, 222, 0.6)',
    padding: '10px 30px 2px 30px',
    borderRadius: 8,
  },
  iconDiv: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
  },
  icon: {
    width: 40,
    height: 40,
  },
  divider: {
    display: 'inline-block',
    width: 1,
    height: 40,
    backgroundColor: 'silver',
    margin: '0px 15px',
  },
  deleteButton: {
    verticalAlign: 'top',
    color: LIGHT_PINK,
  },
  edgeButton: {
    verticalAlign: 'top',
    color: TRANSPARENT_LIGHT_BLUE,
  },
};

const Toolbar = (props) => {
  const prototypes = [
    <img src={task1} style={inline.icon} alt="taskSvg" />,
  ];
  const { onDragStart, onAddEdge } = props;

  return (
    <div style={inline.main}>
      <div style={inline.toolbar}>
        {prototypes.map((item, index) => (
          <div
            key={`item_${index + 1}`}
            draggable="true"
            style={inline.iconDiv}
            onDragStart={() => { onDragStart(index); }}
          >
            {item}
          </div>
        ))}
        <div style={inline.divider} />
        <IconButton style={inline.deleteButton}>
          <Delete />
        </IconButton>
        <IconButton style={inline.edgeButton} onClick={onAddEdge}>
          <Link />
        </IconButton>
      </div>
    </div>
  );
};

export default Toolbar;
