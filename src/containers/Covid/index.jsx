import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { concreteSubtleBackground, endpoints, pageSections } from '../../utils';
import './covid.scss';
import getAllProducts from '../../actions/productsActions';
import ArticleCard from '../../components/ArticleCard';

class Covid extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const articles = products.filter(article => article.category === pageSections.covid);

    return (
      <div className="mainContent">
        <div className="root large-padding" style={concreteSubtleBackground}>
          <h1 className="sub-section-heading">
            Dealing with the COVID-19 Pandemic
            <hr />
          </h1>
          <div className="inner-padding">
            {articles.map(article => <ArticleCard key={article._id} article={article} />)}
          </div>
        </div>
      </div>

    );
  }
}

Covid.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Covid);
