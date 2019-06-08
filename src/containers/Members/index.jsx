import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAllProducts from '../../actions/productsActions';
import { pageSections, endpoints } from '../../utils';


class Members extends Component {
  componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const membersList = products.filter(section => section.category === pageSections.membersPage);
    console.log(membersList);

    return (
      <div style={{ position: 'absolute', top: '299px' }}>Members</div>
    );
  }
}

Members.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Members);
