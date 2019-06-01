import React from 'react';
import './home.scss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Carousel from '../Carousel';

const addBackgroundImage = url => ({
  backgroundImage: `url(${url})`,
});

const Home = ({ carousel, about }) => (
  <div className="mainContent">
    <section id="banner">
      <Carousel imageUrls={carousel.imageUrls} captions={carousel.captions} />
    </section>
    <section className="articles section-padding responsive-flex">
      <div className="left bg-primary-light responsive-flex-child inner-padding">paginated articles</div>
      <div className="right bg-primary responsive-flex-child inner-padding">
        <div>Sidebar Content here</div>
        <ul>
          <li>Results</li>
          <li>Events</li>
          <li>Social Feed</li>
        </ul>
      </div>
    </section>

    {about && about.length > 0
    && about[0].images && about[0].images.length > 0
    && about[0].body && about[0].body.length > 0
    && (
      <section className="about" style={addBackgroundImage(about[0].images[0])}>
        <div className="inner-padding about-info">
          <ReactMarkdown source={about[0].body} />
        </div>
      </section>
    )}

    <section className="photos section-padding bg-primary">
      photos
    </section>
    <section className="videos section-padding bg-primary-light">
      videos
    </section>
    <section className="footer dark">
      <div className="responsive-flex">
        <div className="responsive-flex-child third section-padding">
          footer1
        </div>
        <div className="responsive-flex-child third bg-black section-padding">
          footer2
        </div>
        <div className="responsive-flex-child third section-padding">
          footer3
        </div>
      </div>
    </section>
  </div>
);

Home.propTypes = {
  carousel: PropTypes.shape({}).isRequired,
  about: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
