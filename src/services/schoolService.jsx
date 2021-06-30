import axios from "axios";

export default class SchoolService{

    getCandidateSchoolDesc(candidateId){
        return axios.get("http://localhost:8080/api/schools/getCandidateSchoolsDesc?candidateId=" + candidateId)
    }

    update(values){
        return axios.post("http://localhost:8080/api/schools/update",values)
    }
}