import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import HomeComponent from '../../components/Home';
import { pageSections, endpoints } from '../../utils';
import getAllProducts from '../../actions/productsActions';

export class Home extends Component {
  componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    getAllProductsDispatch(endpoints.productsGetAll);
  }

  getPageSectionElements = (allSections, sectionType) => (
    allSections.filter(section => section.category === sectionType)
  );

  getCurrentEvents = (allEvents) => {
    const PAST_EVENTS = 2;
    const NEXT_EVENTS = 2;
    const today = new Date().valueOf();
    let eventsList = [...allEvents, { dateIn: today }];
    eventsList = _.orderBy(eventsList, ['dateIn'], ['desc']);
    const todayIndex = eventsList.map(e => e.dateIn).indexOf(today);
    return eventsList.slice(todayIndex - PAST_EVENTS, todayIndex + NEXT_EVENTS + 1);
  }

  render() {
    const { products } = this.props;

    const articles = this.getPageSectionElements(products, pageSections.article);
    const about = this.getPageSectionElements(products, pageSections.about);
    const calendars = this.getPageSectionElements(products, pageSections.calendars);
    const applicationProcedures = this.getPageSectionElements(products, pageSections.applicationProcedures);
    const affiliates = this.getPageSectionElements(products, pageSections.keyAffiliates);
    const canaZone3 = this.getPageSectionElements(products, pageSections.CANAZone3);

    const allEvents = this.getPageSectionElements(products, pageSections.event);
    const events = this.getCurrentEvents(allEvents);

    let carousel = { imageUrls: [], captions: [] };
    const carouselSection = products.find(
      section => section.category.match(pageSections.carousel)
    );
    if (carouselSection) {
      carousel = {
        imageUrls: carouselSection.images,
        captions: [
          carouselSection.heading1,
          carouselSection.heading2,
          carouselSection.heading3,
          carouselSection.heading4,
          carouselSection.heading5,
          carouselSection.heading6,
        ]
      };
    }
    return (
      <HomeComponent
        carousel={carousel}
        articles={articles}
        about={about}
        events={events}
        calendars={calendars}
        applicationProcedures={applicationProcedures}
        affiliates={affiliates}
        canaZone3={canaZone3}
      />
    );
  }
}

Home.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products.reverse(),
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
