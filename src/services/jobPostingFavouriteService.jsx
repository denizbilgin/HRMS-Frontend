import axios from "axios"

export default class JobPostingFavouriteService{

    changeFavourite(candidateId,jobPostingId){
        return axios.post(`http://localhost:8080/api/jobpostingfavourites/changejobpostingfavourite?candidateId=${candidateId}&jobPostingId=${jobPostingId}`)
    }

    getCandidateFavourites(candidateId){
        return axios.get(`http://localhost:8080/api/jobpostingfavourites/getcandidatesfavourites?candidateId=${candidateId}`)
    }
}