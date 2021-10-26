import React from "react";
import dynamic from "next/dynamic";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

function filterObject(inputObject) {
  const unWantedProps = [
    "uid",
    "_version",
    "ACL",
    "_in_progress",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by",
    "publish_details",
  ];
  for (const key in inputObject) {
    unWantedProps.includes(key) && delete inputObject[key];
    if (typeof inputObject[key] !== "object") {
      continue;
    }
    inputObject[key] = filterObject(inputObject[key]);
  }
  return inputObject;
}

const DevTools = ({ response }) => {
  const filteredJson = filterObject(response);
  return (
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
                {response && (
                  <DynamicReactJson
                    src={filteredJson}
                    collapsed={1}
                    name="response"
                    enableClipboard={false}
                  />
                )}
              </pre>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DevTools;
