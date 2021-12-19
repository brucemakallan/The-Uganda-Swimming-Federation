/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllProducts, { editProduct } from '../../actions/productsActions';
import { endpoints } from '../../utils';

class Experimental extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;

    return (
      <div className="mainContent">
        <div className="root large-padding">
          <ol>
            {products.map(product => (
              <li key={product._id}>
                <div>{product._id}</div>
                <h2>{product.heading1}</h2>
                <div>{product.category}</div>
                <h6>Images</h6>
                <ol>
                  {product.images.map(image => <li key={image}>{image}</li>)}
                </ol>
                <h6>Files</h6>
                <ol>
                  {product.files.map(({ source }) => <li key={source}>{source}</li>)}
                </ol>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

Experimental.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  // editProductDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
  editProductDispatch: editProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Experimental);
