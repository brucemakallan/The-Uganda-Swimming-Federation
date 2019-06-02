import React from 'react';
import './home.scss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Carousel from '../Carousel';
import ArticleCard from '../ArticleCard';
import FeaturedVideos from '../FeaturedVideos';

const addBackgroundImage = url => ({
  backgroundImage: `url(${url})`,
});

const Home = ({ carousel, about, articles }) => (
  <div className="mainContent">
    <section id="banner">
      <Carousel id="main" imageUrls={carousel.imageUrls} captions={carousel.captions} />
    </section>

    <section className="articles large-padding responsive-flex">
      {articles && articles.length > 0
      && (
        <div className="left responsive-flex-child inner-padding">
          {articles.map(article => <ArticleCard key={article._id} article={article} />)}
        </div>
      )}

      <div className="right responsive-flex-child inner-padding">
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

    <section className="photos section-padding">
      photos
    </section>

    <section className="videos section-padding">
      <div className="inner-padding">
        <h3>Latest Videos</h3>
        <FeaturedVideos articles={articles} />
      </div>
    </section>

    <section className="footer dark">
      <div className="responsive-flex">
        <div className="responsive-flex-child third section-padding">
          footer1
        </div>
        <div className="responsive-flex-child third section-padding">
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
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
