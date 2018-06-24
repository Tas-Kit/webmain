import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { GraphToolbar } from '../components/Graph';

// actions
import * as graphActions from '../actions/graphActions';
import * as snackbarActions from '../actions/snackbarActions';

// services
import gs from '../services/GraphService';

// constants
import { START_NODE, END_NODE } from '../constants/nodes';

const GraphToolbarContainer = (props) => {
  const {
    setDraggingNodeType,
    updateMessage,
    toggleAddEdgeButton,
    updateGraphDataJson,
  } = props.actions;
  const { addEdgeSelected } = props.graphManager;
  const { editMode } = props.currentUserManager;

  const handleAddEdge = () => {
    const newAddEdgeSelected = !addEdgeSelected;
    toggleAddEdgeButton();
    if (newAddEdgeSelected) {
      gs.addEdgeMode();
    } else {
      gs.exitEditMode();
    }
  };

  const handleDelete = () => {
    const { nodes, edges } = gs.network.getSelection();
    if (nodes.length === 1) {
      // it's a node to be deleted
      const node = gs.getNode(nodes[0]);
      // start/end node can't be deleted
      if (node.node_type !== START_NODE && node.node_type !== END_NODE) {
        gs.removeNode(nodes);
        gs.removeEdge(edges);
        updateGraphDataJson(JSON.parse(JSON.stringify(gs.activeData)));
      } else {
        // it's either a start or an end node
        updateMessage(<FormattedMessage id="startEndNodeDeleteMsg" />);
      }
    } else if (nodes.length === 0 && edges.length === 1) {
      // it's an edge to be deleted
      gs.removeEdge(edges);
      updateGraphDataJson(JSON.parse(JSON.stringify(gs.activeData)));
    } else if (nodes.length === 0 && edges.length === 0) {
      updateMessage(<FormattedMessage id="selectNodeToDeleteMsg" />);
    }
  };

  return (
    <GraphToolbar
      onDragStart={setDraggingNodeType}
      onAddEdge={handleAddEdge}
      onDelete={handleDelete}
      addEdgeSelected={addEdgeSelected}
      editMode={editMode}
    />
  );
};

const mapStateToProps = store => ({
  graphManager: store.graphManager,
  currentUserManager: store.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...graphActions, ...snackbarActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphToolbarContainer);
