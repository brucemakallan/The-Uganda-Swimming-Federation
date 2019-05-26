import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import date from 'date-and-time';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import paths from '../../utils';

library.add(faTrash, faPencilAlt, faEye);

const Products = ({ data, saveID }) => (
  <div>
    <div className="flex-container page-header mb-3">
      <h1>Articles</h1>
      <Link className="btn btn-primary btn-sm button-link" to={`${paths.dashboard.products}/create`}>Create</Link>
    </div>
    <ReactTable
      data={data}
      filterable
      defaultFilterMethod={
        (filter, row) => String(row[filter.id]).toLowerCase().includes(String(filter.value).toLowerCase())
      }
      columns={[
        { Header: 'ID', accessor: '_id' },
        { Header: 'Category', accessor: 'category' },
        { Header: 'Heading1', accessor: 'heading1' },
        { Header: 'Heading2', accessor: 'heading2' },
        { Header: 'Heading3', accessor: 'heading3' },
        { Header: 'Body', accessor: 'body' },
        {
          Header: 'Date Created',
          accessor: 'dateCreated',
          Cell: ({ value }) => date.format(new Date(Number(value)), 'ddd DD MMM YYYY HH:mm:ss Z'),
        },
        {
          Header: 'Actions',
          sortable: false,
          filterable: false,
          accessor: '_id',
          className: 'text-center',
          Cell: ({ value }) => (
            <div>
              <Link
                className="iconButton"
                to={`${paths.dashboard.details}/${value}`}
                title="View Details"
              >
                <FontAwesomeIcon icon="eye" className="icon green" />
              </Link>
              <Link
                className="iconButton effect-button"
                to={`${paths.dashboard.products}/edit/${value}`}
                title="Edit"
              >
                <FontAwesomeIcon icon="pencil-alt" className="icon green" />
              </Link>
              <button
                type="button"
                id="deleteBt"
                className="iconButton effect-button"
                onClick={() => saveID(value)}
                title="Delete"
              >
                <FontAwesomeIcon icon="trash" className="icon red" />
              </button>
            </div>
          ),
        },
      ]}
      defaultPageSize={50}
      className="-striped -highlight"
    />
  </div>
);

Products.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  saveID: PropTypes.func.isRequired,
};

export default Products;
