import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from '../NavBar';
import Homepage from '../../containers/Home';
import Dashboard from '../Dasboard';
import paths from '../../utils';

const App = () => (
  <Router>
    <React.Fragment>
      <NavBar />
      <ToastContainer />
      <Switch>
        <Route path={paths.home} exact component={Homepage} />
        <Route path={paths.dashboard.home} component={Dashboard} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default App;
