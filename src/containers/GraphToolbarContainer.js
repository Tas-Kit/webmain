import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GraphToolbar } from '../components/Graph';

// actions
import * as graphActions from '../actions/graphActions';
import * as snackbarActions from '../actions/snackbarActions';

// services
import gs from '../services/GraphService';

const GraphToolbarContainer = (props) => {
  const {
    setDraggingNodeType,
    toggleAddEdgeButton,
    toggleDeleteButton,
  } = props.actions;
  const { addEdgeSelected, deleteSelected } = props.graphManager;
  const { editMode } = props.currentUserManager;

  const resetMode = () => {
    if (addEdgeSelected) {
      toggleAddEdgeButton();
      gs.exitEditMode();
    }
    if (deleteSelected) {
      toggleDeleteButton();
    }
  };

  const handleAddEdge = () => {
    resetMode();
    if (!addEdgeSelected) {
      // const newAddEdgeSelected = !addEdgeSelected;
      toggleAddEdgeButton();
      // if (newAddEdgeSelected) {
      gs.addEdgeMode();
      // } else {
      //   gs.exitEditMode();
      // }
    }
  };

  const handleDelete = () => {
    resetMode();
    if (!deleteSelected) {
      toggleDeleteButton();
    }
  };

  return (
    <GraphToolbar
      onDragStart={setDraggingNodeType}
      onAddEdge={handleAddEdge}
      onDelete={handleDelete}
      addEdgeSelected={addEdgeSelected}
      deleteSelected={deleteSelected}
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
