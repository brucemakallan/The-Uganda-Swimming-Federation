import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import getAllProducts from '../../actions/productsActions';
import { endpoints, pageSections, selectFileIcon } from '../../utils';
import '../../components/ArticleCard/articleCard.scss';
import './antidoping.scss';

class Antidoping extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
  }

  render() {
    const { products } = this.props;
    const antidoping = products.filter(article => article.category === pageSections.antidoping);
    const antidopingArticle = get(antidoping, '[0]');

    return (
      <div className="antidoping">
        <h1 className="sub-section-heading">
          Anti-doping
          <hr />
        </h1>
        {get(antidopingArticle, 'body') && (
          <div className="normal-page">
            <img src={antidopingArticle.images[0]} alt="Anti-doping" />

            <div className="antidoping-content">
              <ReactMarkdown source={antidopingArticle.body} />

              {antidopingArticle.files && antidopingArticle.files.length > 0 && (
                <div className="article-files">
                  <br />
                  <div className="heading">Attachments / Downloads</div>
                  <div className="article-files-links">
                    {antidopingArticle.files.map(file => (
                      <div key={file.source}>
                        <a href={file.source} target="_blank" rel="noopener noreferrer" className="border-animation">
                          <div className="border-animation__inner">
                            <span className="mr-2">{selectFileIcon(file.source)}</span>
                            {file.title.trim()}
                            {(file.description && file.description.length > 0) && ` - ${file.description}`}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Antidoping.propTypes = {
  getAllProductsDispatch: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ productsReducer }) => ({
  products: productsReducer.products,
});

const mapDispatchToProps = {
  getAllProductsDispatch: getAllProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Antidoping);
