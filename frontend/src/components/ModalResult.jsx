import React from 'react';
import './ModalResult.css';

const ModalResult = ({ show, handleClose, handleContinue }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='result-text'>Your results are in!</h2>
        <button className="continue" onClick={handleContinue}>Click here to continue</button>
        <button className="close"onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalResult;