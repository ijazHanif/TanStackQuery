// src/components/Alert.js
import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex items-center gap-x-4 bg-red-500 text-white py-5 px-4 rounded shadow-lg relative">
      <p>{message}</p>
        <button
          className="text-3xl text-white "
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
