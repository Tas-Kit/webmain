import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';
import redux from './ReduxService';
import networkOptions from '../constants/networkOptions';
import { getAdaptedWidth, getAdaptedHeight } from '../utils/functions';

const { DataSet, Network } = vis;


class GraphService {
  constructor() {
    this.activeData = {
      nodes: new DataSet(),
      edges: new DataSet(),
    };
    this.network = null;
  }

  createGraph = (graphElement) => {
    const options = {
      ...networkOptions,
      width: String(getAdaptedWidth()),
      height: String(getAdaptedHeight()),
      manipulation: {
        enabled: false,
        initiallyActive: false,
        addEdge: (edgeData, callback) => {
          const newEdgeData = Object.assign({}, edgeData);
          callback(newEdgeData);
        },
      },
    };

    this.network = new Network(graphElement, this.activeData, options);

    this.network.on('dragEnd', (data) => {
      // reactivate addEdge mode if in addEdge mode and end pointer is on an end node
      const { addEdgeSelected } = redux.store.getState().graphManager;
      if (addEdgeSelected) {
        const DOMCoord = data.pointer.DOM;
        const endAtNode = this.network.getNodeAt(DOMCoord);
        if (endAtNode) this.network.addEdgeMode();
      }

      // at the end of dragging a node
      if (data.nodes.length === 1) {
        const nodeId = data.nodes[0];
        const node = this.activeData.nodes.get(nodeId);
        const canvasCoord = data.pointer.canvas;
        this.updateNode({
          ...node,
          x: canvasCoord.x,
          y: canvasCoord.y,
        });
      }
    });

    window.addEventListener('resize', () => {
      this.network.setOptions({
        width: String(getAdaptedWidth()),
        height: String(getAdaptedHeight()),
      });
    });
  }

  addNode = (nodeData) => { this.activeData.nodes.add(nodeData); }

  updateNode = (nodeData) => { this.activeData.nodes.update(nodeData); }

  addEdge = (edgeData) => { this.activeData.edges.add(edgeData); }

  addEdgeMode = () => { this.network.addEdgeMode(); }

  removeNode = (nodeData) => { this.activeData.nodes.remove(nodeData); }

  removeEdge = (edgeData) => { this.activeData.edges.remove(edgeData); }

  getNode = nodeId => this.activeData.nodes.get(nodeId)

  clearAllNodes = () => { this.activeData.nodes.clear(); }

  clearAllEdges = () => { this.activeData.edges.clear(); }

  clearAll = () => {
    this.clearAllNodes();
    this.clearAllEdges();
  }

  exitEditMode = () => { this.network.disableEditMode(); }

  fit = () => { this.network.fit({ animation: { duration: 500 } }); }
}

export default new GraphService();
