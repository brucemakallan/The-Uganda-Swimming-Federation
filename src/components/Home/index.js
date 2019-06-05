import React, { Component } from 'react';
import './home.scss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ReactPaginate from 'react-paginate';
import { Timeline } from 'react-twitter-widgets';
import Carousel from '../Carousel';
import ArticleCard from '../ArticleCard';
import FeaturedVideos from '../FeaturedVideos';
import FeaturedPhotos from '../FeaturedPhotos';
import PageLoader from '../../containers/PageLoader';
import RecentEventCards from '../EventCard';
import { selectFileIcon, localFiles } from '../../utils';

const addBackgroundImage = url => ({
  backgroundImage: `url(${url})`,
});

const ARTICLES_PER_PAGE = 3;
const concreteSubtleBackground = {
  backgroundImage: `url(${localFiles.concrete})`,
};

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
      carousel, about, articles, events, calendars,
    } = this.props;
    const { pagination: { start, end } } = this.state;
    const paginatedArticles = articles.slice(start, end);

    return (
      <div className="mainContent">
        <PageLoader />

        <section id="banner">
          <Carousel id="main" imageUrls={carousel.imageUrls} captions={carousel.captions} />
        </section>

        <section className="articles large-padding responsive-flex" style={concreteSubtleBackground}>
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
                <span role="img" aria-label="emogi">🤓</span>
                Loading Articles ...
              </span>
            )}

          {events && events.length > 1 && (
            <div className="right responsive-flex-child inner-padding">
              <div className="material-card">
                <h6>RECENT &amp; UPCOMING EVENTS</h6>
                <RecentEventCards events={events} />
                {calendars && calendars[0] && calendars[0].files && calendars[0].files.length > 0
                  && calendars[0].files.map(
                    file => (
                      <a
                        key={file.source}
                        href={file.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="calendar-link"
                      >
                        {selectFileIcon(file.source)}
                        {file.title}
                      </a>
                    )
                  )
                }
              </div>
              <div className="twitter-widget">
                <Timeline
                  dataSource={{
                    sourceType: 'profile',
                    screenName: 'UgandaSwimming'
                  }}
                  options={{
                    username: 'UgandaSwimming',
                    height: '100%'
                  }}
                  onLoad={() => {}}
                />
              </div>
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
          <div className="section-padding text-center">
            Currently Undergoing Upgrades
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
  calendars: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
