import React from 'react';
import PropTypes from 'prop-types';
import './contentCard.scss';
import ReactMarkdown from 'react-markdown';
import ScrollAnimation from 'react-animate-on-scroll';
import Carousel from '../Carousel';
import { selectFileIcon } from '../../utils';
import renderYoutubeVideo from '../../utils/renderYoutubePlayer';

const ContentCard = ({ content }) => (
  <div className="content-card">
    <div className="material-card">
      <div className="content-image">
        {content.images && content.images.length === 1
        && <img src={content.images[0]} alt="content" />}
        {content.images && content.images.length > 1
        && <Carousel id={content._id} imageUrls={content.images} />}
      </div>

      {content.videos && content.videos.length > 0 && (
        <div className="article-videos responsive-flex">
          {content.videos.length === 1
            ? (
              <div className="article-video-item responsive-flex-child full">
                {renderYoutubeVideo('450', '100%', content.videos[0].source)}
              </div>
            )
            : content.videos.map(video => (
              <div key={video.source} className="article-video-item responsive-flex-child half">
                {renderYoutubeVideo('200', '100%', video.source)}
              </div>
            ))}
        </div>
      )}

      {content.heading1 && (
        <div className="content-heading">
          <h3>{content.heading1}</h3>
        </div>
      )}


      <ScrollAnimation animateIn="has-animation animation-rtl animate-in" animateOnce>
        <div className="animated-child">
          {content.body && content.body.length > 1 && (
            <div className="content-body">
              <ReactMarkdown source={content.body} />
            </div>
          )}

          {content.files && content.files.length > 0 && (
            <div className="content-files">
              <div className="heading">Attachments / Downloads</div>
              <div className="content-files-links">
                {content.files.map(file => (
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
        </div>
      </ScrollAnimation>
    </div>
  </div>
);

ContentCard.propTypes = {
  content: PropTypes.shape({}).isRequired,
};

export default ContentCard;
