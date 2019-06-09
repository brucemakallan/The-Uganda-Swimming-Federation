import React from 'react';
import PropTypes from 'prop-types';
import './contentCard.scss';
import ReactMarkdown from 'react-markdown';
import ScrollAnimation from 'react-animate-on-scroll';
import Carousel from '../Carousel';


const ContentCard = ({ content }) => (
  <div className="content-card">
    <div className="material-card">
      <div className="content-image">
        {content.images && content.images.length === 1
        && <img src={content.images[0]} alt="content" />}
        {content.images && content.images.length > 1
        && <Carousel id={content._id} imageUrls={content.images} />}
      </div>

      {content.heading1 && (
        <div className="content-heading">
          <h3>{content.heading1}</h3>
        </div>
      )}

      <div className="content-body">
        <ScrollAnimation animateIn="has-animation animation-rtl animate-in" animateOnce>
          <div className="animated-child">
            {content.body && content.body.length > 1 && (
              <ReactMarkdown source={content.body} />
            )}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  </div>
);

ContentCard.propTypes = {
  content: PropTypes.shape({}).isRequired,
};

export default ContentCard;
