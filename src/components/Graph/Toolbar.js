import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Link from '@material-ui/icons/Link';
import basic from '../../assets/svgs/basic.svg';

import { LIGHT_PINK, TRANSPARENT_LIGHT_BLUE } from '../../constants/colors';

const inline = {
  main: {
    display: 'flex',
    position: 'absolute',
    height: 80,
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
    height: 80,
  },
  iconDiv: {
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    width: 60,
    height: 60,
  },
  icon: {
    width: 60,
    height: 60,
  },
  divider: {
    display: 'inline-block',
    width: 1,
    height: 60,
    backgroundColor: 'silver',
    margin: '0px 15px',
  },
  delete: {
    verticalAlign: 'top',
    color: LIGHT_PINK,
    width: 45,
    height: 45,
    top: 5,
  },
  deleteSelected: {
    verticalAlign: 'top',
    color: LIGHT_PINK,
    backgroundColor: 'silver',
    width: 50,
    height: 50,
    top: 5,
  },
  addEdge: {
    verticalAlign: 'top',
    color: TRANSPARENT_LIGHT_BLUE,
    width: 50,
    height: 50,
    top: 5,
  },
  addEdgeSelected: {
    verticalAlign: 'top',
    color: TRANSPARENT_LIGHT_BLUE,
    backgroundColor: 'silver',
    width: 50,
    height: 50,
    top: 5,
  },
  iconButton: {
    width: 40,
    height: 40,
  },
};

const Toolbar = (props) => {
  const prototypes = [
    <img src={basic} style={inline.icon} alt="taskSvg" />,
  ];
  const {
    onDragStart,
    onAddEdge,
    onDelete,
    deleteSelected,
    addEdgeSelected,
  } = props;

  return (
    <div style={inline.main}>
      <div style={inline.toolbar}>
        {prototypes.map((item, index) => (
          <div
            key={`item_${index + 1}`}
            draggable="true"
            style={inline.iconDiv}
            onDragStart={() => { onDragStart('n'); }}
          >
            {item}
          </div>
        ))}
        <div style={inline.divider} />
        <IconButton
          style={addEdgeSelected ? inline.addEdgeSelected : inline.addEdge}
          onClick={onAddEdge}
        >
          <Link style={inline.iconButton} />
        </IconButton>
        <IconButton
          style={deleteSelected ? inline.deleteSelected : inline.delete}
          onClick={onDelete}
        >
          <Delete style={inline.iconButton} />
        </IconButton>
      </div>
    </div>
  );
};

export default Toolbar;
