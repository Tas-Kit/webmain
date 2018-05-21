import vis from 'vis/dist/vis.min';
import 'vis/dist/vis-network.min.css';

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
    };

    this.network = new Network(graphElement, this.activeData, options);

    window.addEventListener('resize', () => {
      this.network.setOptions({
        width: String(getAdaptedWidth()),
        height: String(getAdaptedHeight()),
      });
    });
  }

  addNode = (nodeData) => { this.activeData.nodes.add(nodeData); }

  clearAllNodes = () => { this.activeData.nodes.clear(); }
}

export default new GraphService();
