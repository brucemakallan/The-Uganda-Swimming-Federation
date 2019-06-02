import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  render() {
    let carousel = { imageUrls: [], captions: [] };
    const { products } = this.props;
    const articles = this.getPageSectionElements(products, pageSections.article);
    const about = this.getPageSectionElements(products, pageSections.about);
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
      />
    );
  }
}

Home.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
