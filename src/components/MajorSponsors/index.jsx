import React from 'react';
import PropTypes from 'prop-types';
import './majorSponsors.scss';

const MajorSponsors = ({ majorSponsors }) => (
  majorSponsors && majorSponsors.images && (
    <div className="major-spnsors">
      <h3>{majorSponsors.heading1}</h3>
      <div className="responsive-flex">
        {majorSponsors.images.map(imageUrl => (
          <img
            key={imageUrl}
            className="responsive-flex-child"
            src={imageUrl}
            alt="Sponsor"
          />
        ))}
      </div>
    </div>
  )
);

MajorSponsors.propTypes = {
  majorSponsors: PropTypes.shape({}).isRequired,
};

export default MajorSponsors;
