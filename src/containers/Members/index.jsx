import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import getAllProducts from '../../actions/productsActions';
import { pageSections, endpoints, concreteSubtleBackground } from '../../utils';
import './members.scss';


class Members extends Component {
  componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const membersList = products.filter(section => section.category === pageSections.membersPage);

    return (
      <div className="mainContent">
        <div className="members-page" style={concreteSubtleBackground}>
          <div className="large-padding responsive-flex">
            <h1 className="sub-section-heading">
              USF Members
              <hr />
            </h1>
            {membersList && membersList.length > 0 && (
              <div className="responsive-flex-child inner-padding full">
                {membersList.map(category => (
                  <div key={category.heading1} className="material-card mb-5">
                    <h3 className="category-heading">{category.heading1}</h3>
                    <ReactMarkdown source={category.body} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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
