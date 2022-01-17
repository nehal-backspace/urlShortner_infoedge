import axios from "axios"; //to make Https Request from backend

const API_BASE_URL = "http://localhost:8080/api/v1";


//a javascript Class
class MyAppServices {

    getAllLinks() {
        return axios.get(API_BASE_URL+"/all-links");
    }

    saveLink(linkObj)
    {
        return axios.post(API_BASE_URL+"/all-links",linkObj);
    }

    getMylink(route)
    {
        return axios.get(API_BASE_URL+route);
    }

    saveCustomLink(linksObj)
    {
        return axios.post(API_BASE_URL+"/saveCustomLink",linksObj);
    }
    getURLStats(linksObj)
    {
        return axios.get(API_BASE_URL+"/getStats", linksObj);
    }
}

//we will export the object of this class so that we can directly use methods inside Components
export default new MyAppServices();

