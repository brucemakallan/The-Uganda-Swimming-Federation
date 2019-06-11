import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import getAllProducts from '../../actions/productsActions';
import {
  pageSections,
  endpoints,
  scrollToTarget,
  concreteSubtleBackground,
  aboutSections,
} from '../../utils';
import './about.scss';


class About extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  async componentWillMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
    if (this.ref.current) {
      const offset = 170;
      scrollToTarget(this.ref.current, offset);
    }
  }

  renderSubSection = (heading, parent, hash) => {
    const aboutArticles = parent.filter(aboutArticle => aboutArticle.heading1.includes(heading));
    const id = _.snakeCase(heading);
    return (
      (aboutArticles && aboutArticles.length > 0)
        ? (
          <React.Fragment key={heading}>
            <div className="pre-section" id={id} ref={hash.replace('#', '') === id ? this.ref : null} />
            <div className="sub-section">
              {
                <h1 className="sub-section-heading">
                  {heading}
                  <hr />
                </h1>
              }
              {aboutArticles.map((content, index) => (
                <React.Fragment key={String(index)}>
                  {content.body && content.body.length > 0 && (
                    <div className="about-body">
                      <ReactMarkdown source={content.body} />
                    </div>
                  )}
                  {content.files && content.files.length > 0 && (
                    <div className="about-files responsive-flex">
                      {content.files.map((file, i) => (
                        <div key={String(i)} className="responsive-flex-child">
                          <div className="committee-member">
                            <div className="photo">
                              <img src={file.source} alt="member" />
                            </div>
                            <div className="details">
                              <div className="person">{file.title}</div>
                              <div className="role">{file.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        )
        : ''
    );
  }

  render() {
    const { products, history: { location: { hash } } } = this.props;
    const aboutList = products.filter(article => article.category === pageSections.aboutPage);

    return (
      <div className="mainContent">
        <div className="about-page" style={concreteSubtleBackground}>
          <div className="large-padding">
            {Object.values(aboutSections).map(subSection => this.renderSubSection(subSection, aboutList, hash))}
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(About);
