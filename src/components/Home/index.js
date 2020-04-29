import React, { Component } from 'react';
import './home.scss';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import ReactPaginate from 'react-paginate';
import ScrollAnimation from 'react-animate-on-scroll';
import { Timeline } from 'react-twitter-widgets';
import { animateScroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../Carousel';
import ArticleCard from '../ArticleCard';
import FeaturedVideos from '../FeaturedVideos';
import FeaturedPhotos from '../FeaturedPhotos';
import PageLoader from '../../containers/PageLoader';
import RecentEventCards from '../EventCard';
import paths, {
  selectFileIcon,
  concreteSubtleBackground,
  YEAR,
  epocToDate,
  parentContains,
} from '../../utils';
import MajorSponsors from '../MajorSponsors';
import SocialMediaIcons from '../SocialMediaIcons';

const ARTICLES_PER_PAGE = 4;

const portalLinks = [
  { link: paths.antidoping, value: 'Anti-doping' },
  { link: paths.swimmingCoaches, value: 'Swimming Coaches' },
];

library.add(faArrowUp);

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
    searchQuery: '',
    searchResults: [],
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

  handleOnChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({
      searchQuery: value,
    }, () => {
      const { searchQuery } = this.state;
      if (searchQuery.length > 2) {
        this.handleSearch(searchQuery);
      } else {
        this.setState({
          searchResults: [],
        });
      }
    });
  }

  handleSearch = (query) => {
    const { articles } = this.props;
    const matchingArticles = articles.filter(
      article => parentContains(article.heading1, query)
        || parentContains(article.heading2, query)
        || parentContains(article.body, query)
    );
    this.setState({ searchResults: matchingArticles });
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
      majorSponsors,
      moreLinks,
    } = this.props;
    const { pagination: { start, end }, searchResults, searchQuery } = this.state;
    const paginatedArticles = (searchResults && searchResults.length > 0)
      ? searchResults.slice(start, end)
      : articles.slice(start, end);
    const articlesToPaginate = (searchResults && searchResults.length > 0)
      ? searchResults
      : articles;

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
                <div className="article-search">
                  <form className="articlesSearchForm" onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                      <input
                        type="search"
                        className="form-control search-control"
                        id="search"
                        name="search"
                        placeholder="Search Articles"
                        onChange={this.handleOnChange}
                      />
                    </div>
                  </form>
                  {(searchQuery.length > 2) && (
                    <div className="results-summary">
                      {
                        searchResults.length === 1
                          ? `${searchResults.length} Result for "${searchQuery}"`
                          : `${searchResults.length} Results for "${searchQuery}"`
                      }
                    </div>
                  )}
                </div>
                {paginatedArticles.map(article => <ArticleCard key={article._id} article={article} />)}
                <ReactPaginate
                  previousLabel="PREVIOUS"
                  nextLabel="NEXT"
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={Math.ceil(articlesToPaginate.length / ARTICLES_PER_PAGE)}
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


          <div className="right responsive-flex-child inner-padding">
            <div className="material-card">
              <h6>MORE</h6>
              <ul className="custom-list">
                {portalLinks.map(portalLink => (
                  <li key={portalLink.link}>
                    <a href={portalLink.link} className="border-animation">
                      <div className="border-animation__inner">{portalLink.value}</div>
                    </a>
                  </li>
                ))}
                {moreLinks && moreLinks.length > 0 && moreLinks.map((link, index) => (
                  <li key={String(index)}>
                    <a href={link.files[0].source} target="_blank" rel="noopener noreferrer" className="border-animation">
                      <div className="border-animation__inner">{link.files[0].title}</div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {events && events.length > 1 && (
              <div className="material-card">
                <h6>RECENT &amp; UPCOMING EVENTS</h6>
                <RecentEventCards events={events} />
              </div>
            )}

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

        </section>

        {about && about.length > 0
        && about[0].images && about[0].images.length > 0
        && about[0].body && about[0].body.length > 0
        && (
          <ScrollAnimation animateIn="animateFadeIn" animateOnce>
            <section className="about" style={addBackgroundImage(about[0].images[0])}>
              <div className="inner-padding about-info">
                <div className="about-info-body-out">
                  <div className="about-info-body-in">
                    <ReactMarkdown source={about[0].body} />
                  </div>
                </div>
              </div>
            </section>
          </ScrollAnimation>
        )}

        {articles && articles.length > 0 && (
          <React.Fragment>
            <ScrollAnimation animateIn="animateFadeIn" animateOnce>
              <section className="photos section-padding">
                <div className="inner-padding">
                  <h3>Featured Photos</h3>
                  <FeaturedPhotos articles={articles} />
                </div>
              </section>
            </ScrollAnimation>
            <ScrollAnimation animateIn="animateFadeIn" animateOnce>
              <section className="videos section-padding">
                <div className="inner-padding">
                  <h3>Featured Videos</h3>
                  <FeaturedVideos articles={articles} />
                </div>
              </section>
            </ScrollAnimation>
          </React.Fragment>
        )}

        {majorSponsors && majorSponsors.length > 0 && (
          <section className="major-sponsors-section section-padding">
            <div className="inner-padding">
              <MajorSponsors majorSponsors={majorSponsors[0]} />
            </div>
          </section>
        )}

        <section className="mb-4">
          <SocialMediaIcons />
        </section>

        <button
          type="button"
          className="iconButton scroll-top"
          title="Scroll to Top"
          onClick={() => animateScroll.scrollToTop()}
        >
          <FontAwesomeIcon icon="arrow-up" />
        </button>

        <section className="footer dark">
          <div className="section-padding copyright">
            <span>
              &copy;&nbsp;
              {epocToDate(new Date().valueOf(), YEAR)}
              &nbsp;
              The Uganda Swimming Federation.
              &nbsp;
            </span>
            <span className="dev">
              <a href="https://iviidev.info" target="_blank" rel="noopener noreferrer">Dev</a>
            </span>
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
  majorSponsors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  moreLinks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Home;
