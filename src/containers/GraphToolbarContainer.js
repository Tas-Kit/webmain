import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    setDraggingIndex,
    updateMessage,
    toggleAddEdgeButton,
  } = props.actions;
  const { addEdgeSelected } = props.graphManager;

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
      } else {
        // it's either a start or an end node
        updateMessage('Start/End node can\'t be deleted.');
      }
    } else if (nodes.length === 0 && edges.length === 1) {
      // it's an edge to be deleted
      gs.removeEdge(edges);
    } else if (nodes.length === 0 && edges.length === 0) {
      updateMessage('Please select a node or an edge to delete.');
    }
  };

  return (
    <GraphToolbar
      onDragStart={setDraggingIndex}
      onAddEdge={handleAddEdge}
      onDelete={handleDelete}
      addEdgeSelected={addEdgeSelected}
    />
  );
};

const mapStateToProps = ({ graphManager }) => ({ graphManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...graphActions, ...snackbarActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphToolbarContainer);
