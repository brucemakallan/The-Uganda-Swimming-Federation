import React, { Component } from 'react';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingBag, faCogs, faUsers, faMailBulk, faCartArrowDown,
  faSearchPlus, faChartPie, faTh, faUserNinja, faHome, faBars, faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import paths from '../../utils';

library.add(
  faShoppingBag, faCogs, faUsers, faMailBulk, faCartArrowDown,
  faSearchPlus, faChartPie, faTh, faUserNinja, faHome, faBars, faArrowUp,
);

const {
  dashboard: {
    home, products, properties, users, subscriptions, orders, unresolvedSearches, salesStats, websiteSections, admin,
  }
} = paths;

const navLinks = [
  { path: home, icon: 'home', name: 'Dashboard Home' },
  { path: products, icon: 'shopping-bag', name: 'Products' },
  { path: properties, icon: 'cogs', name: 'Properties' },
  { path: users, icon: 'users', name: 'Users' },
  { path: subscriptions, icon: 'mail-bulk', name: 'Subscriptions' },
  { path: orders, icon: 'cart-arrow-down', name: 'Orders' },
  { path: unresolvedSearches, icon: 'search-plus', name: 'Unresolved Searches' },
  { path: salesStats, icon: 'chart-pie', name: 'Sales stats' },
  { path: websiteSections, icon: 'th', name: 'Website Sections' },
  { path: admin, icon: 'user-ninja', name: 'Admin' },
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
