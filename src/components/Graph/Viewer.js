import React from 'react';
import GraphToolbarContainer from '../../containers/GraphToolbarContainer';
import ColorLegend from './ColorLegend';

const styles = {
  mainContainer: {
    position: 'relative',
    flex: 1,
  },
};

class Viewer extends React.Component {
  render() {
    const { onDrop } = this.props;
    return (
      <div
        style={styles.mainContainer}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={onDrop}
      >

        {/* Graph */}
        <div ref={(el) => { this.graphElement = el; }} />

        {/* Toolbar */}
        <GraphToolbarContainer />

        {/* Color Legend */}
        <ColorLegend />

      </div>
    );
  }
}

export default Viewer;
