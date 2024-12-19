const baseURL = import.meta.env.VITE_ENVIRONMENT === "Production" ? 
  "https://pegasus-backend-f4bi.onrender.com/api/v1" : 
  "http://localhost:8080/api/v1"

export default baseURL;
