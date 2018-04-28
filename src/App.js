import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';

import TaskView from './views/TaskView';

const tasks = [{ name: 'Test' }, { name: 'Test2' }];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <TaskView />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
