import React from 'react';
import './home.scss';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';

const Home = ({ carousel }) => (
  <div className="mainContent">
    <section id="banner">
      <Carousel imageUrls={carousel.imageUrls} captions={carousel.captions} />
    </section>
    <section id="services" className="section-padding">
      services
    </section>
    <section id="categories" className="section-padding">
      categories
    </section>
    <section id="offers" className="section-padding">
      offers
    </section>
    <section id="featured" className="section-padding">
      featured
    </section>
    <section id="popular" className="section-padding">
      popular
    </section>
    <section id="newsletter" className="section-padding">
      newsletter
    </section>
    <section id="order" className="section-padding">
      order
    </section>
    <section id="footer" className="dark">
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
};

export default Home;
