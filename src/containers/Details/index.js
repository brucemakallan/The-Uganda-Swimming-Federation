import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import date from 'date-and-time';
import paths from '../../utils';
import './products.scss';
import Carousel from '../../components/Carousel';

library.add(faArrowLeft, faExclamationTriangle);

class Details extends Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  renderValue = (label, value) => {
    if (value) {
      if (Array.isArray(value)) {
        return (
          <div className="mb-2 productProperty" key={label}>
            <span className="headingLabel">{label}</span>
            <ul>
              {value.map(element => <li key={element}>{element}</li>)}
            </ul>
          </div>
        );
      }
      return (
        <div className="mb-2 productProperty" key={label}>
          <span className="headingLabel">{label}</span>
          <span>{value}</span>
        </div>
      );
    } return '';
  };

  renderDateTime = (label, dateTimeEpoc) => (
    <div className="mb-2 productProperty" key={label}>
      <span className="headingLabel">{label}</span>
      <span>
        {date.format(new Date(Number(dateTimeEpoc)), 'ddd DD MMM YYYY HH:mm:ss Z')}
      </span>
    </div>
  );

  render() {
    const { products, match } = this.props;
    const product = products.find(p => p._id === match.params.id);
    let mainDetails;
    let otherDetails;
    if (product) {
      mainDetails = [
        { label: 'DuduID', value: product.duduID },
        { label: 'Title', value: product.title },
        { label: 'Condition', value: product.condition },
        { label: 'Price (UGX)', value: product.price },
        { label: 'Brand', value: product.brand },
        { label: 'Model', value: product.model },
        { label: 'Size', value: product.size },
        { label: 'Capacity', value: product.capacity },
        { label: 'Year', value: product.year },
        { label: 'Manufacturer', value: product.manufacturer },
        { label: 'Shipping', value: product.shipping },
        { label: 'Quantity', value: product.quantity },
      ];
      otherDetails = [
        { label: 'Category', value: product.category },
        { label: 'Seller', value: product.seller },
        { label: 'Style', value: product.style },
        { label: 'Delivery', value: product.delivery },
        { label: 'Shape', value: product.shape },
        { label: 'Weight', value: product.weight },
        { label: 'Material', value: product.material },
        { label: 'Colours', value: product.colours },
        { label: 'Features', value: product.features },
        { label: 'Description', value: product.description },
      ];
    }

    return (
      <React.Fragment>
        {product ? (
          <React.Fragment>
            <div className="flex-container page-header mb-3">
              <button type="button" className="iconButton" onClick={this.goBack}>
                <FontAwesomeIcon icon="arrow-left" className="icon" />
              </button>
              <h1>{product.title}</h1>
              <Link
                className="btn btn-primary btn-sm button-link"
                to={`${paths.dashboard.products}/edit/${product._id}`}
              >
              Edit
              </Link>
            </div>
            <div className="mainDetails">
              <div className="images">
                <Carousel imageUrls={product.images} />
              </div>
              <div className="details">
                {mainDetails.map(detail => this.renderValue(detail.label, detail.value))}
                {this.renderDateTime('Date Created', product.dateCreated)}
              </div>
            </div>
            <div className="otherDetails">
              <div className="headingBanner">
                <span>MORE</span>
                <strong>DETAILS</strong>
              </div>
              {otherDetails.map(detail => this.renderValue(detail.label, detail.value))}
            </div>
          </React.Fragment>
        ) : this.goBack()}
      </React.Fragment>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({}).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});

export default connect(mapStateToProps)(Details);
