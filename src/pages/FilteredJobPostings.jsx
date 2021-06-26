import React from "react";
import { Icon, Button, Grid, Divider, Image, Pagination } from "semantic-ui-react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import JobPostingService from "../services/jobPostingService";
import JobPostingFilter from "../components/JobPostingFilter";


export default function FilteredJobPostings() {
  let { cityId, positionId, workingTimeId,pageNo,pageSize } = useParams();

  const [jobPostings, setJobPostings] = useState([]);
  const [allJobPostings, setAllJobPostings] = useState([]);

  const history = useHistory();

  useEffect(() => {
    let jobPostingService = new JobPostingService();

    if (cityId && positionId) {
      jobPostingService
      .getByCityIdAndPositionId(cityId, positionId)
      .then((result) => setJobPostings(result.data.data));
    } else if(cityId && workingTimeId){
      jobPostingService.getByCityIdAndWorkingTimeId(cityId,workingTimeId).then((result) => setJobPostings(result.data.data));
    } else if(cityId){
      jobPostingService.getByCityId(cityId).then((result) => setJobPostings(result.data.data));
    } else if(workingTimeId){
      jobPostingService.getByWorkingTimeId(workingTimeId).then((result) => setJobPostings(result.data.data));
    } else if(pageNo,pageSize){
      jobPostingService.getByPage(pageNo,pageSize).then((result) => setJobPostings(result.data.data));
    }
    jobPostingService.getJobPostings().then((result) => setAllJobPostings(result.data.data));
  }, []);

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function handleRandomColor() {
    return "3px solid" + getRandomColor();
  }

  function handlePagination(pageNo) {
    history.push(
      `/jobpostings/getallbypage/pageNo/${pageNo}/pageSize/${pageSize}`
    );
  }

  return (
    <div>
      <Grid>
      <Grid.Row style={{paddingBottom:"0px"}}>
          <Grid.Column width={1}>
            <Button
            primary
            content="Geri"
            as={NavLink}
            to={"/jobpostings"}
            />
          </Grid.Column>
          <Grid.Column width={15}>
          <Divider horizontal style={{ marginBottom: "10px",marginLeft:"10px" }}>
            <div style={{paddingTop:"10px",lineHeight:"0px",fontSize:"20px"}}>ARADIĞINIZ KRİTERDEKİ İLANLAR</div>
          </Divider>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <JobPostingFilter/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={3}>
          {jobPostings.map((jobPosting) => (
            <Grid.Column style={{paddingTop:"0px"}} key={jobPosting.id}>
                            <div
                className="job-posting-card"
                style={{ borderTop: handleRandomColor() }}
              >
                <div className="job-posting-card-img">
                  <Image
                    src={jobPosting.employer.imgUrl}
                    size="small"
                  />
                </div>
                <div>
                  <div className="job-posting-card-header">
                    <b>{jobPosting.employer.companyName}</b>
                  </div>
                  <div className="job-posting-card-star">
                    <Icon name="bookmark outline"/>
                  </div>
                  <div className="job-posting-card-body">
                    <div className="job-posting-card-city">
                      <Icon name="map marker alternate" />
                      {jobPosting.city.cityName}
                    </div>
                    <div className="job-posting-card-position">
                      <span style={{color:"#c0c0c0"}}>Pozisyon </span>
                      {jobPosting.jobPosition.positionName}
                    </div>
                    <Divider style={{marginBottom:"2px",marginTop:"1px"}}/>
                    <div className="job-posting-card-job-description">
                      <span  style={{color:"#c0c0c0"}}>İş Açıklaması </span>
                      <br />
                      {jobPosting.jobDescription}
                    </div>
                  </div>
                </div>
                <div className="job-posting-card-detail-button">
                  <Button
                    primary
                    as={NavLink}
                    to={`/jobposting/${jobPosting.id}`}
                  >
                    <Icon
                      name="briefcase"
                      className="job-posting-card-detail-button-icon"
                    />
                    Detaylarına Git
                  </Button>
                </div>
              </div>
            </Grid.Column>
          ))}
        </Grid>
        <Pagination id="pag" defaultActivePage={pageNo} pointing secondary totalPages={allJobPostings.length/pageSize} onPageChange={(event, data) => handlePagination(data.activePage)}/>
    </div>
  );
}
