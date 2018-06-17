import React from 'react';
import { FormattedMessage } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Link from '@material-ui/icons/Link';
import Tooltip from '@material-ui/core/Tooltip';

// contants
import { LIGHT_PINK, TRANSPARENT_LIGHT_BLUE, INIT, SKIPPED } from '../../constants/colors';
import {
  NORMAL_NODE,
  CHECK_LIST_NODE,
  FILE_NODE,
  JOIN_NODE,
  MULTIPLE_CHOICE_NODE,
  SUB_TASK_NODE,
  NODE_NAME_ID_MAP,
} from '../../constants/nodes';
import * as svgStrings from '../../assets/svgStrings';

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
    margin: '0px 5px',
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
  const {
    onDragStart,
    onAddEdge,
    onDelete,
    deleteSelected,
    addEdgeSelected,
    editMode,
  } = props;

  const generateNodePrototypes = (nodeTypes = []) => (
    nodeTypes.map((type) => {
      let svgString;
      if (type === NORMAL_NODE) {
        svgString = svgStrings[type](INIT);
      } else {
        svgString = svgStrings[type](SKIPPED);
      }
      const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      return (
        <img src={imageUrl} style={inline.icon} alt="taskSvg" nodetype={type} />
      );
    })
  );

  const getTooltip = type => <FormattedMessage id={NODE_NAME_ID_MAP[type]} />;

  const prototypes = generateNodePrototypes([
    NORMAL_NODE,
    CHECK_LIST_NODE,
    FILE_NODE,
    JOIN_NODE,
    MULTIPLE_CHOICE_NODE,
    SUB_TASK_NODE,
  ]);

  if (editMode) {
    return (
      <div style={inline.main}>
        <div style={inline.toolbar}>
          {prototypes.map((item, index) => (
            <Tooltip
              placement="top"
              id={`node_${index}`}
              title={getTooltip(item.props.nodetype)}
            >
              <div
                key={`item_${index + 1}`}
                draggable="true"
                style={inline.iconDiv}
                onDragStart={() => { onDragStart(item.props.nodetype); }}
              >
                {item}
              </div>
            </Tooltip>
          ))}
          <div style={inline.divider} />
          <Tooltip placement="top" title={<FormattedMessage id="addEdgeButton" />}>
            <IconButton
              style={addEdgeSelected ? inline.addEdgeSelected : inline.addEdge}
              onClick={onAddEdge}
            >
              <Link style={inline.iconButton} />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title={<FormattedMessage id="deleteItemButton" />}>
            <IconButton
              style={deleteSelected ? inline.deleteSelected : inline.delete}
              onClick={onDelete}
            >
              <Delete style={inline.iconButton} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  }
  return <div />;
};

export default Toolbar;
