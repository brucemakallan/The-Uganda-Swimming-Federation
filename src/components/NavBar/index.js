import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import paths, { localFiles } from '../../utils';
import './navbar.scss';

library.add(faSearch);

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light" id="dashboard-nav">
    <Link className="navbar-brand" to={paths.home}>
      <img src={localFiles.logo} alt="logo" />
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
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to={paths.home} className="nav-link custom-nav-link">
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
          Categories
          </Link>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to={paths.home} className="dropdown-item custom-nav-link">Electronics</Link>
            <Link to={paths.home} className="dropdown-item custom-nav-link">Fashion</Link>
            <div className="dropdown-divider" />
            <Link to={paths.home} className="dropdown-item custom-nav-link">ALL CATEGORIES</Link>
          </div>
        </li>
        <li className="nav-item">
          <Link to={paths.home} className="nav-link custom-nav-link">Deals</Link>
        </li>
        <li className="nav-item">
          <Link to={paths.home} className="nav-link custom-nav-link">Trending</Link>
        </li>
        <li className="nav-item">
          <Link to={paths.home} className="nav-link custom-nav-link">Under $11</Link>
        </li>
        <li className="nav-item">
          <Link to="/user" className="nav-link custom-nav-link">
            <span>My Account</span>
          </Link>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2 searchBox" type="search" placeholder="Search" aria-label="Search" />
        <button className="iconButton noOutline" type="submit">
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
    </div>
  </nav>
);

export default NavBar;
