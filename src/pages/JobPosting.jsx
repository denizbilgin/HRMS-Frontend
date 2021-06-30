import React, { useEffect, useState } from "react";
import JobPostingService from "../services/jobPostingService";
import { Icon, Button, Divider, Image } from "semantic-ui-react";
import { Grid, Pagination } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import JobPostingFilter from "../components/JobPostingFilter";
import JobPostingFavouriteService from "../services/jobPostingFavouriteService";
import { useParams } from "react-router";
import { useHistory } from "react-router";

export default function JobPosting() {
  const [jobPostings, setJobPostings] = useState([]);
  const [candidateFavourites, setCandidateFavourites] = useState([]);
  const [jobPostingsCount, setJobPostingsCount] = useState([])
  const [render, setRender] = useState(false)

  let { cityId, positionId, workingTimeId,pageNo,pageSize } = useParams();

  const history = useHistory();
  

  useEffect(() => {
    let jobPostingFavouriteService = new JobPostingFavouriteService();
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
    } else if(pageNo, pageSize){
      jobPostingService.getByPage(pageNo,pageSize).then((result) => setJobPostings(result.data.data));
    }else{
      jobPostingService.getByPage(1,9).then((result) => setJobPostings(result.data.data));
    }
    jobPostingFavouriteService.getCandidateFavourites(5).then((result) => setCandidateFavourites(result.data.data));
    jobPostingService.getActiveJobPostings().then((result) => setJobPostingsCount(result.data.data));
  }, [render]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function handleRandomColor() {
    return "3px solid" + getRandomColor();
  }

  function handleChangeFavourite(candidateId,jobPostingId) {
    let jobPostingFavouriteService = new JobPostingFavouriteService();
    jobPostingFavouriteService.changeFavourite(candidateId,jobPostingId)
    handleRender()
  }

  function handleRender() {
    if (render === false) {
      setRender(true)
    } else {
      setRender(false)
    }
  }
 
  function handleFavouriteIcon(jobPostingId) { 
    var bool = false;
    for (let i = 0; i < candidateFavourites.length; i++) {
      if (candidateFavourites[i].jobPostingId === jobPostingId) {
        return true;
      } else {
        bool = false;
      }
    }
    return bool;
  }

  function handlePagination(pageNo) {
    history.push(
      `/jobpostings/getallbypage/pageNo/${pageNo}/pageSize/${pageSize}`
    );
    window.location.reload(false);
  }

  return (
    <div>
      <Divider horizontal style={{ marginBottom: "10px" }}>
        <div style={{paddingTop:"10px",lineHeight:"0px",fontSize:"20px"}}>AKTİF İŞ İLANLARI</div>
      </Divider>
      <div className="job-posting-filter-panel">
        <JobPostingFilter></JobPostingFilter>
      </div>
        <Grid columns={3} style={{marginTop:"30px"}}>
          {jobPostings.map((jobPosting) => (
            <Grid.Column style={{ paddingTop: "0px" }} key={jobPosting.id}>
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
                  <div className="job-posting-card-star" onClick = {() => handleChangeFavourite(5,jobPosting.id)}>
                    {handleFavouriteIcon(jobPosting.id)=== true? <Icon name="bookmark"/> : <Icon name="bookmark outline"/>}
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
                    /> <span>Detaylarına Git</span>
                  </Button>
                </div>
              </div>
            </Grid.Column>
          ))}
        </Grid>
        <Pagination id="pag" defaultActivePage={pageNo} pointing secondary totalPages={jobPostingsCount.length/pageSize} onPageChange={(event, data) => handlePagination(data.activePage)}/>
    </div>
  );
}
