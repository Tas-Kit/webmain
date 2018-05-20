import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';

import Toolbar from './Toolbar';

import * as dialogActions from '../../actions/dialogActions';

import { getAdaptedWidth, getAdaptedHeight } from '../../utils/functions';
import networkOptions from '../../constants/networkOptions';

import gs from '../../services/GraphService';

import { NODE_IMAGE_MAP, NODE_COORD_MAP, NODE_LABEL_MAP } from '../../constants/nodes';

const { Network, DataSet } = vis;

const styles = {
  mainContainer: {
    position: 'relative',
    flex: 1,
  },
};

class Viewer extends React.Component {
  constructor() {
    super();
    this.network = null;
    this.graphData = {
      nodes: new DataSet(),
      edges: new DataSet(),
    };
    this.draggingIndex = -1;
  }

  componentDidMount = () => {
    gs.createGraph(this.graphElement);
    gs.clearAllNodes();
    const { taskNodes } = this.props.taskManager;
    const nodes = taskNodes.map((node) => {
      const DOMCoord = NODE_COORD_MAP[node.node_type];
      const canvasCoord = gs.network.DOMtoCanvas(DOMCoord);
      return ({
        id: node.sid,
        shape: 'image',
        image: NODE_IMAGE_MAP[node.node_type],
        label: NODE_LABEL_MAP[node.node_type],
        x: canvasCoord.x,
        y: canvasCoord.y,
      });
    });
    gs.addNode(nodes);
  }

  graphInit = () => {
    // vis options
    const options = {
      ...networkOptions,
      width: String(getAdaptedWidth()),
      height: String(getAdaptedHeight()),
    };

    this.network = new Network(this.graphElement, this.graphData, options);

    window.addEventListener('resize', () => {
      this.network.setOptions({
        width: String(getAdaptedWidth()),
        height: String(getAdaptedHeight()),
      });
    });
  }

  handleDrop = (e) => {
    const offsetX = 240; // width of drawer
    const offsetY = 136; // height of top bars
    const canvasCoord = gs.network.DOMtoCanvas({
      x: e.pageX - offsetX,
      y: e.pageY - offsetY,
    });
    const node = {
      shape: 'image',
      image: NODE_IMAGE_MAP[this.draggingIndex],
      x: canvasCoord.x,
      y: canvasCoord.y,
      label: 'task1',
    };
    gs.addNode(node);

    // open step info dialog and populate data
    this.props.actions.toggleStepInfo();
  }

  handleDragStart = index => () => {
    this.draggingIndex = index;
  }

  render() {
    return (
      <div
        style={styles.mainContainer}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={this.handleDrop}
      >
        {/* Graph */}
        <div ref={(el) => { this.graphElement = el; }} />

        {/* Toolbar */}
        <Toolbar onDragStart={this.handleDragStart} />
      </div>
    );
  }
}

const mapStateToProps = ({ taskManager }) => ({ taskManager });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(dialogActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
