import React from 'react';
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

const DevTools = ({ response }) => (
  <div
    className="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="staticBackdropLabel">
            Json Response
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          {response ? (
            <pre id="jsonViewer">
              {response && <DynamicReactJson src={response} collapsed />}
            </pre>
          ) : ''}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn primary-btn"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default DevTools;
