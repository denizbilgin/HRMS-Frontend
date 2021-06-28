import axios from "axios";

export default class CandidateService{

    getCandidates(){ 
        return axios.get("http://localhost:8080/api/candidates/getall");
    }

    getCvByCandidateId(candidateId){
        return axios.get(`http://localhost:8080/api/candidates/getCVByCandidateId?candidateId=${candidateId}`)
    }

    updateCandidate(values){
        return axios.post("http://localhost:8080/api/candidates/updateCandidate",values)
    }

    uploadImage(candidateId,img){
        return axios.post("http://localhost:8080/api/candidates/uploadImage?candidateId="+candidateId,img)
    }
}