import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import NavBar from '../../components/NavBar';
import Homepage from '../Home';
import Dashboard from '../../components/Dasboard';
import paths, { pageSections, endpoints } from '../../utils';
import getAllProducts from '../../actions/productsActions';
import history from '../../utils/history';
import Disciplines from '../Disciplines';
import About from '../About';
import Results from '../Results';
import Contacts from '../Contacts';
import Covid from '../Covid';
import Members from '../Members';
import SwimmingCoaches from '../SwimmingCoaches';
import Antidoping from '../Antidoping';
import Documents from '../Documents';
import NotFoundPage from '../../components/NotFoundPage';
import SwimmingPools from '../SwimmingPools';
import AuditedAccountsPage from '../AuditedAccounts';
import AnnualReportsPage from '../AnnualReports';
import Experimental from '../Experimental';


// TODO: Upgrade entire project to use hooks and no redux
class App extends Component {
  componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const partners = products.find(
      section => section.category.trim().match(pageSections.partners)
    );

    return (
      <Router>
        <React.Fragment>
          <NavBar partners={partners} history={history} />
          <ToastContainer />
          <Switch>
            <Route path={paths.home} exact component={Homepage} />
            <Route path={paths.discipline} component={Disciplines} />
            <Route path={paths.about} component={About} />
            <Route path={paths.results} component={Results} />
            <Route path={paths.contact} component={Contacts} />
            <Route path={paths.covid} component={Covid} />
            <Route path={paths.experimental} component={Experimental} />
            <Route path={paths.members} component={Members} />
            <Route path={paths.swimmingCoaches} component={SwimmingCoaches} />
            <Route path={paths.swimmingPools} component={SwimmingPools} />
            <Route path={paths.auditedAccounts} component={AuditedAccountsPage} />
            <Route path={paths.annualReports} component={AnnualReportsPage} />
            {/* <Route path={paths.swimForAllSwimForLife} component={SwimForAllSwimForLife} /> */}
            <Route path={paths.antidoping} component={Antidoping} />
            <Route path={paths.documents} component={Documents} />
            <Route path={paths.dashboard.home} component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
