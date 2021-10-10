import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { endpoints, pageSections } from '../../utils';
import './styles.scss';
import getAllProducts from '../../actions/productsActions';
import AnnualReports from './AnnualReports';

class AnnualReportsPage extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const [annualReport] = products.filter(article => article.category === pageSections.annualReports);

    return ( // using only one article for all annualReports files
      annualReport ? <AnnualReports report={annualReport} /> : ''
    );
  }
}

AnnualReportsPage.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(AnnualReportsPage);
