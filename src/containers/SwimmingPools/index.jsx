import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { concreteSubtleBackground, endpoints, pageSections } from '../../utils';
import './styles.scss';
import getAllProducts from '../../actions/productsActions';
import ArticleCard from '../../components/ArticleCard';

class SwimmingPools extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const articles = products.filter(article => article.category === pageSections.swimmingPools);

    return (
      <div className="mainContent">
        <div className="root large-padding" style={concreteSubtleBackground}>
          <h1 className="sub-section-heading">
            Swimming Pools
            <hr />
          </h1>
          <div className="inner-padding">
            {articles.reverse().map(article => (
              <div className="card-container" key={article._id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>

    );
  }
}

SwimmingPools.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(SwimmingPools);
