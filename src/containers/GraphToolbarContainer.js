import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GraphToolbar } from '../components/Graph';

// actions
import * as graphActions from '../actions/graphActions';

const GraphToolbarContainer = (props) => {
  const { setDraggingIndex } = props.actions;
  return (
    <GraphToolbar onDragStart={setDraggingIndex} />
  );
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(graphActions, dispatch),
});

export default connect(null, mapDispatchToProps)(GraphToolbarContainer);
