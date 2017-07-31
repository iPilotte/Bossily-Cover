import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();