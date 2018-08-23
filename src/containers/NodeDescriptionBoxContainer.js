import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NodeDescriptionBox from '../components/NodeDescriptionBox';

const NodeDescriptionBoxContainer = (props) => {
  const { nodeInfo } = props.graphManager;
  console.log(nodeInfo);
  return (
    <NodeDescriptionBox nodeInfo={nodeInfo} />
  );
};

const mapStateToProps = state => ({
  graphManager: state.graphManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeDescriptionBoxContainer);
