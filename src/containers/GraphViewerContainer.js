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
import * as snackbarActions from '../actions/snackbarActions';

import {
  NODE_COORD_MAP,
  NODE_STATUS_COLOR_MAP,
  START_NODE,
  END_NODE,
  NORMAL_NODE,
} from '../constants/nodes';
import * as svgStrings from '../assets/svgStrings';

class GraphViewerContainer extends React.Component {
  componentDidMount = () => {
    this.initNetwork();
  }

  initNetwork = () => {
    gs.createGraph(this.graphViewer.graphElement);

    // initialize listeners
    gs.network.on('oncontext', (data) => {
      console.log(data);
      data.event.preventDefault();
      const nodeId = gs.network.getNodeAt(data.pointer.DOM);
      if (nodeId) {
        console.log('node');
        this.props.actions.toggleStepViewer();
      }
    });

    gs.clearAll();
    const { taskNodes, taskEdges } = this.props.taskManager;
    const nodes = this.mapNodes(taskNodes);
    gs.addNode(nodes);
    gs.addEdge(taskEdges);
    gs.fit();
  }

  mapNodes = nodes => (
    nodes.map((node) => {
      let svgString;
      if (node.status === START_NODE || node.status === END_NODE) {
        svgString = svgStrings[node.node_type]();
      } else {
        const color = NODE_STATUS_COLOR_MAP[node.status];
        svgString = svgStrings[node.node_type](color);
      }
      const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      let canvasCoord;
      if (node.pos_x && node.pos_y) {
        canvasCoord = { x: node.pos_x, y: node.pos_y };
      } else {
        const DOMCoord = NODE_COORD_MAP[node.node_type];
        canvasCoord = gs.network.DOMtoCanvas(DOMCoord);
      }
      return ({
        ...node,
        id: node.sid,
        old_id: node.id,
        shape: 'image',
        image: imageUrl,
        label: node.name,
        x: canvasCoord.x,
        y: canvasCoord.y,
        size: 40,
      });
    })
  );

  handleDrop = (e) => {
    const { draggingNodeType } = this.props.graphManager;
    const { updateMessage } = this.props.actions;
    if (draggingNodeType === NORMAL_NODE) {
      const { setNodeCanvasCoord } = this.props.actions;
      const offsetX = 240; // width of drawer
      const offsetY = 128; // height of top bars
      const canvasCoord = gs.network.DOMtoCanvas({
        x: e.pageX - offsetX,
        y: e.pageY - offsetY,
      });
      setNodeCanvasCoord(canvasCoord);
      this.props.actions.toggleStepCreator();
    } else {
      updateMessage('Currently only normal node is available.');
    }
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
  actions: bindActionCreators({
    ...dialogActions,
    ...taskActions,
    ...graphActions,
    ...snackbarActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphViewerContainer);
