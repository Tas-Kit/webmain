import React from 'react';
import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';

import Toolbar from './Toolbar';

const { Network, DataSet } = vis;

const styles = {
  mainContainer: {
    position: 'relative',
    flex: 1,
  },
  graphContainer: {
    width: window.innerWidth - 240,
    height: window.innerHeight - 136,
  },
};

class Viewer extends React.Component {
  constructor() {
    super();
    this.state = {
      draggingIndex: -1,
    };

    this.network = null;
    this.graphData = {
      nodes: new DataSet(),
      edges: new DataSet(),
    };
  }

  componentDidMount = () => {
    this.graphInit();
  }

  graphInit = () => {
    // vis options
    const options = {
      edges: {
        color: {
          color: '#ccc',
          highlight: '#ccc',
          hover: '#ccc',
          inherit: 'from',
          opacity: 0.8,
        },
      },
      physics: {
        enabled: false,
      },
    };

    this.network = new Network(this.graphElement, this.graphData, options);
  }

  handleDrop = (e) => {
    const offsetX = 240; // width of drawer
    const offsetY = 136; // height of top bars
    const canvasCoord = this.network.DOMtoCanvas({
      x: e.pageX - offsetX,
      y: e.pageY - offsetY,
    });

    const { draggingIndex } = this.state;
    const node = {
      shape: 'image',
      image: require(`../../assets/svgs/icon${draggingIndex}.svg`),
      x: canvasCoord.x,
      y: canvasCoord.y,
    };
    this.addNode(node);
    this.resetDraggingIndex();
  }

  addNode = (node) => {
    this.graphData.nodes.add(node);
  }

  handleDragStart = index => () => {
    console.log(index);
    this.setState({ draggingIndex: index });
  }

  resetDraggingIndex = () => {
    this.setState({ draggingIndex: -1 });
  }

  render() {
    return (
      <div
        style={styles.mainContainer}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={this.handleDrop}
      >
        {/* Graph */}
        <div ref={(el) => { this.graphElement = el; }} style={styles.graphContainer} />

        {/* Toolbar */}
        <Toolbar onDragStart={this.handleDragStart} />
      </div>
    );
  }
}

export default Viewer;
