import axios from "configs/axios";

export default {
  login: (credential) => axios.post("/login", credential),
  register: (payload) => axios.post("/register", payload),

  details: () => axios.get("/me"),
};
