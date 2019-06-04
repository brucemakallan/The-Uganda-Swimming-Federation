import React, { Component } from 'react';
import './home.scss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ReactPaginate from 'react-paginate';
import Carousel from '../Carousel';
import ArticleCard from '../ArticleCard';
import FeaturedVideos from '../FeaturedVideos';
import FeaturedPhotos from '../FeaturedPhotos';
import PageLoader from '../../containers/PageLoader';

const addBackgroundImage = url => ({
  backgroundImage: `url(${url})`,
});

const ARTICLES_PER_PAGE = 3;

class Home extends Component {
  state = {
    pagination: {
      start: 0,
      end: ARTICLES_PER_PAGE,
    },
  }

  onPageChange = ({ selected }) => {
    const start = selected * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;
    this.setState({
      pagination: {
        start,
        end,
      },
    });
  }

  render() {
    const {
      carousel, about, articles, events
    } = this.props;
    const { pagination: { start, end } } = this.state;
    const paginatedArticles = articles.slice(start, end);

    return (
      <div className="mainContent">
        <PageLoader />

        <section id="banner">
          <Carousel id="main" imageUrls={carousel.imageUrls} captions={carousel.captions} />
        </section>

        <section className="articles large-padding responsive-flex">
          {(paginatedArticles && paginatedArticles.length > 0)
            ? (
              <div className="left responsive-flex-child inner-padding">
                {paginatedArticles.map(article => <ArticleCard key={article._id} article={article} />)}
                <ReactPaginate
                  previousLabel="PREVIOUS"
                  nextLabel="NEXT"
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={Math.ceil(articles.length / ARTICLES_PER_PAGE)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.onPageChange}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </div>
            ) : (
              <span>
                <span role="img" aria-label="sad">😢</span>
                No Articles
              </span>
            )}

          {events && events.length > 0 && (
            <div className="right responsive-flex-child inner-padding">
              <div>Sidebar Content here</div>
              <ul>
                <li>Results</li>
                <li>Events</li>
                <li>Social Feed</li>
              </ul>
            </div>
          )}
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

        {articles && articles.length > 0 && (
          <React.Fragment>
            <section className="photos section-padding">
              <div className="inner-padding">
                <h3>Featured Photos</h3>
                <FeaturedPhotos articles={articles} />
              </div>
            </section>
            <section className="videos section-padding">
              <div className="inner-padding">
                <h3>Featured Videos</h3>
                <FeaturedVideos articles={articles} />
              </div>
            </section>
          </React.Fragment>
        )}

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
  }
}

Home.propTypes = {
  carousel: PropTypes.shape({}).isRequired,
  about: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
