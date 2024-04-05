import axios from "axios";

axios.defaults.baseURL= 'http://localhost:8085/api/';

let refresh = false;

axios.interceptors.response.use(resp=>resp,async error => {
    if (error.response.status === 401 && !refresh){
        refresh = true;
        const response = await axios.post('refresh',{},{withCredentials:true});
        if (response.status === 200){
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            return axios(error.config);
       }
    }
    refresh = false;
    // const token = JSON.parse( <string>sessionStorage.getItem('token') );
    // if( token ){
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    // }
    return error;
});
