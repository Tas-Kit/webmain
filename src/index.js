import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Google Font
const WebFont = require('webfontloader');

WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'Material+Icons', 'Open Sans'],
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
