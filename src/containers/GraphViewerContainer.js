import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import { GraphViewer } from '../components/Graph';

// services
import gs from '../services/GraphService';

// actions
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';
import * as graphActions from '../actions/graphActions';

import {
  NODE_IMAGE_MAP,
  NODE_COORD_MAP,
  START_NODE,
  END_NODE,
} from '../constants/nodes';

class GraphViewerContainer extends React.Component {
  componentDidMount = () => {
    this.initNetwork();
  }

  initNetwork = () => {
    gs.createGraph(this.graphViewer.graphElement);
    gs.clearAllNodes();
    const { taskNodes } = this.props.taskManager;
    const nodes = this.mapNodes(taskNodes);
    gs.addNode(nodes);
  }

  mapNodes = nodes => (
    nodes.map((node) => {
      let canvasCoord;
      if (node.node_type === END_NODE || node.node_type === START_NODE) {
        const DOMCoord = NODE_COORD_MAP[node.node_type];
        canvasCoord = gs.network.DOMtoCanvas(DOMCoord);
      } else {
        canvasCoord = { x: node.pos_x, y: node.pos_y };
      }
      return ({
        ...node,
        id: node.sid,
        old_id: node.id,
        shape: 'image',
        image: NODE_IMAGE_MAP[node.node_type],
        label: node.name,
        x: canvasCoord.x,
        y: canvasCoord.y,
        size: 20,
      });
    })
  );

  handleDrop = (e) => {
    const { setNodeCanvasCoord } = this.props.actions;
    const offsetX = 240; // width of drawer
    const offsetY = 128; // height of top bars
    const canvasCoord = gs.network.DOMtoCanvas({
      x: e.pageX - offsetX,
      y: e.pageY - offsetY,
    });
    setNodeCanvasCoord(canvasCoord);
    this.props.actions.toggleStepCreator();
  }

  render() {
    return (
      <GraphViewer
        ref={(element) => { this.graphViewer = element; }}
        onDrop={this.handleDrop}
      />
    );
  }
}

const mapStateToProps = ({ taskManager, graphManager }) => ({ taskManager, graphManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...dialogActions, ...taskActions, ...graphActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphViewerContainer);
