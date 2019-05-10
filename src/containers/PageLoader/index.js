import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import './loader.scss';

class PageLoader extends Component {
  render() {
    const { showLoader } = this.props;
    return (
      showLoader && (
        <div className="loader">
          <Loader
            type="Ball-Triangle"
            color="#00BFFF"
            height="50"
            width="50"
          />
        </div>
      )
    );
  }
}

PageLoader.propTypes = {
  showLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ loaderReducer }) => ({
  showLoader: loaderReducer.showLoader,
});
export default connect(mapStateToProps)(PageLoader);
