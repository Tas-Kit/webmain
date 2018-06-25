import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

// components
import { GraphViewer } from '../components/Graph';

// services
import gs from '../services/GraphService';

// actions
import * as dialogActions from '../actions/dialogActions';
import * as taskActions from '../actions/taskActions';
import * as stepActions from '../actions/stepActions';
import * as graphActions from '../actions/graphActions';
import * as snackbarActions from '../actions/snackbarActions';

import {
  START_NODE,
  END_NODE,
  NORMAL_NODE,
} from '../constants/nodes';
import { mapNodeToStepInfo, mapNodeResponseData, getColoredEdge } from '../utils/functions';

class GraphViewerContainer extends React.Component {
  componentDidMount = () => { this.initNetwork(); }

  initNetwork = () => {
    gs.createGraph(this.graphViewer.graphElement);

    // initialize listeners
    gs.network.on('click', (data) => {
      const { deleteSelected } = this.props.graphManager;
      if (deleteSelected) {
        // delete mode
        const { nodes, edges } = gs.network.getSelection();
        const { updateMessage, updateGraphDataJson } = this.props.actions;
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
      } else {
        // select mode
        const nodeId = gs.network.getNodeAt(data.pointer.DOM);
        if (nodeId) {
          const {
            updateStepInfo, toggleStepViewer,
            toggleStepEditor, setIsStartEnd,
          } = this.props.actions;
          const { editMode } = this.props.currentUserManager;
          const nodeData = gs.getNode(nodeId);
          const isStartEnd = nodeData.node_type === START_NODE || nodeData.node_type === END_NODE;
          setIsStartEnd(isStartEnd);
          const newStepInfo = mapNodeToStepInfo(nodeData);
          gs.setActiveItemId(nodeData.id);
          updateStepInfo(newStepInfo, nodeData.sid);
          if (editMode) {
            toggleStepEditor();
          } else {
            toggleStepViewer();
          }
        }
      }
    });

    gs.clearAll();
    const { taskNodes, taskEdges } = this.props.taskManager;
    const nodes = mapNodeResponseData(taskNodes);
    const edges = getColoredEdge(taskEdges, nodes);
    gs.addNode(nodes);
    gs.addEdge(edges);
    gs.fit();

    // save original graph data for checking unsaved changes
    const graphDataOrigin = gs.activeData;
    this.props.actions.setGraphDataOrigin(JSON.parse(JSON.stringify(graphDataOrigin)));
    this.props.actions.updateGraphDataJson(JSON.parse(JSON.stringify(graphDataOrigin)));
  }

  handleDrop = (e) => {
    const { draggingNodeType } = this.props.graphManager;
    const { resetStepInfo, updateMessage, setIsStartEnd } = this.props.actions;
    resetStepInfo();
    setIsStartEnd(false); // clear previous start/end node flag
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
      updateMessage(<FormattedMessage id="nodeUnavailableMsg" />);
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

const mapStateToProps = store => ({
  taskManager: store.taskManager,
  graphManager: store.graphManager,
  currentUserManager: store.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...stepActions,
    ...dialogActions,
    ...taskActions,
    ...graphActions,
    ...snackbarActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphViewerContainer);
