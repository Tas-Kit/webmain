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
      const nodeId = gs.network.getNodeAt(data.pointer.DOM);
      if (nodeId) {
        const {
          updateStepInfo, toggleStepViewer,
          toggleStepEditor, setIsStartEnd,
        } = this.props.actions;
        const { editMode } = this.props.currentUserManager;
        const nodeData = gs.getNode(nodeId);
        // if (nodeData.node_type === START_NODE || nodeData.node_type === END_NODE) {
        //   updateMessage('No step information on start or end node.');
        // } else {
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
        // }
      }
    });

    gs.clearAll();
    const { taskNodes, taskEdges } = this.props.taskManager;
    const nodes = mapNodeResponseData(taskNodes);
    const edges = getColoredEdge(taskEdges, nodes);
    gs.addNode(nodes);
    gs.addEdge(edges);
    gs.fit();
  }

  handleDrop = (e) => {
    const { draggingNodeType } = this.props.graphManager;
    const { resetStepInfo, updateMessage } = this.props.actions;
    resetStepInfo();
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
