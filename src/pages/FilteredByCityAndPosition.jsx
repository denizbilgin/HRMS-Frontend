import React from "react";
import { Icon, Button, Grid } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import JobPostingService from "../services/jobPostingService";

export default function FilteredByCityAndPosition() {
  let { cityId, positionId } = useParams();

  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getByCityIdAndPositionId(cityId, positionId)
      .then((result) => setJobPostings(result.data.data));
  }, []);

  return (
    <div>
      <Grid columns={2}>
          {jobPostings.map((jobPosting) => (
            <Grid.Column style={{paddingTop:"0px"}} key={jobPosting.id}>
              <div className="job-posting-card" >
                <div className="job-posting-card-header">
                  {jobPosting.employer.companyName}
                </div>
                <div className="job-posting-card-city">
                  <Icon name="point" />
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
                  <Button primary>
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
  );
}
