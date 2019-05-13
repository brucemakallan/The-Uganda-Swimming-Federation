const paths = {
  home: '/',
  dashboard: {
    home: '/dashboard',
    products: '/dashboard/products',
  },
  create: '/create',
  edit: '/edit',
};

const API_URL = 'http://localhost:3001/api/';

export const endpoints = {
  productsGetAll: `${API_URL}articles`,
  productsPost: `${API_URL}/protected/articles`,
  productsGetOne: id => `${API_URL}articles/${id}`,
  productsPut: id => `${API_URL}/protected/articles/${id}`,
  productsDelete: id => `${API_URL}/protected/articles/${id}`,
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
  carousel,
  partners,
  majorSponsors,
  applicationProcedures,
  keyAffiliates,
  CANAZone3,
  footer,
};

export const entityTypes = [ // articles and other dynamic website sections
  carousel,
  article,
  event,
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

export default paths;
