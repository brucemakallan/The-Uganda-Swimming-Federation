import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductForm from '../../components/Products/productForm';
import { postProduct } from '../../actions/productsActions';
import { endpoints } from '../../utils';
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
      videos: [], // {title: '', description: '', youtubeId: ''}
      tags: [], // {id: 'lorem', text: 'lorem'}
    },
  }

  handleSubmit = (e, createAnother = false) => {
    e.preventDefault();
    const { product } = this.state;
    const { createProductDispatch, history } = this.props;
    createProductDispatch(endpoints.productsPost, product, history, createAnother);
  }

  handleOnChange = (e, passedValue) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { product } = this.state;
    if (passedValue) {
      this.setState({
        product: {
          ...product,
          [name]: passedValue,
        },
      });
    } else {
      this.setState({
        product: {
          ...product,
          [name]: value,
        },
      });
    }
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

  handleTagDelete = (i) => {
    const { product } = this.state;
    this.setState({
      product: {
        ...product,
        tags: product.tags.filter((tag, index) => index !== i),
      }
    });
  }

  handleTagAddition = (tag) => {
    this.setState(state => ({
      product: {
        ...state.product,
        tags: [...state.product.tags, tag],
      }
    }));
  }

  handleTagDrag = () => {}
  // handleTagDrag = (tag, currPos, newPos) => {
  //   const { product: { tags }, product } = this.state;
  //   tags.splice(currPos, 1);
  //   tags.splice(newPos, 0, tag);
  //   this.setState({
  //     product: {
  //       ...product,
  //       tags,
  //     }
  //   });
  // }

  render() {
    const { product } = this.state;

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
        onTagDelete={this.handleTagDelete}
        onTagAdd={this.handleTagAddition}
        onTagDrag={this.handleTagDrag}
      />
    );
  }
}

CreateProduct.propTypes = {
  createProductDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  createProductDispatch: postProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
