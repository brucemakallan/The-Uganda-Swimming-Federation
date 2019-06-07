import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import paths, { localFiles } from '../../utils';
import './navbar.scss';

library.add(faSearch);

const startYear = 2014;
const currentYear = new Date().getFullYear();

class NavBar extends Component {
  setActive = (pathname, path) => ((pathname === path) ? 'active' : '');

  render() {
    const { partners, history: { location: { pathname } } } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark" id="dashboard-nav">
        <Link className="navbar-brand" to={paths.home}>
          <img src={localFiles.logo} alt="logo" />
          <span>
            UGANDA
            <br />
            SWIMMING
            <br />
            FEDERATION
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ml-auto">
            <li className="nav-item">
              <Link
                to={paths.home}
                className={`nav-link custom-nav-link btn--shockwave ${this.setActive(pathname, paths.home)}`}
              >
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link custom-nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              Disciplines
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={paths.home} className="dropdown-item custom-nav-link">Swimming</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Water Polo</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Masters</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Para-swimming</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Open-water Swimming</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link custom-nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              Results
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {_.range(startYear, currentYear + 1).reverse().map(year => (
                  <Link key={year} to={`/results/${year}`} className="dropdown-item custom-nav-link">{year}</Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <Link to={paths.home} className="nav-link custom-nav-link btn--shockwave">Members</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link custom-nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              About
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={paths.home} className="dropdown-item custom-nav-link">About USF</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">History of USF</Link>
                <div className="dropdown-divider" />
                <Link to={paths.home} className="dropdown-item custom-nav-link">Executive Committee</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Secretariat</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Committees</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Constitution</Link>
                <Link to={paths.home} className="dropdown-item custom-nav-link">Regulations</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to={paths.home} className="nav-link custom-nav-link btn--shockwave">Contact</Link>
            </li>
          </ul>
        </div>

        {partners && partners.images && partners.images.length > 0 && (
          <div className="nav-sponsors">
            <div className="heading">Official USF Partners</div>
            <div id="nav-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                {partners.images.map((imageUrl, index) => (
                  <div key={imageUrl} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                    <img src={imageUrl} className="d-block" alt="carousel-item" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

NavBar.propTypes = {
  partners: PropTypes.shape({}),
  history: PropTypes.shape({}),
};
NavBar.defaultProps = {
  partners: null,
  history: {
    location: {
      pathname: '/',
    },
  },
};

export default NavBar;
