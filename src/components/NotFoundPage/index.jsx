import React from 'react';
import PropTypes from 'prop-types';

const NotFoundPage = ({ history }) => (
  <div className="mainContent">
    <h1>Page Not Found</h1>
    {history.push('/')}
  </div>
);

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default NotFoundPage;
