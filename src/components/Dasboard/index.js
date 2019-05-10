import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Sidebar from '../Sidebar';
import ProductsView from '../../containers/Products';
import paths from '../../utils';
import DashboardHome from '../DashboardHome';
import PageLoader from '../../containers/PageLoader';
import Details from '../../containers/Details';
import ProductEdit from '../../containers/Products/edit';
import ProductCreate from '../../containers/Products/create';

const {
  dashboard: { home, products, details },
  create, edit,
} = paths;

const Dashboard = () => (
  <React.Fragment>
    <Sidebar history={createBrowserHistory()} />
    <div className="content">
      <PageLoader />
      <div>
        <Switch>
          <Route path={home} exact component={DashboardHome} />
          <Route path={products} exact component={ProductsView} />
          <Route path={`${products}${create}`} exact component={ProductCreate} />
          <Route path={`${products}${edit}/:id`} component={ProductEdit} />
          <Route path={`${details}/:id`} component={Details} />
        </Switch>
      </div>
    </div>
  </React.Fragment>
);

export default Dashboard;
