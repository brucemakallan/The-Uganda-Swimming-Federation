import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ProductForm from '../../components/Products/productForm';
import { postProduct } from '../../actions/productsActions';
import paths, { endpoints } from '../../utils';
import cloudinaryWidgetOptions from '../../utils/cloudinary';

export class CreateProduct extends Component {
  state = {
    product: {
      title: '',
      category: '',
      description: '',
      condition: '',
      quantity: 0,
      price: 0,
      features: [],
      colours: [],
      images: [],
    },
  }

  componentDidMount() {
    const { product } = this.state;
    const {
      properties, history,
    } = this.props;
    if (!properties || properties.length === 0) {
      history.push(paths.dashboard.products);
    } else {
      this.setState({
        product: {
          ...product,
          category: this.getPropertiesOfType('category')[0].name || '',
          condition: this.getPropertiesOfType('condition')[0].name || '',
        }
      });
    }
  }

 getPropertiesOfType = (propertyType) => {
   const { properties } = this.props;
   const allEntitiesOfOneType = properties.filter(property => property.family.trim().toLowerCase() === propertyType);
   return _.sortBy(allEntitiesOfOneType, type => type.name);
 };

  handleSubmit = (e, createAnother = false) => {
    e.preventDefault();
    const { product } = this.state;
    const { createProductDispatch, history } = this.props;
    createProductDispatch(endpoints.products, product, history, createAnother);
  }

  handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { product } = this.state;
    this.setState({
      product: {
        ...product,
        [name]: value,
      },
    });
  }

  handleOnArrayChange = (e, propertyArray) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { product } = this.state;
    const array = propertyArray;
    array[Number([name])] = value;
    this.setState({
      product: {
        ...product,
        array,
      },
    });
  }

  removeRow = (array, index) => {
    const { product } = this.state;
    array.splice(index, 1);
    this.setState({
      product: {
        ...product,
        array,
      },
    });
  }

  addRow = (array, row = '') => {
    const { product } = this.state;
    array.push(row);
    this.setState({
      product: {
        ...product,
        array,
      },
    });
  }

  addCloudinaryImage = (array) => {
    const cloudinaryWidget = window.cloudinary.createUploadWidget(cloudinaryWidgetOptions,
      (error, result) => {
        if (!error && result && result.info && result.event === 'success') {
          const { secure_url } = result.info;
          this.addRow(array, secure_url);
        }
      });
    cloudinaryWidget.open();
  }

  render() {
    const { product } = this.state;
    const { properties } = this.props;

    return (
      <ProductForm
        isNew
        title="Create New Product"
        onChange={this.handleOnChange}
        onArrayChange={this.handleOnArrayChange}
        removeRow={this.removeRow}
        addRow={this.addRow}
        addCloudinaryImage={this.addCloudinaryImage}
        onSubmit={this.handleSubmit}
        entity={product}
        properties={properties}
      />
    );
  }
}

CreateProduct.propTypes = {
  createProductDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ propertiesReducer }) => ({
  properties: propertiesReducer.properties,
});
const mapDispatchToProps = {
  createProductDispatch: postProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
