import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
