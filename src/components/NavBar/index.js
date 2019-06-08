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
  setActive = (path) => {
    const { history: { location: { pathname } } } = this.props;
    if (pathname === path) return 'active';
    return '';
  }

  render() {
    const { partners } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark" id="dashboard-nav">
        <a className="navbar-brand" href={paths.home}>
          <img src={localFiles.logo} alt="logo" />
          <span>
            UGANDA
            <br />
            SWIMMING
            <br />
            FEDERATION
          </span>
        </a>

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
              <a
                href={paths.home}
                className={`nav-link custom-nav-link btn--shockwave ${this.setActive(paths.home)}`}
              >
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className={`nav-link custom-nav-link dropdown-toggle ${this.setActive(paths.discipline)}`}
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
              Disciplines
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a href={`${paths.discipline}#swimming`} className="dropdown-item custom-nav-link">Swimming</a>
                <a href={`${paths.discipline}#water-polo`} className="dropdown-item custom-nav-link">Water Polo</a>
                <a href={`${paths.discipline}#masters`} className="dropdown-item custom-nav-link">Masters</a>
                <a href={`${paths.discipline}#para-swimming`} className="dropdown-item custom-nav-link">
                  Para-swimming
                </a>
                <a href={`${paths.discipline}#open-water`} className="dropdown-item custom-nav-link">
                  Open-water Swimming
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className={`nav-link custom-nav-link dropdown-toggle ${this.setActive(paths.results)}`}
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
                  <a key={year} href={`/results#${year}`} className="dropdown-item custom-nav-link">{year}</a>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <a
                href={paths.members}
                className={`nav-link custom-nav-link btn--shockwave ${this.setActive(paths.members)}`}
              >
                Members
              </a>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/"
                className={`nav-link custom-nav-link dropdown-toggle ${this.setActive(paths.about)}`}
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                About
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a href={paths.about} className={`dropdown-item custom-nav-link ${paths.about}`}>About USF</a>
                <a href={`${paths.about}#history`} className="dropdown-item custom-nav-link">History of USF</a>
                <div className="dropdown-divider" />
                <a href={`${paths.about}#executive`} className="dropdown-item custom-nav-link">Executive Committee</a>
                <a href={`${paths.about}#secretariat`} className="dropdown-item custom-nav-link">Secretariat</a>
                <a href={`${paths.about}#committees`} className="dropdown-item custom-nav-link">Committees</a>
                <a href={`${paths.about}#constitution`} className="dropdown-item custom-nav-link">Constitution</a>
                <a href={`${paths.about}#regulations`} className="dropdown-item custom-nav-link">Regulations</a>
              </div>
            </li>
            <li className="nav-item">
              <a
                href={paths.contact}
                className={`nav-link custom-nav-link btn--shockwave ${this.setActive(paths.contact)}`}
              >
                Contact
              </a>
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
