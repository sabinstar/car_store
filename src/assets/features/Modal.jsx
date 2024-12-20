import React from "react";
import "./Modal.css"; // Add styles for your modal here.


const Modal = ({ onClose, children }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      {children} {/* This will display the error or success message */}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);


export default Modal;