import React from "react";

export default function TeamSection(props) {
  const { ourTeam } = props;
  return (
    <div className="about-team-section">
      <div className="team-head-section">
        {ourTeam.title_h2 && <h2>{ourTeam.title_h2}</h2>}
        {ourTeam.description ? <p>{ourTeam.description}</p> : ""}
      </div>
      <div className="team-content">
        {ourTeam.employees?.map((employee, index) => {
          return (
            <div className="team-details" key={index}>
              {employee.image && (
                <img alt={employee.image.filename} src={employee.image.url} />
              )}
              <div className="team-details">
                {employee.name && <h4>{employee.name}</h4>}
                {employee.designation && <p>{employee.designation}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
