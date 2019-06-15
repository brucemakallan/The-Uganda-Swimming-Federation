import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import getAllProducts from '../../actions/productsActions';
import {
  endpoints, YEAR, epocToDate, concreteSubtleBackground,
} from '../../utils';
import ArticleCard from '../../components/ArticleCard';
import '../../components/Home/home.scss';
import './results.scss';

const RESULTS_PER_PAGE = 6;


class Results extends Component {
  state = {
    pagination: {
      start: 0,
      end: RESULTS_PER_PAGE,
    },
  }

  componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    getAllProductsDispatch(endpoints.productsGetAll);
  }

  onPageChange = ({ selected }) => {
    const start = selected * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    this.setState({
      pagination: {
        start,
        end,
      },
    });
  }

  render() {
    const { products, history: { location: { hash } } } = this.props;
    const urlYear = hash.replace('#', '');
    const results = products.filter((article) => {
      const dateIn = epocToDate(article.dateIn, YEAR);
      const heading = article.heading1;
      if (dateIn && heading && dateIn === urlYear && heading.startsWith('Results')) {
        return article;
      }
      return null;
    });
    const { pagination: { start, end } } = this.state;
    const paginatedArticles = results.slice(start, end);

    return (
      <div className="mainContent">
        <div className="results-page" style={concreteSubtleBackground}>
          <div className="articles large-padding responsive-flex">
            <h1 className="sub-section-heading">
              {`${urlYear} Results`}
              <hr />
            </h1>
            {(paginatedArticles && paginatedArticles.length > 0)
              && (
                <div className="responsive-flex-child inner-padding">
                  {paginatedArticles.map(article => <ArticleCard key={article._id} article={article} />)}
                  <ReactPaginate
                    previousLabel="PREVIOUS"
                    nextLabel="NEXT"
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={Math.ceil(results.length / RESULTS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.onPageChange}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    activeClassName="active"
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});
const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};
export default connect(mapStateToProps, mapDispatchToProps)(Results);
