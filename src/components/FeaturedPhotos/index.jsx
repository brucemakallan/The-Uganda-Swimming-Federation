import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './featuredPhotos.scss';

const columns = ['thirds', 'halves', 'halves', 'thirds'];
const rows = ['top', 'bottom'];

class FeaturedPhotos extends Component {
  renderPhotoGrid = (passedImages) => {
    const photos = [...passedImages]; // to avoid mutability when poping/shifting
    return (
      <div className="photo-grid">
        {columns.map((col, index) => (
          <div key={index} className={col}>
            {rows.map((row, i) => (
              <div key={i} className={row}>
                <img src={photos.shift()} alt="article" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { articles } = this.props;
    const photos = [];
    articles.map(article => photos.push(...article.images));
    const numFeaturedPhotos = 8;
    const featuredPhotos = photos.length > numFeaturedPhotos ? photos.slice(-numFeaturedPhotos) : photos;

    return (
      <div className="featured-photos">
        {this.renderPhotoGrid(featuredPhotos)}
      </div>
    );
  }
}

FeaturedPhotos.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FeaturedPhotos;
