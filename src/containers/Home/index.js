import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeComponent from '../../components/Home';
import { pageSections, endpoints } from '../../utils';
import getAllWebsiteSections from '../../actions/websiteSectionsActions';

export class Home extends Component {
  componentWillMount() {
    const { getAllWebsiteSectionsDispatch } = this.props;
    getAllWebsiteSectionsDispatch(endpoints.websiteSections);
  }

  render() {
    let carousel = { imageUrls: [], captions: [] };
    const { websiteSections } = this.props;
    const carouselSection = websiteSections.find(
      section => section.heading1.trim().toLowerCase().match(pageSections.carousel)
    );
    if (carouselSection) {
      carousel = {
        imageUrls: carouselSection.images,
        captions: [
          carouselSection.heading2,
          carouselSection.heading3,
          carouselSection.heading4,
          carouselSection.heading5,
          carouselSection.heading6,
        ]
      };
    }
    return (<HomeComponent carousel={carousel} />);
  }
}

Home.propTypes = {
  getAllWebsiteSectionsDispatch: PropTypes.func.isRequired,
  websiteSections: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ websiteSectionsReducer }) => ({
  websiteSections: websiteSectionsReducer.websiteSections,
});
const mapDispatchToProps = {
  getAllWebsiteSectionsDispatch: getAllWebsiteSections,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
