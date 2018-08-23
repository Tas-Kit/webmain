import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import { PureGraphViewer } from '../components/Graph';

// services
import gs from '../services/GraphService';

import * as graphActions from '../actions/graphActions';

import { mapNodeResponseData, getColoredEdge } from '../utils/functions';

class PureGraphViewerContainer extends React.Component {
  componentDidMount = () => { this.initNetwork(); }

  initNetwork = () => {
    const isPure = true;
    gs.createGraph(this.graphViewer.graphElement, isPure);

    this.adaptScreenSize();

    gs.network.on('click', (data) => {
      console.log('pure graph viewer click');
      console.log(data);
      if (data.nodes.length === 1) {
        const nodeId = data.nodes[0];
        const node = gs.getNode(nodeId);
        const nodeDataToSend = {
          x: data.pointer.DOM.x,
          y: data.pointer.DOM.y,
          description: node.description,
        };
        // this.props.actions.openNodeDescriptionBox();
        this.props.actions.updateNodeInfo(nodeDataToSend);
      }
    });

    window.addEventListener('orientationchange', () => {
      this.adaptScreenSize();
      gs.fit();
    });

    gs.clearAll();
    const { taskNodes, taskEdges } = this.props.taskManager;
    const nodes = mapNodeResponseData(taskNodes).map(node => ({ ...node, fixed: true }));
    const edges = getColoredEdge(taskEdges, nodes);
    gs.addNode(nodes);
    gs.addEdge(edges);
    gs.fit();
  }

  adaptScreenSize = () => {
    // screen object only works for mobile devices
    gs.network.setOptions({
      width: String(window.orientation === 0 ? window.screen.width : window.screen.height),
      height: String(window.orientation === 0 ? window.screen.height : window.screen.width),
    });
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(graphActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PureGraphViewerContainer);
