import axios from "axios";
import { API_URL } from "../../_constants/URLs";

const checkAuth = async (req, res) => {
  // axios.defaults.headers.get.Cookie = req.headers.cookie;
  const response = await axios.get(`${API_URL}/check-auth`, {
    headers: {
      Cookie: req.headers.cookie
    }
  });
  const data = response.data;
  return data;
}

export default checkAuth;