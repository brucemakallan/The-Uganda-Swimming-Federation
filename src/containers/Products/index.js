import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReadProducts from '../../components/Products';
import getAllProducts, { deleteProduct } from '../../actions/productsActions';
import { endpoints } from '../../utils';
import Modal from '../../components/Modal';

export class Products extends Component {
  state = {
    showModal: false,
  }

  componentDidMount() {
    const { getAllProductsDispatch } = this.props;
    getAllProductsDispatch(endpoints.productsGetAll);
  }

  handleDelete = (id) => {
    if (id) {
      const { deleteProductDispatch } = this.props;
      deleteProductDispatch(endpoints.productsDelete(id));
    }
    this.handleHideModal();
  }

  saveID = (id) => {
    this.setState({ id });
    this.handleShowModal();
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }

  handleHideModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { products } = this.props;
    const { id, showModal } = this.state;
    return (
      <React.Fragment>
        {id && (
          <Modal
            show={showModal}
            hideModal={this.handleHideModal}
            title="Delete?"
            body="Are you sure you want to Delete this item?"
            primaryAction="Delete"
            secondaryAction="Cancel"
            onClick={this.handleDelete}
            id={id}
          />
        )}
        <ReadProducts data={products} saveID={this.saveID} />
      </React.Fragment>
    );
  }
}

Products.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  deleteProductDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products.reverse(),
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
  deleteProductDispatch: deleteProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
