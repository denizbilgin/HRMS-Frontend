import axios from "axios";

export default class UserService{

    getUsers(){
        return axios.get("http://localhost:8080/api/users/getall")
    }
}