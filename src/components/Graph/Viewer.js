import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';

import Toolbar from './Toolbar';

import * as dialogActions from '../../actions/dialogActions';

import { MIN_ALLOW_WINDOW_WIDTH, DRAWER_WIDTH, APP_BAR_HEIGHT, TOOL_BAR_HEIGHT } from '../../constants';

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

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      this.network.setOptions({
        width: width >= MIN_ALLOW_WINDOW_WIDTH ? String(window.innerWidth - DRAWER_WIDTH) : MIN_ALLOW_WINDOW_WIDTH,
        height: String(window.innerHeight - APP_BAR_HEIGHT - TOOL_BAR_HEIGHT),
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

    const { draggingIndex } = this.state;
    const node = {
      shape: 'image',
      image: require(`../../assets/svgs/icon${draggingIndex}.svg`),
      x: canvasCoord.x,
      y: canvasCoord.y,
    };
    this.addNode(node);
    this.resetDraggingIndex();

    // open step info dialog and populate data
    this.props.actions.toggleStepInfo();
  }

  addNode = (node) => { this.graphData.nodes.add(node); }

  handleDragStart = index => () => { this.setState({ draggingIndex: index }); }

  resetDraggingIndex = () => { this.setState({ draggingIndex: -1 }); }

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
