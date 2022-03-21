import axios from "axios";

// export default axios.create({
//   baseURL: "http://103.160.95.49:1234",
// });

export default axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});
