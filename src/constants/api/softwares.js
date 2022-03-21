import axios from "configs/axios";

export default {
  all: () => axios.get(`/softwares`).then((res) => res.data),
  details: (id) => axios.get(`/softwares/${id}`).then((res) => res.data),
};
