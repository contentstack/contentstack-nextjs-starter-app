'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Tooltip from './tool-tip';
import { useDeveloperTools } from '@/hooks/useDevTools';

const DynamicJsonViewer = dynamic(() => import('@textea/json-viewer').then((module) => ({ default: module.JsonViewer })), { ssr: false });

function filterObject(inputObject: any) {
  if (!inputObject) return {};
  
  const copyObj = JSON.parse(JSON.stringify(inputObject));
  
  const unWantedProps = [
    '_version',
    'ACL',
    '_owner',
    '_in_progress',
    'created_at',
    'created_by',
    'updated_at',
    'updated_by',
    'publish_details',
  ];
  
  for (const key in copyObj) {
    unWantedProps.includes(key) && delete copyObj[key];
    if (typeof copyObj[key] === 'object' && copyObj[key] !== null) {
      copyObj[key] = filterObject(copyObj[key]);
    }
  }
  return copyObj;
}

interface DevToolsProps {
  response?: any;
}

const DevTools = ({ response }: DevToolsProps) => {
  const [forceUpdate, setForceUpdate] = useState(0);
  const { state,setState } = useDeveloperTools();

  useEffect(()=>{
    if (Object.keys(response).length > 0) {
      setState(response);
    }
  },[response])
  
  let dataToShow = state;
  
  
  const filteredJson = filterObject(dataToShow);
  
  function copyObject(object: any) {
    navigator.clipboard.writeText(object);
    setForceUpdate(1);
  }

  useEffect(() => {
    if (forceUpdate !== 0) {
      setTimeout(() => setForceUpdate(0), 300);
    }
  }, [forceUpdate]);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      role="dialog"
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="devtools-modal-title" id="staticBackdropLabel">
              JSON Preview
            </h2>
            <span
              className="json-copy"
              onClick={() => copyObject(JSON.stringify(filteredJson))}
              aria-hidden="true"
            >
              <Tooltip
                content={forceUpdate === 0 ? 'Copy' : 'Copied'}
                direction="top"
                dynamic
                delay={200}
                status={forceUpdate}
              >
                <img src="/copy.svg" alt="copy icon" />
              </Tooltip>
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {dataToShow ? (
              <pre id="jsonViewer">
                <DynamicJsonViewer
                  value={filteredJson}
                  defaultInspectDepth={1}
                  rootName={'response'}
                  displayDataTypes={false}
                  enableClipboard={false}
                  style={{ color: '#C8501E' }}
                />
              </pre>
            ) : (
              <div className="no-data">No data available for this view</div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn tertiary-btn modal-btn"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTools;
