import React from 'react';
import './eventCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faMapMarkerAlt);

const EventCard = () => (
  <div className="event-card">
    <div className="event-times">
      <div className="calendar">
        <div className="calendar-left">
          <div className="date">25</div>
          <div className="day">WEDNESDAY</div>
        </div>
        <div className="calendar-right">
          <div className="month">AUG</div>
          <div className="year">2019</div>
        </div>
      </div>
    </div>
    <div className="details">
      <div className="title">
        The 12th CANA Zone 3 Swimming Championships
      </div>
      <div className="location grey">
        <FontAwesomeIcon icon="map-marker-alt" className="mr-2" />
        GEMS Campbridge International School, Kampala
      </div>
    </div>
  </div>
);

export default EventCard;
