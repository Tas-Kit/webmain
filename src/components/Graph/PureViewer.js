import React from 'react';
import ColorLegend from './ColorLegend';

const styles = {
  mainContainer: {
    position: 'relative',
    flex: 1,
  },
};

class PureViewer extends React.Component {
  render() {
    return (
      <div style={styles.mainContainer}>

        {/* Graph */}
        <div ref={(el) => { this.graphElement = el; }} />

        {/* Color Legend */}
        <ColorLegend />

      </div>
    );
  }
}

export default PureViewer;
