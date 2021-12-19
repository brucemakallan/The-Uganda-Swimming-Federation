import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { concreteSubtleBackground, endpoints, pageSections } from '../../utils';
import './documents.scss';
import getAllProducts from '../../actions/productsActions';
import ArticleCard from '../../components/ArticleCard';

class Documents extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const articles = products.filter(article => article.category === pageSections.documents);

    return (
      <div className="mainContent">
        <div className="root large-padding" style={concreteSubtleBackground}>
          <h1 className="sub-section-heading">
            Documents &amp; Downloads
            <hr />
          </h1>
          <div className="inner-padding">
            <div>
              {articles.map(article => <ArticleCard key={article._id} article={article} />)}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

Documents.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Documents);
