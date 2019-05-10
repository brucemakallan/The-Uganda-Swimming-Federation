import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Sidebar from '../Sidebar';
import PropertiesView from '../../containers/Properties';
import ProductsView from '../../containers/Products';
import paths from '../../utils';
import DashboardHome from '../DashboardHome';
import Users from '../Users';
import Subscriptions from '../Subscriptions';
import Orders from '../Orders';
import UnresolvedSearches from '../UnresolvedSearches';
import SalesStats from '../SalesStats';
import WebsiteSectionsView from '../../containers/WebsiteSections';
import Admin from '../Admin';
import ProductPropertyCreate from '../../containers/Properties/create';
import ProductPropertyEdit from '../../containers/Properties/edit';
import PageLoader from '../../containers/PageLoader';
import Details from '../../containers/Details';
import ProductEdit from '../../containers/Products/edit';
import ProductCreate from '../../containers/Products/create';
import WebsiteSectionsDetails from '../../containers/WebsiteSections/details';
import WebsiteSectionsCreate from '../../containers/WebsiteSections/create';
import WebsiteSectionsEdit from '../../containers/WebsiteSections/edit';

const {
  dashboard: {
    home, products, properties, users, subscriptions, orders,
    unresolvedSearches, salesStats, websiteSections, admin, details,
  },
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

          <Route path={properties} exact component={PropertiesView} />
          <Route path={`${properties}${create}`} exact component={ProductPropertyCreate} />
          <Route path={`${properties}${edit}/:id`} component={ProductPropertyEdit} />

          <Route path={websiteSections} exact component={WebsiteSectionsView} />
          <Route path={`${websiteSections}${create}`} exact component={WebsiteSectionsCreate} />
          <Route path={`${websiteSections}${edit}/:id`} component={WebsiteSectionsEdit} />
          <Route path={`${websiteSections}/:id`} component={WebsiteSectionsDetails} />

          <Route path={users} component={Users} />
          <Route path={subscriptions} component={Subscriptions} />
          <Route path={orders} component={Orders} />
          <Route path={unresolvedSearches} component={UnresolvedSearches} />
          <Route path={salesStats} component={SalesStats} />
          <Route path={admin} component={Admin} />
        </Switch>
      </div>
    </div>
  </React.Fragment>
);

export default Dashboard;
