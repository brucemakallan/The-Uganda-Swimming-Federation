import React from 'react';
import './eventCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {
  epocToDate, DATE, DAY, MONTH, YEAR,
} from '../../utils';

library.add(faMapMarkerAlt);

const renderEventDate = date => (
  date && date.length > 0 && (
    <div className="calendar">
      <div className="calendar-left">
        <div className="date">{epocToDate(date, DATE)}</div>
        <div className="day">{epocToDate(date, DAY)}</div>
      </div>
      <div className="calendar-right">
        <div className="month">{epocToDate(date, MONTH)}</div>
        <div className="year">{epocToDate(date, YEAR)}</div>
      </div>
    </div>
  )
);

const EventCard = ({ events }) => (
  events.map((event, index) => (
    event.heading1 && (
      <div key={String(index)} className="event-card">
        <div className="event-times">
          {renderEventDate(event.dateIn)}
        </div>
        <div className="details">
          <div className="title">
            {event.heading1}
          </div>
          <div className="location grey">
            <FontAwesomeIcon icon="map-marker-alt" className="mr-2" />
            {event.heading2 ? event.heading2 : 'TBD'}
          </div>
        </div>
      </div>
    )
  ))
);

EventCard.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default EventCard;
