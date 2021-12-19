/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { get, startCase } from 'lodash';
import getAllProducts, { editProduct } from '../../actions/productsActions';
import { endpoints, removeUnsupportedProperties } from '../../utils';
// import allLinks from './allLinks';

class Experimental extends Component {
  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  // getImagesForArticle = article => allLinks.filter(link => link.includes(`${article._id}_image`))

  // getFilesForArticle = (article) => {
  //   // ... 319_5fc010970e27db000433a339_file_letter-to-n-fs.pdf? ...
  //   const files = allLinks
  //     .filter(link => link.includes(`${article._id}_file`))
  //     .map((source) => {
  //       const title = source.split('?')
  //         .shift()
  //         .split('_')
  //         .pop()
  //         .split('.')
  //         .shift();

  //       return {
  //         title: startCase(title),
  //         description: '',
  //         source,
  //       };
  //     });

  //   return files;
  // }

  updateArticle = article => () => {
    // const edited = {
    //   ...article,
    //   files: this.getFilesForArticle(article),
    //   images: this.getImagesForArticle(article),
    // };

    // const { editProductDispatch } = this.props;
    // const unsupportedProperties = ['_id', 'dateCreated', '__v'];
    // const cleaned = removeUnsupportedProperties({ ...edited }, unsupportedProperties);
    // editProductDispatch(endpoints.productsPut(article._id), cleaned, { push: () => {} });
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
                <div>
                  <Button variant="contained" onClick={this.updateArticle(product)}>Update</Button>
                </div>
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
  editProductDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products.filter(
    entity => (
      get(entity, 'images[0]', '').includes('res.cloudinary.com')
      || get(entity, 'files[0].source', '').includes('res.cloudinary.com')
    )
  )
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
  editProductDispatch: editProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Experimental);
