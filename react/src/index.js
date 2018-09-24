import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import ExplainBindingsComponent from './Explain';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<ExplainBindingsComponent />, document.getElementById('root'))
registerServiceWorker();

if (module.hot) module.hot.accept()