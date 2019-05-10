const paths = {
  home: '/',
  dashboard: {
    home: '/dashboard',
    products: '/dashboard/products',
    properties: '/dashboard/properties',
    users: '/dashboard/users',
    subscriptions: '/dashboard/subscriptions',
    orders: '/dashboard/orders',
    unresolvedSearches: '/dashboard/unresolved-searches',
    salesStats: '/dashboard/sales-stats',
    websiteSections: '/dashboard/website-sections',
    admin: '/dashboard/admin',
    details: '/dashboard/details',
  },
  create: '/create',
  edit: '/edit',
};

const API_URL = 'https://thesuperdudu.com/api/';

export const endpoints = {
  properties: `${API_URL}properties`,
  products: `${API_URL}products`,
  websiteSections: `${API_URL}sections`,
};

export const propertyTypes = [
  'Category',
  'Condition',
];

export const messages = {
  NETWORK_ERROR: 'Network Error!',
  SUCCESS: 'All Good',
  DUPLICATE_MESSAGE: 'Entry already exists',
};

export const serverResponses = {
  DUPLICATE: 'duplicate key error',
};

export const localFiles = {
  logo: './logo.png',
};

export const pageSections = {
  carousel: 'carousel',
  services: 'services',
  categories: 'categories',
  offers: 'offers',
  featured: 'featured',
  popular: 'popular',
  newsletter: 'newsletter',
  order: 'order',
  footer: 'footer',
};

export const entityTypes = [ // articles and other dynamic website sections
  'Carousel',
  'Article',
  'Event',
  'Image Gallery',
  'Video Gallery',
  'Calendar',
  'Event Result',
  'Partner',
  'Major Sponsor',
  'Application Procedures',
  'Key Affiliates',
  'CANA Zone 3',
  'Footer',
]

export default paths;
