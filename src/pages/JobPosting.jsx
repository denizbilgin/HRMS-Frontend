import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import JobPostingService from "../services/jobPostingService";
import { Icon } from "semantic-ui-react";

export default function JobPosting() {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getActiveJobPostings()
      .then((result) => setJobPostings(result.data.data));
  });

  return (
    <div>
      {jobPostings.map((jobPosting) => (
        <div className="my-card">
          <div className="my-card-header">
            <h5>{jobPosting.employer.companyName}</h5>
          </div>
          <div className="my-card-body">
            <div className="my-card-text">
              <div className="my-card-job-pos">
              İş Pozisyonu:
              </div>
              {jobPosting.jobPosition.positionName}
            </div>
            <div className="my-card-text">{jobPosting.jobDescription}</div>
          </div>
          <div className="my-card-footer">
            <Icon name="point" size="large" className="my-card-icon"/>
            <div>{jobPosting.city.cityName}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
