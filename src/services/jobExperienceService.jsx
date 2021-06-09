import axios from "axios";

export default class JobExperienceService{

    getCandidateJobExperiencesDesc(candidateId){
        return axios.get("http://localhost:8080/api/jobexperiences/getCandidateJobExperiencesDesc?candidateId=" + candidateId)
    }
}