import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductForm from '../../components/Products/productForm';
import { editProduct } from '../../actions/productsActions';
import paths, { endpoints } from '../../utils';
import cloudinaryWidgetOptions from '../../utils/cloudinary';

export class EditProduct extends Component {
  state = {
    product: {}
  }

  componentDidMount() {
    const { product } = this.state;
    const {
      match, products, properties, history,
    } = this.props;
    const selectedEntity = products.find(entity => entity._id === match.params.id);
    const unsupportedProperties = ['_id', 'duduID', 'dateCreated', '__v'];
    if (selectedEntity && properties) {
      unsupportedProperties.map(property => delete selectedEntity[property]);
      this.setState({ product: { ...product, ...selectedEntity } });
    } else history.push(paths.dashboard.products);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { product } = this.state;
    const { editProductDispatch, match, history } = this.props;
    editProductDispatch(`${endpoints.products}/${match.params.id}`, product, history);
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
        title="Edit Product"
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

EditProduct.propTypes = {
  editProductDispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer, propertiesReducer }) => ({
  products: productsReducer.products,
  properties: propertiesReducer.properties,
});
const mapDispatchToProps = {
  editProductDispatch: editProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
