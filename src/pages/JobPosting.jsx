import React, { useEffect, useState } from "react";
import JobPostingService from "../services/jobPostingService";
import { Icon, Button, Divider } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function JobPosting() {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getActiveJobPostings()
      .then((result) => setJobPostings(result.data.data));
  }, []);

  return (
    <div>
      <Divider horizontal>AKTİF İŞ İLANLARI</Divider>
      <div className="job-postings-filter-panel">
        <Grid columns={2}>
          {jobPostings.map((jobPosting) => (
            <Grid.Column style={{paddingTop:"0px"}}  key={jobPosting.id}>
              <div className="job-posting-card">
                <div className="job-posting-card-header">
                  {jobPosting.employer.companyName}
                </div>
                <div className="job-posting-card-city">
                  <Icon name="map marker alternate" />
                  {jobPosting.city.cityName}
                </div>
                <div className="job-posting-card-body">
                  <div>
                    <span>Aranan Pozisyon</span> <Icon name="angle right" />{" "}
                    {jobPosting.jobPosition.positionName}
                  </div>
                  <div>
                    <span>İş Açıklaması</span>{" "}
                    <Icon className="angle-right" name="angle right" />{" "}
                    {jobPosting.jobDescription}
                  </div>
                </div>
                <div className="job-posting-card-detail-button">
                  <Button primary as={NavLink} to={`/jobposting/${jobPosting.id}`}>
                    <Icon
                      name="briefcase"
                      className="job-posting-card-detail-button-icon"
                    />
                    Detaylarına Git
                  </Button>
                </div>
                <div className="job-posting-card-salary">
                  <span>Maaş Skalası : </span> {jobPosting.minSalary} -{" "}
                  {jobPosting.maxSalary} <Icon name="lira sign" />
                </div>
              </div>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </div>
  );
}
