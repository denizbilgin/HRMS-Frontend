import axios from "axios";

export default class JobPostingService{

    getJobPostings(){
        return axios.get("http://localhost:8080/api/jobpostings/getall")
    }

    getActiveJobPostings(){
        return axios.get("http://localhost:8080/api/jobpostings/getActivePostings")
    }

    getActiveAndDeadlineDateEquals(deadlineDate){
        return axios.get("http://localhost:8080/api/jobpostings/getIsActiveTrueAndDeadlineDateEquals?deadlineDate=" + deadlineDate)
    }

    getByEmployerIdAndIsActiveTrue(employerId){
        return axios.get("http://localhost:8080/api/jobpostings/getIsActiveTrueAndEmployerId?employerId=" + employerId)
    }

    addJobPosting(values){
      values.employer = {id:values.employerId}
      values.jobPosition = {positionId:values.jobPositionId}
      values.city = {id: values.cityId}
      values.jobType = {id: values.jobTypeId}
      values.workingTime = {id: values.workingTimeId}
      console.log(values)

        return axios.post("http://localhost:8080/api/jobpostings/add",values);
    }
}