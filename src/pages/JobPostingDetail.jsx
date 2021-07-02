import React from "react";
import { useParams } from "react-router-dom";
import JobPostingService from "../services/jobPostingService";
import { useState } from "react";
import { useEffect } from "react";
import { Icon, Grid, Button, Divider, Image, List } from "semantic-ui-react";

export default function JobPostingDetail() {
  let { id } = useParams();

  const [jobPosting, setJobPosting] = useState({});

  useEffect(() => {
    let jobPostingService = new JobPostingService();
    jobPostingService
      .getById(id)
      .then((result) => setJobPosting(result.data.data));
  }, []);

  function editDate(strDate) {
    var strSplitDate = String(strDate).split(" ");
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = dd + "/" + mm + "/" + yyyy;
    return date.toString();
  }

  return (
    <div>
      <Divider horizontal style={{ marginBottom: "40px" }}>
        <div
          style={{ paddingTop: "10px", lineHeight: "0px", fontSize: "20px" }}
        >
          İLAN DETAYI
        </div>
      </Divider>
      <div className="job-posting-detail-container">
        <div className="job-posting-detail-up">
          <Image
            src={jobPosting.employer?.imgUrl}
            className="job-posting-img"
            style={{width:"90px"}}
          />
          <div className="job-posting-detail-big-header">
            <b>{jobPosting.employer?.companyName}</b>
          </div>
        </div>
        <div className="job-posting-detail-down">
          <div className="job-posting-detail-listing-date">
            <Icon name="clock outline" />
            {editDate(jobPosting.listingDate)}
          </div>
          <Grid >
            <Grid.Row columns={2}>
              <Grid.Column>
                <div>
                  <div className="job-posting-detail-header">
                    Aranan Pozisyon
                  </div>
                  <div className="job-posting-detail-text">
                    {jobPosting.jobPosition?.positionName}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">Açıklama</div>
                  <div className="job-posting-detail-text">
                    {jobPosting.jobDescription}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">Maaş Aralığı</div>
                  <div className="job-posting-detail-text">
                    {jobPosting.minSalary} - {jobPosting.maxSalary}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">
                    Çalışma Zamanı
                  </div>
                  <div className="job-posting-detail-text">
                    {jobPosting.workingTime?.workingTimeName}
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div>
                  <div className="job-posting-detail-header">
                    Aranan Kişi Sayısı
                  </div>
                  <div>
                    <List horizontal>
                      {jobPosting.numberOfOpenPosition - 1 !== 0 && (
                        <List.Item>
                          <Icon name="square outline" />
                          {jobPosting.numberOfOpenPosition - 1}
                        </List.Item>
                      )}
                      <List.Item>
                        <Icon name="check square outline" />
                        {jobPosting.numberOfOpenPosition}
                      </List.Item>
                      <List.Item>
                        <Icon name="square outline" />
                        {jobPosting.numberOfOpenPosition + 1}
                      </List.Item>
                    </List>
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">Şehir</div>
                  <div className="job-posting-detail-text">
                    {jobPosting.city?.cityName}
                    <Icon name="map marker alternate" style={{marginLeft:"5px"}}/>
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">İş Tipi</div>
                  <div className="job-posting-detail-text">
                    {jobPosting.jobType?.jobTypeName}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">
                    İlanın Bitiş Tarihi
                  </div>
                  <div className="job-posting-detail-text">
                    {editDate(jobPosting.deadlineDate)}
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Divider horizontal style={{ marginBottom: "40px",marginRight:"40px" }}>
                  <div
                    style={{
                      paddingTop: "10px",
                      lineHeight: "0px",
                      fontSize: "20px",
                    }}
                  >
                    İş Veren Bilgileri
                  </div>
                </Divider>
                <div>
                  <div className="job-posting-detail-header">
                    Firma Adı
                  </div>
                  <div className="job-posting-detail-text">
                    {jobPosting.employer?.companyName}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">
                    Mail
                  </div>
                  <div className="job-posting-detail-text">
                    {jobPosting.employer?.email}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">
                    Web Adresi
                  </div>
                  <div className="job-posting-detail-text">
                    {jobPosting.employer?.webAdress}
                  </div>
                </div>
                <div>
                  <div className="job-posting-detail-header">
                    Telefon
                  </div>
                  <div className="job-posting-detail-text">
                    {jobPosting.employer?.phoneNumber}
                    <Icon name="phone" style={{marginLeft:"7px"}}/>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
}
