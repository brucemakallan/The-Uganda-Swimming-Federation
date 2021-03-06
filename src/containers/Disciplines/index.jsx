import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import getAllProducts from '../../actions/productsActions';
import {
  pageSections,
  endpoints,
  disciplineSections,
  concreteSubtleBackground,
  scrollToTarget,
} from '../../utils';
import ContentCard from '../../components/ContentCard';
import './index.scss';


class Discipline extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  async componentDidMount() {
    const { getAllProductsDispatch } = this.props;
    await getAllProductsDispatch(endpoints.productsGetAll);
    if (this.ref.current) {
      const offset = 170;
      scrollToTarget(this.ref.current, offset);
    }
  }

  renderSubSection = (heading, parent, hash) => {
    const list = parent.filter(discipline => discipline.tags.map(tag => tag.text).includes(heading));
    const id = _.snakeCase(heading);
    return (
      (list && list.length > 0)
        ? (
          <React.Fragment key={heading}>
            <div className="sub-section" id={id} ref={hash.replace('#', '') === id ? this.ref : null}>
              {
                <h1 className="sub-section-heading">
                  {heading}
                  <hr />
                </h1>
              }
              {list.map(content => <ContentCard key={content._id} content={content} />)}
            </div>
          </React.Fragment>
        )
        : ''
    );
  }

  render() {
    const { products, history: { location: { hash } } } = this.props;
    const disciplines = products.filter(section => section.category === pageSections.disciplinePage);

    return (
      <div className="disciplines-page mainContent" style={concreteSubtleBackground}>
        <div className="large-padding">
          {Object.values(disciplineSections).map(subSection => this.renderSubSection(subSection, disciplines, hash))}
        </div>
      </div>
    );
  }
}

Discipline.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Discipline);
