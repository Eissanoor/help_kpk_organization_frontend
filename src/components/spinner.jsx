import React from 'react';

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner">
      <style jsx>{`
        .spinner-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5); /* Optional: dim background */
          z-index: 1000; /* Ensure it appears above other elements */
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left-color: #05D899;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s ease infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  </div>
);

export default Spinner;
