import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import './featuredVideos.scss';


class FeaturedVideos extends Component {
  renderYoutubeVideo = (height, width, youtubeId) => {
    const options = {
      height: String(height),
      width: String(width),
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };
    return (
      <YouTube videoId={youtubeId} opts={options} onReady={this._onReady} />
    );
  }

  render() {
    const { articles } = this.props;
    const videos = [];
    articles.map(article => videos.push(...article.videos));
    const numFeaturedVideos = 3;
    const featuredVideos = videos.length > numFeaturedVideos ? videos.slice(-numFeaturedVideos) : videos;

    return (
      <div className="featured-videos responsive-flex">
        {featuredVideos.map(featuredVideo => (
          <div key={featuredVideo.source} className="responsive-flex-child third p-2">
            <div className="featured-video-item">
              {this.renderYoutubeVideo('200', '100%', featuredVideo.source)}
              <div className="video-details">
                {featuredVideo.title
                  && <div className="video-title ellipsis">{featuredVideo.title}</div>}
                {featuredVideo.description
                  && <div className="video-description ellipsis">{featuredVideo.description}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

FeaturedVideos.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FeaturedVideos;
