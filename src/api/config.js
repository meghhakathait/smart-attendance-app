import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("saatoken"); //Browser ke localStorage se token nikala:
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`); //Agar token mila hai, tab request ke headers me token add karo.
  }
  return config; //Ye Axios ko bol raha hai:"Maine request ko modify/check kar liya. Ab isi request ko continue karke server ko bhejo."
// Agar return config nahi karoge, interceptor request ko properly continue nahi karayega.
});

// Interceptor ka matlab hai: Request server ko bhejne se just pehle, us request ko check/modify karne ka chance.
// So tum api.get() ya api.post() karogi → request actually server par jaane se pehle → interceptor chalega.




// export const data = "hello";
export default api;

// default import - ek file mai sirf ekhi default instance ho skta hai nd default ka hum import k time name chnge kr skte hai
// import api from ..path
// import {data} from path
//agr do component same name se ho tb hum named import ko {data as myData} likh skte diffrentiate krne k liye
//named import - jb multiple function ho tb export laga dete hai direct varibale k agge nd iska name curly brackets k ander likhte hai nd same name likhte hai
