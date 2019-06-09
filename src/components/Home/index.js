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
import { selectFileIcon, concreteSubtleBackground } from '../../utils';

const ARTICLES_PER_PAGE = 4;

const addBackgroundImage = url => ({
  backgroundImage: `url(${url})`,
});

const renderCardWithLinks = list => (
  list && list[0] && list[0].files && list[0].files.length > 0 && list[0].heading1
    && (
      <div className="material-card">
        <h6>{list[0].heading1}</h6>
        {list[0].files.map(
          file => (
            <a
              key={file.source}
              href={file.source}
              target="_blank"
              rel="noopener noreferrer"
              className="calendar-link border-animation"
            >
              <div className="border-animation__inner">
                {selectFileIcon(file.source)}
                {file.title}
              </div>
            </a>
          )
        )}
      </div>
    )
);

const renderCardWithImages = list => (
  list && list[0] && list[0].files && list[0].files.length > 0 && list[0].heading1
    && (
      <div className="material-card">
        <h6>{list[0].heading1}</h6>
        <div className="responsive-flex">
          {list[0].files.map(
            file => (
              <a
                key={file.source}
                href={file.description}
                target="_blank"
                rel="noopener noreferrer"
                className="affiliate-logo"
              >
                <img src={file.source} title={file.title} alt="logo" />
              </a>
            )
          )}
        </div>
      </div>
    )
);

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
      carousel,
      about,
      articles,
      events,
      calendars,
      applicationProcedures,
      affiliates,
      canaZone3,
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
              </div>
              {renderCardWithLinks(calendars)}
              {renderCardWithLinks(applicationProcedures)}
              {renderCardWithImages(affiliates)}
              {canaZone3 && canaZone3[0] && (
                <div className="material-card">
                  <h6>{canaZone3[0].heading1}</h6>
                  <img src={canaZone3[0].images[0]} alt="CANA logo" className="cana-zone-img" />
                  <div className="cana-zone-body">{canaZone3[0].body}</div>
                  <div className="cana-zone-link">
                    <a href={canaZone3[0].heading2} target="_blank" rel="noopener noreferrer">Visit Website</a>
                  </div>
                </div>
              )}
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
  applicationProcedures: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  affiliates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  canaZone3: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
