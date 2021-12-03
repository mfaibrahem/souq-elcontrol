import './LoadingModal.scss';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const LoadingModal = (props) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => (document.body.style.overflowY = 'auto');
  }, []);

  const { clsName, children } = props;

  return ReactDOM.createPortal(
    <div
      className={`${clsName ? `loading-modal ${clsName}` : 'loading-modal'}`}
    >
      <div className="mfa-container">
        <div className="modal-wrap">
          <div className="modal-body">
            {children ? (
              children
            ) : (
              <div className="common-loader">
                <svg className="circular" viewBox="25 25 50 50">
                  <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('#loading-modal')
  );
};

export default LoadingModal;
