import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';

import Toolbar from './Toolbar';

import * as dialogActions from '../../actions/dialogActions';

import { getAdaptedWidth, getAdaptedHeight } from '../../utils/functions';

import svg0 from '../../assets/svgs/icon0.svg';

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
  }

  componentDidMount = () => {
    this.graphInit();
  }

  graphInit = () => {
    // vis options
    const options = {
      width: String(getAdaptedWidth()),
      height: String(getAdaptedHeight()),
      nodes: {
        shadow: {
          enabled: true,
          color: '#c8c8c8',
          size: 10,
          x: 3,
          y: 3,
        },
      },
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
    const canvasCoord = this.network.DOMtoCanvas({
      x: e.pageX - offsetX,
      y: e.pageY - offsetY,
    });

    // const { draggingIndex } = this.state;
    const node = {
      shape: 'image',
      image: svg0,
      x: canvasCoord.x,
      y: canvasCoord.y,
    };
    this.addNode(node);

    // open step info dialog and populate data
    this.props.actions.toggleStepInfo();
  }

  addNode = (node) => { this.graphData.nodes.add(node); }

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
