import React from 'react';
import date from 'date-and-time';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf, faFileWord, faFileArchive, faFile,
} from '@fortawesome/free-solid-svg-icons';

library.add(faFilePdf, faFileWord, faFileArchive, faFile);

const paths = {
  home: '/',
  dashboard: {
    home: '/dashboard',
    products: '/dashboard/products',
    details: '/dashboard/details',
    admin: '/dashboard/admin',
  },
  create: '/create',
  edit: '/edit',
};

const API_URL = 'http://localhost:3001/api/';

export const endpoints = {
  productsGetAll: `${API_URL}articles`,
  productsPost: `${API_URL}protected/articles`,
  productsGetOne: id => `${API_URL}articles/${id}`,
  productsPut: id => `${API_URL}protected/articles/${id}`,
  productsDelete: id => `${API_URL}protected/articles/${id}`,
  adminLogin: `${API_URL}admin`,
};

export const messages = {
  NETWORK_ERROR: 'Network Error!',
  SUCCESS: 'All Good',
  DUPLICATE_MESSAGE: 'Entry already exists',
};

export const serverResponses = {
  DUPLICATE: 'duplicate key error',
};

export const localFiles = {
  logo: './usf-logo.jpg',
};

const carousel = 'Carousel';
const article = 'Article';
const results = 'Latest Results';
const about = 'About';
const event = 'Event';
const imageGallery = 'Image Gallery';
const videoGallery = 'Video Gallery';
const calendars = 'Calendars';
const eventResult = 'Event Result';
const partners = 'Partners';
const majorSponsors = 'Major Sponsors';
const applicationProcedures = 'Application Procedures';
const keyAffiliates = 'Key Affiliates';
const CANAZone3 = 'CANA Zone 3';
const footer = 'Footer';

export const pageSections = {
  article,
  carousel,
  results,
  about,
  partners,
  majorSponsors,
  applicationProcedures,
  keyAffiliates,
  CANAZone3,
  footer,
};

export const entityTypes = [ // articles and other dynamic website sections
  article,
  event,
  results,
  about,
  carousel,
  imageGallery,
  videoGallery,
  calendars,
  eventResult,
  partners,
  majorSponsors,
  applicationProcedures,
  keyAffiliates,
  CANAZone3,
  footer,
];

const fileIcons = {
  default: {
    type: 'default',
    icon: <FontAwesomeIcon icon="file" className="file-icon" title="file" />,
  },
  pdf: {
    type: 'pdf',
    icon: <FontAwesomeIcon icon="file-pdf" className="file-icon" title="file" />,
  },
  word: {
    type: 'doc',
    icon: <FontAwesomeIcon icon="file-word" className="file-icon" title="file" />,
  },
  wordOther: {
    type: 'docx',
    icon: <FontAwesomeIcon icon="file-word" className="file-icon" title="file" />,
  },
  archive: {
    type: 'zip',
    icon: <FontAwesomeIcon icon="file-archive" className="file-icon" title="file" />,
  },
  archiveOther: {
    type: 'rar',
    icon: <FontAwesomeIcon icon="file-archive" className="file-icon" title="file" />,
  },
};

export const selectFileIcon = (filePath) => {
  let icon;
  Object.keys(fileIcons).map((key) => {
    if (filePath.toLowerCase().endsWith(fileIcons[key].type)) {
      icon = fileIcons[key].icon;
    }
    return icon;
  });
  if (icon) {
    return icon;
  }
  return fileIcons.default.icon;
};

export const LONG_DATE_FORMAT = 'ddd DD MMM YYYY HH:mm:ss Z';
export const NORMAL_DATE = 'ddd DD MMM YYYY';
export const SHORT_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE = 'DD';
export const DAY = 'dddd';
export const MONTH = 'MMM';
export const YEAR = 'YYYY';

export const dateToEpoc = dateValue => String(new Date(dateValue).valueOf());

export const epocToDate = (epocTime, format) => date.format(new Date(Number(epocTime)), format);

export const removeUnsupportedProperties = (passedEntity, unsupportedProperties) => {
  const entity = passedEntity;
  unsupportedProperties.map(property => delete entity[property]);
  return entity;
};

export default paths;
