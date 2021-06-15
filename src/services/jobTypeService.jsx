import axios from "axios";

export default class JobTypeService{

    getJobTypes(){
        return axios.get("http://localhost:8080/api/jobtypes/getall")
    }
}