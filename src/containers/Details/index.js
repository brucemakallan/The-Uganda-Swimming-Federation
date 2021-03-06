import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import date from 'date-and-time';
import ReactMarkdown from 'react-markdown';
import paths, { selectFileIcon } from '../../utils';
import './products.scss';
import Carousel from '../../components/Carousel';
import renderYoutubeVideo from '../../utils/renderYoutubePlayer';

library.add(faArrowLeft, faExclamationTriangle);

class Details extends Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  renderListOfVideos = (label, list) => (
    list && list.length > 0 && (
      <div className="productProperty" key={label}>
        <div className="headingLabel">{label}</div>
        <div className="responsive-flex flex-normal">
          {list.map((obj, index) => (
            <div key={String(index)} className="responsive-flex-child third">
              <div className="video-box">
                {Object.keys(obj).map(objKey => (
                  <React.Fragment key={objKey}>
                    <div className="video-attribute">{`${objKey.toUpperCase()}: ${obj[objKey]}`}</div>
                    {(obj.source === obj[objKey]) && renderYoutubeVideo('200', '100%', obj.source)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

  renderArrayOfObjects = (label, list) => (
    list && list.length > 0 && (
      <div className="productProperty" key={label}>
        <div className="headingLabel">{label}</div>
        {list.map((obj, index) => (
          <ul key={String(index)} className="noBulletList">
            {Object.keys(obj).map(objKey => (
              (objKey === 'url' || objKey === 'link' || objKey === 'source')
                ? (
                  <li key={objKey}>
                    {selectFileIcon(obj[objKey])}
                    <a href={obj[objKey]} target="_blank" rel="noopener noreferrer" title={obj[objKey]}>
                      {`File ${index + 1}`}
                    </a>
                  </li>
                )
                : <li key={objKey}>{`${objKey.toUpperCase()}: ${obj[objKey]}`}</li>))}
            <hr />
          </ul>
        ))}
      </div>
    )
  );

  renderValue = (label, value, isArrayOfObjects, isVideos) => {
    if (value) {
      if (isVideos) {
        return this.renderListOfVideos(label, value);
      }
      if (isArrayOfObjects) {
        return this.renderArrayOfObjects(label, value);
      }
      if (Array.isArray(value)) {
        return (
          <div className="productProperty" key={label}>
            <div className="headingLabel">{label}</div>
            <ul>
              {value.map(element => <li key={element}>{element}</li>)}
            </ul>
          </div>
        );
      }
      return (
        <div className="productProperty" key={label}>
          <div className="headingLabel">{label}</div>
          <ReactMarkdown source={value} />
        </div>
      );
    } return '';
  };

  renderDateTime = (label, dateTimeEpoc) => (
    dateTimeEpoc && dateTimeEpoc.length > 0 && (
      <div className="productProperty" key={label}>
        <div className="headingLabel">{label}</div>
        <span>
          {date.format(new Date(Number(dateTimeEpoc)), 'ddd DD MMM YYYY HH:mm:ss Z')}
        </span>
      </div>
    )
  );

  render() {
    const { products, match } = this.props;
    const product = products.find(p => p._id === match.params.id);
    let mainDetails;
    let otherDetails;
    let dates;
    if (product) {
      mainDetails = [
        { label: 'ID', value: product._id },
        { label: 'Parent', value: product.parent },
        { label: 'Category', value: product.category.toUpperCase() },
      ];
      otherDetails = [
        { label: 'Heading1', value: product.heading1 },
        { label: 'Heading2', value: product.heading2 },
        { label: 'Heading3', value: product.heading3 },
        { label: 'Heading4', value: product.heading4 },
        { label: 'Heading5', value: product.heading5 },
        { label: 'Heading6', value: product.heading6 },
        { label: 'Body', value: product.body },
        { label: 'Tags', value: product.tags, isArrayOfObjects: true },
        {
          label: 'Files', value: product.files, isArrayOfObjects: true,
        },
        {
          label: 'Videos', value: product.videos, isArrayOfObjects: true, isVideos: true,
        },
      ];
      dates = [
        { label: 'Date Created', value: product.dateCreated },
        { label: 'Date-In', value: product.dateIn },
        { label: 'Date-Out', value: product.dateOut },
      ];
    }

    return (
      <React.Fragment>
        {product ? (
          <React.Fragment>
            <div className="flex-container page-header mb-3 mr-3">
              <button type="button" className="iconButton" onClick={this.goBack}>
                <FontAwesomeIcon icon="arrow-left" className="icon" />
              </button>
              {product.heading1 ? <h1>{product.heading1}</h1> : ''}
              <Link
                className="btn btn-primary btn-sm button-link"
                to={`${paths.dashboard.products}/edit/${product._id}`}
              >
              Edit
              </Link>
            </div>
            <div className="mainDetails">
              {product.images && product.images.length > 0 && (
                <div className="images">
                  <Carousel id={product._id} imageUrls={product.images} />
                </div>
              )}
              <div
                className={`details ${(!product.images || (product.images && product.images.length === 0)) ? 'w-100' : ''}`}
              >
                <div className="material-card">
                  {mainDetails.map(
                    detail => this.renderValue(
                      detail.label, detail.value, detail.isArrayOfObjects, detail.isVideos
                    )
                  )}
                  {dates.map(dateInput => this.renderDateTime(dateInput.label, dateInput.value))}
                </div>
              </div>
            </div>
            <div className="otherDetails">
              <div className="material-card mb-3">
                <div className="card-heading">
                  MORE DETAILS
                </div>
                {otherDetails.map(
                  detail => this.renderValue(
                    detail.label, detail.value, detail.isArrayOfObjects, detail.isVideos
                  )
                )}
              </div>
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
