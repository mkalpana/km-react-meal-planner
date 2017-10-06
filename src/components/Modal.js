import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CloseIcon from 'react-icons/lib/fa/close';

const AppModal = ({ isOpen, onClose, label, children }) => {
  return (
    <Modal
      className='modal'
      overlayClassName='overlay'
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={label}
    >
      <div style={ { float: 'right' }}>
        <button className="icon-btn" onClick={onClose} aria-label='Close modal'>
          <CloseIcon size={24} />
        </button>
      </div>
      {children}
    </Modal>
  );
};
AppModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  label: PropTypes.string,
};
export default AppModal;
