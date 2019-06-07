import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './articleCard.scss';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarAlt, faCalendarTimes, faCalendarCheck, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import Carousel from '../Carousel';
import {
  epocToDate, LONG_DATE_FORMAT, DATE, DAY, MONTH, YEAR,
  selectFileIcon,
} from '../../utils';

library.add(
  faCalendarAlt,
  faCalendarTimes,
  faCalendarCheck,
  faMapMarkerAlt
);

class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.animationRef = React.createRef();
    this.animationRef2 = React.createRef();
  }

  componentDidMount() {
    console.log(this.animationRef);
    console.log(this.animationRef2);
    console.log(window);
    const elements = [this.animationRef];

    if (elements && elements.length > 0) {
      elements.forEach((element) => {
        if (window.scrollTop() + window.height() > element.offset().top + element.outerHeight()) {
          element.delay(element.data('delay')).queue(() => {
            element.addClass('animate-in');
          });
        }
      });

      window.scroll(() => {
        elements.forEach((element) => {
          if (window.scrollTop() + window.height() > element.offset().top) {
            element.delay(element.data('delay')).queue(() => {
              element.addClass('animate-in');
            });
          }
        });
      });
    }
  }

  renderEventDate = (date, heading) => (
    date && date.length > 0 && (
      <div className="calendar">
        <div className="calendar-left">
          {heading && <div className="heading">{heading}</div>}
          <div className="date">{epocToDate(date, DATE)}</div>
          <div className="day">{epocToDate(date, DAY)}</div>
        </div>
        <div className="calendar-right">
          <div className="month">{epocToDate(date, MONTH)}</div>
          <div className="year">{epocToDate(date, YEAR)}</div>
        </div>
      </div>
    )
  )

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
  }

  render() {
    const { article } = this.props;

    return (
      <div className="article-card material-card">
        <div className="article-image">
          {article.images && article.images.length === 1
            && <img src={article.images[0]} alt="article" />}
          {article.images && article.images.length > 1
            && <Carousel id={article._id} imageUrls={article.images} />}
        </div>

        {article.videos && article.videos.length > 0 && (
          <div className="article-videos responsive-flex">
            {article.videos.length === 1
              ? (
                <div className="article-video-item responsive-flex-child full">
                  {this.renderYoutubeVideo('450', '100%', article.videos[0].source)}
                </div>
              )
              : article.videos.map(video => (
                <div key={video.source} className="article-video-item responsive-flex-child half">
                  {this.renderYoutubeVideo('200', '100%', video.source)}
                </div>
              ))}
          </div>
        )}

        <div className="article-details">
          <div className="article-details-top has-animation animation-ltr" data-delay="50" ref={this.animationRef}>
            {article.heading1 && (
              <div className="article-heading">
                <h1>{article.heading1}</h1>
              </div>
            )}
            {article.heading2 && (
              <div className="article-location">
                <div className="mt-2">
                  <FontAwesomeIcon icon="map-marker-alt" className="mr-2" title="Location" />
                  {article.heading2}
                </div>
              </div>
            )}
          </div>

          <div className="article-details-bottom has-animation animation-rtl" data-delay="500" ref={this.animationRef2}>
            {((article.dateIn && article.dateIn.length > 0) || (article.dateOut && article.dateOut.length > 0))
            && (
              <div className="event-times">
                {this.renderEventDate(article.dateIn, article.dateOut ? 'FROM' : null)}
                {this.renderEventDate(article.dateOut, 'TO')}
              </div>
            )}

            {/* {article.tags && article.tags.length > 0 && (
              <div className="article-tags">
                {article.tags.map(tag => <span key={tag.id}>{tag.text}</span>)}
              </div>
            )} */}

            {article.body && article.body.length > 1 && (
              <div className="article-body">
                <ReactMarkdown source={article.body} />
              </div>
            )}

            {article.files && article.files.length > 0 && (
              <div className="article-files">
                <div className="heading">Attachments / Downloads</div>
                <div className="article-files-links">
                  {article.files.map(file => (
                    <div key={file.source}>
                      <a href={file.source} target="_blank" rel="noopener noreferrer" className="border-animation">
                        <div className="border-animation__inner">
                          <span className="mr-2">{selectFileIcon(file.source)}</span>
                          {file.title.trim()}
                          {(file.description && file.description.length > 0) && ` - ${file.description}`}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {article.dateCreated && (
              <div className="article-date">
                <div className="mt-2">
                  <FontAwesomeIcon icon="calendar-alt" className="mr-2" />
                  <span>Created: </span>
                  {epocToDate(article.dateCreated, LONG_DATE_FORMAT)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ArticleCard.propTypes = {
  article: PropTypes.shape({}).isRequired,
};

export default ArticleCard;
