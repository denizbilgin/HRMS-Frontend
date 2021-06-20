import React from "react";
import { NavLink, useParams } from "react-router-dom";
import JobPostingService from "../services/jobPostingService";
import { useState } from "react";
import { useEffect } from "react";
import { Icon, Grid, Button, Divider } from "semantic-ui-react";

export default function JobPostingDetail() {
  let { id } = useParams();

  const [jobPosting, setJobPosting] = useState({});

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getById(id)
      .then((result) => setJobPosting(result.data.data));
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}>
            <Button
            primary
            content="Geri"
            as={NavLink}
            to={"/jobpostings"}
            />
          </Grid.Column>
          <Grid.Column width={15}>
            <Divider horizontal>İLAN DETAYI</Divider>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div className="job-posting-detail-card">
        <div className="job-posting-detail-card-header">
          <b>{jobPosting.employer?.companyName}</b>
        </div>
        <div className="job-posting-detail-card-city">
          <Icon name="map marker alternate" />
          {jobPosting.city?.cityName}
        </div>
        <div className="job-posting-detail-card-listingdate">
          {jobPosting.listingDate}
        </div>
        <div className="job-posting-detail-card-body">
          <div>
            <span>
              <b>Pozisyon</b>
            </span>{" "}
            <Icon name="caret right" style={{ marginLeft: "2px" }} />
            {jobPosting.jobPosition?.positionName}
          </div>
          <div>
            <span>
              <b>İş Detayı</b>
            </span>{" "}
            <Icon name="caret right" />
            {jobPosting?.jobDescription}
          </div>
          <Grid style={{ width: "150%", marginTop: "10px" }} columns={3}>
            <Grid.Row>
              <Grid.Column>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      borderBottom: "1px solid #c0c0c0",
                      paddingBottom: "10px",
                    }}
                  >
                    <b>İş Türü</b>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Icon name="check square outline" />
                    {jobPosting.jobType?.jobTypeName}
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      borderBottom: "1px solid #c0c0c0",
                      paddingBottom: "10px",
                    }}
                  >
                    <b>Aranan Kişi Sayısı</b>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div>
                      {jobPosting.numberOfOpenPosition - 1 !== 0 && (
                        <div>
                          <Icon name="square outline" />
                          {jobPosting.numberOfOpenPosition - 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <Icon name="check square outline" />
                      {jobPosting.numberOfOpenPosition}
                    </div>
                    <div>
                      <Icon name="square outline" />
                      {jobPosting.numberOfOpenPosition + 1}
                    </div>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      borderBottom: "1px solid #c0c0c0",
                      paddingBottom: "10px",
                    }}
                  >
                    <b>Çalışma Süresi</b>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Icon name="check square outline" />
                    {jobPosting.workingTime?.workingTimeName}
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="job-posting-detail-card-salary">
            <span>
              <b>Maaş Skalası</b>
            </span>{" "}
            <Icon name="caret right" /> {jobPosting.minSalary}{" "}
            <Icon name="minus" /> {jobPosting.maxSalary}
          </div>
          <div style={{ marginTop: "10px" }}>
            <span>
              <b>İlanın Son Erişim Tarihi</b>
            </span>{" "}
            <Icon name="caret right" /> {jobPosting.deadlineDate}
          </div>
        </div>
        <div
          className="job-posting-detail-card-employer"
          style={{ textAlign: "center" }}
        >
          <div
            style={{ borderBottom: "1px solid #c0c0c0", paddingBottom: "10px" }}
          >
            İşveren Bilgileri
          </div>
          <div>
            <div style={{ marginTop: "10px" }}>
              <Icon name="phone" />
              {jobPosting.employer?.phoneNumber}
            </div>
            <div>
              <Icon name="chrome" />
              {jobPosting.employer?.webAdress}
            </div>
          </div>
        </div>
        <div
          className="job-posting-detail-card-footer"
          style={{ textAlign: "center" }}
        >
          <Button
            fluid
            primary
            content="İşverenle İletişime Geç"
            icon="phone"
            labelPosition="right"
          ></Button>
        </div>
      </div>
    </div>
  );
}
