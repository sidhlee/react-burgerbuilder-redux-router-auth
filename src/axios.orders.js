import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-41a2a.firebaseio.com/"
});

export default instance;
