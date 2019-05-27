import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import date from 'date-and-time';
import YouTube from 'react-youtube';
import paths, { selectFileIcon } from '../../utils';
import './products.scss';
import Carousel from '../../components/Carousel';

library.add(faArrowLeft, faExclamationTriangle);

class Details extends Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  renderYoutubeVideo = (height, width, youtubeId) => {
    const options = {
      height: String(height),
      width: String(width),
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    return (
      <YouTube
        videoId={youtubeId}
        opts={options}
        onReady={this._onReady}
      />
    );
  };

  renderListOfVideos = (label, list) => (
    <div className="productProperty" key={label}>
      <div className="headingLabel">{label}</div>
      <div className="responsive-flex flex-normal">
        {list.map((obj, index) => (
          <div key={index} className="responsive-flex-child third">
            <div className="video-box">
              {Object.keys(obj).map(objKey => (
                <React.Fragment key={objKey}>
                  <div className="video-attribute">{`${objKey.toUpperCase()}: ${obj[objKey]}`}</div>
                  {(obj.youtubeId === obj[objKey]) && this.renderYoutubeVideo('200', '100%', obj.youtubeId)}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  renderArrayOfObjects = (label, list) => (
    <div className="productProperty" key={label}>
      <div className="headingLabel">{label}</div>
      {list.map((obj, index) => (
        <ul key={index} className="noBulletList">
          {Object.keys(obj).map(objKey => (
            (objKey === 'url' || objKey === 'link')
              ? (
                <li key={objKey}>
                  {selectFileIcon(obj[objKey])}
                  <a href={obj[objKey]} target="_blank" rel="noopener noreferrer">{obj[objKey]}</a>
                </li>
              )
              : <li key={objKey}>{`${objKey.toUpperCase()}: ${obj[objKey]}`}</li>))}
          <hr />
        </ul>
      ))}
    </div>
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
          <span>{value}</span>
        </div>
      );
    } return '';
  };

  renderDateTime = (label, dateTimeEpoc) => (
    <div className="productProperty" key={label}>
      <div className="headingLabel">{label}</div>
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
            <div className="flex-container page-header mb-3">
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
              <div className="images">
                <Carousel imageUrls={product.images} />
              </div>
              <div className="details">
                <div className="material-card">
                  {mainDetails.map(
                    detail => this.renderValue(
                      detail.label, detail.value, detail.isArrayOfObjects, detail.isVideos
                    )
                  )}
                  {dates.map(date => this.renderDateTime(date.label, date.value))}
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
