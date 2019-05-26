import React from 'react';
import PropTypes from 'prop-types';
import './login.scss';

const Login = ({
  onChange, onSubmit, logout, email,
}) => (
  <div>
    <div className="flex-container page-header mb-3">
      <h1>Admin Login</h1>
    </div>
    <div className="login-container">
      {email && email.length > 0
      && (
        <div className="current-user">
          Currently logged in as
          &nbsp;
          <strong>{email}</strong>
          &nbsp;
          🤓
          <button type="submit" className="btn btn-link" onClick={logout}>Logout</button>
        </div>
      )}
      <form className="inputForm" id="adminLoginForm" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder="email"
            required
            onChange={onChange}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="password"
            required
            onChange={onChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
);

Login.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string,
};

Login.defaultProps = {
  email: '',
};

export default Login;
