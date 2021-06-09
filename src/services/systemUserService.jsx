import axios from "axios";

export default class SystemUserService{

    getSystemUsers(){
        return axios.get("http://localhost:8080/api/systemusers/getall")
    }
}