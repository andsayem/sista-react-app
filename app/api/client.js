import { create } from "apisauce";

const  apiClient = create({
    baseURL : "https://sista.droidit.net/api/" 
});

export  default apiClient ;