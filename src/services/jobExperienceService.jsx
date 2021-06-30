import axios from "axios";

export default class JobExperienceService{

    getCandidateJobExperiencesDesc(candidateId){
        return axios.get("http://localhost:8080/api/jobexperiences/getCandidateJobExperiencesDesc?candidateId=" + candidateId)
    }

    update(values){
        return axios.post("http://localhost:8080/api/jobexperiences/update",values)
    }

    add(values){
        values.candidate = {
            id: values.candidateId
        }
        return axios.post("http://localhost:8080/api/jobexperiences/add",values)
    }

    delete(jobexperienceId){
        return axios.post("http://localhost:8080/api/jobexperiences/delete?candidateId="+jobexperienceId)
    }
}