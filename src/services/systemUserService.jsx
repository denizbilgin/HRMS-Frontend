import axios from "axios";

export default class SystemUserService{

    getSystemUsers(){
        return axios.get("http://localhost:8080/api/systemusers/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/systemusers/getBySystemUserId?systemUserId="+id)
    }

    update(values){
        return axios.post("http://localhost:8080/api/systemusers/update",values)
    }
}