import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const AxiosClient = axios.create({
    baseURL: SERVER_URL,
    withCredentials:false,
});

const AxiosClientFormData = axios.create({
    baseURL: SERVER_URL,
    withCredentials:false,
    headers:{
        "Content-Type":"multipart/form-data",
    },
});

  const requestHandler = (request)=>{
      request.headers["Accept"]="application/json";
      request.headers["Content-Type"]="application/json";
      const session = JSON.parse(localStorage.getItem("user"))||null;
      if(session?.token)
      request.headers["Authorization"]= `Bearer ${session.token}`;
  return request;
  };
AxiosClient.interceptors.request.use(
    (req)=> requestHandler(req),
    (err) => Promise.reject(err)
);
AxiosClient.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/"; 
        }
        return Promise.reject(err);
    }
);
export default AxiosClient;