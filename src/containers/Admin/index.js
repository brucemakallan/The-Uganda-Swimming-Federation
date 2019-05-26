import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../../components/Admin';
import login from '../../actions/adminActions';
import paths, { endpoints } from '../../utils';

class AdminPage extends Component {
  state = {
    admin: {
      email: '',
      password: '',
    },
  }

  handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { admin } = this.state;
    this.setState({
      admin: {
        ...admin,
        [name]: value,
      }
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { admin } = this.state;
    const { loginAction, history } = this.props;
    loginAction(endpoints.adminLogin, admin, history);
  }

  handleLogout = () => {
    const { history } = this.props;
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    history.push(paths.dashboard.home);
  }

  render() {
    const email = localStorage.getItem('email');
    return (
      <LoginForm
        email={email}
        onChange={this.handleOnChange}
        onSubmit={this.handleOnSubmit}
        logout={this.handleLogout}
      />
    );
  }
}

AdminPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  loginAction: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
