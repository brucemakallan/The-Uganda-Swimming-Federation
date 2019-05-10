import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Modal = ({
  show, hideModal, title, body, primaryAction, secondaryAction, onClick, id,
}) => (
  <div>
    <ReactModal
      isOpen={show}
      contentLabel={title}
      ariaHideApp={false}
      style={customStyles}
    >
      <button
        type="button"
        id="closeBt"
        className="iconButton float-right mt-1"
        title="Close"
        onClick={hideModal}
      >
        <FontAwesomeIcon icon="times" className="icon red" />
      </button>
      <div className="m-1">{body}</div>
      <div className="m-1 mt-3">
        <button type="button" className="btn btn-sm btn-secondary mr-2" onClick={hideModal}>{secondaryAction}</button>
        <button type="button" className="btn btn-sm btn-danger" onClick={() => onClick(id)}>{primaryAction}</button>
      </div>
    </ReactModal>
  </div>
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  primaryAction: PropTypes.string.isRequired,
  secondaryAction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Modal;
