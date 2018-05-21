import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GraphToolbar } from '../components/Graph';

// actions
import * as graphActions from '../actions/graphActions';

// services
import gs from '../services/GraphService';

const GraphToolbarContainer = (props) => {
  const { setDraggingIndex } = props.actions;
  const handleAddEdge = () => { gs.addEdgeMode(); };
  return (
    <GraphToolbar onDragStart={setDraggingIndex} onAddEdge={handleAddEdge} />
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(graphActions, dispatch),
});

export default connect(null, mapDispatchToProps)(GraphToolbarContainer);
