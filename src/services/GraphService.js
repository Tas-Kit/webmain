import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';
import redux from './ReduxService';
import networkOptions from '../constants/networkOptions';
import { getAdaptedWidth, getAdaptedHeight } from '../utils/functions';
import { NODE_STATUS_COLOR_MAP } from '../constants/nodes';

const { DataSet, Network } = vis;


class GraphService {
  constructor() {
    this.activeData = {
      nodes: new DataSet(),
      edges: new DataSet(),
    };
    this.network = null;
    this.activeItemId = null;
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
          const fromNodeId = edgeData.from;
          const node = this.activeData.nodes.get(fromNodeId);
          const nodeStatusColor = NODE_STATUS_COLOR_MAP[node.status];
          const newEdgeData = {
            ...edgeData,
            color: {
              color: nodeStatusColor,
              highlight: nodeStatusColor,
            },
          };
          callback(newEdgeData);
        },
      },
    };

    this.network = new Network(graphElement, this.activeData, options);

    this.network.on('dragEnd', (data) => {
      // add edge if in addEdge mode
      const { addEdgeSelected } = redux.store.getState().graphManager;
      if (addEdgeSelected) {
        const DOMCoord = data.pointer.DOM;
        // reactivate addEdge mode if in addEdge mode and end pointer is on an end node
        const endAtNode = this.network.getNodeAt(DOMCoord);
        if (endAtNode) this.network.addEdgeMode();
      }

      // update node position if at the end of dragging a node
      if (data.nodes.length === 1) {
        const nodeId = data.nodes[0];
        const node = this.activeData.nodes.get(nodeId);
        const canvasCoord = data.pointer.canvas;
        // hard code now, TODO put into constants
        var offset = 120;
        this.updateNode({
          ...node,
          x: Math.round(canvasCoord.x / offset) * offset,
          y: Math.round(canvasCoord.y / offset) * offset,
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

  setActiveItemId = (id) => { this.activeItemId = id; }

  addNode = (nodeData) => { this.activeData.nodes.add(nodeData); }

  updateNode = (nodeData) => { this.activeData.nodes.update(nodeData); }

  updateEdge = (edgeData) => { this.activeData.edges.update(edgeData); }

  addEdge = (edgeData) => { this.activeData.edges.add(edgeData); }

  addEdgeMode = () => { this.network.addEdgeMode(); }

  removeNode = (nodeData) => { this.activeData.nodes.remove(nodeData); }

  removeEdge = (edgeData) => { this.activeData.edges.remove(edgeData); }

  getNode = nodeId => this.activeData.nodes.get(nodeId)

  getAllEdges = () => this.activeData.edges.get()

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
