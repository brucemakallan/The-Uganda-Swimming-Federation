import React, { Component } from 'react';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingBag, faHome, faBars, faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import paths from '../../utils';

library.add(
  faShoppingBag, faHome, faBars, faArrowUp,
);

const {
  dashboard: {
    home, products,
  }
} = paths;

const navLinks = [
  { path: home, icon: 'home', name: 'Dashboard Home' },
  { path: products, icon: 'shopping-bag', name: 'Products' },
];

class Sidebar extends Component {
  state = {
    responsiveClass: '',
    buttonIcon: 'bars',
  }

  collapseMenu = () => this.setState({ responsiveClass: '', buttonIcon: 'bars' });

  toggleBurgerMenu = () => {
    const { responsiveClass } = this.state;
    if (responsiveClass === '') this.setState({ responsiveClass: 'responsive', buttonIcon: 'arrow-up' });
    else this.collapseMenu();
  };

  setActiveLink = (currentPath, pathName) => {
    if (currentPath.trim().toLowerCase() === pathName.trim().toLowerCase()) return 'active';
    return '';
  };

  createNavLink = (currentPath, pathName, icon, linkName) => (
    <Link
      className={`sidebarLink ${this.setActiveLink(currentPath, pathName)}`}
      to={currentPath}
      key={linkName}
      onClick={this.collapseMenu}
    >
      <FontAwesomeIcon icon={icon} className="icon" />
      <span>{linkName}</span>
    </Link>
  );

  render() {
    const { history: { location: { pathname } } } = this.props;
    const { buttonIcon, responsiveClass } = this.state;

    return (
      <React.Fragment>
        <div className={`sidebar ${responsiveClass} bg-primary`}>
          {navLinks.map(link => this.createNavLink(link.path, pathname, link.icon, link.name))}
        </div>
        <button type="button" className="iconButton burgerButton" onClick={this.toggleBurgerMenu}>
          <FontAwesomeIcon icon={buttonIcon} className="burger" />
        </button>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default Sidebar;
