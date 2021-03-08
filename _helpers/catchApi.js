import axios from "axios";
import { toast } from "react-toastify";
import { BACK_URL } from "../_constants/URLs";

export default function catchApi(error, callback) {
  console.log("error axios", error.response);
  toast.error(error.response.data.message);
  if (error.response.status === 419) {
    axios.get(`${BACK_URL}/sanctum/csrf-cookie`)
      .then(res => callback())
      .catch(e => toast.error(e.response.data.message))
  }
  else callback();
}