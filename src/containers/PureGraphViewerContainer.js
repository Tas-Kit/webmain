import React from 'react';
import { connect } from 'react-redux';

// components
import { PureGraphViewer } from '../components/Graph';

// services
import gs from '../services/GraphService';

import { mapNodeResponseData, getColoredEdge } from '../utils/functions';

class PureGraphViewerContainer extends React.Component {
  componentDidMount = () => { this.initNetwork(); }

  initNetwork = () => {
    gs.createGraph(this.graphViewer.graphElement);
    gs.network.setOptions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    gs.clearAll();
    const { taskNodes, taskEdges } = this.props.taskManager;
    const nodes = mapNodeResponseData(taskNodes);
    const edges = getColoredEdge(taskEdges, nodes);
    gs.addNode(nodes);
    gs.addEdge(edges);
    gs.fit();
  }

  render() {
    return (
      <PureGraphViewer
        ref={(element) => { this.graphViewer = element; }}
      />
    );
  }
}

const mapStateToProps = store => ({
  taskManager: store.taskManager,
  graphManager: store.graphManager,
  currentUserManager: store.currentUserManager,
});

export default connect(mapStateToProps)(PureGraphViewerContainer);
