import axios from "axios";
import { toast } from "react-toastify";
import { BACK_URL } from "../_constants/URLs";

export default async function sanctumRequest(callback, catchCallback = null, finallyCallback = null) {
  try {
    await callback();
  }
  catch (error) {
    // console.clear();
    // console.log("error", error);
    // console.log("error resp", error.response);
    if (error.response && error.response.status && error.response.status === 419) {
      axios.get(`${BACK_URL}/sanctum/csrf-cookie`)
        .then(res => sanctumRequest(callback, catchCallback, finallyCallback))
        .catch(e => toast.error(e.response.data.message));
    }
    if (error.response && error.response.status && error.response.status === 401) {
      window.location.reload();
    }

    // Catch callback
    if (typeof catchCallback === "function") catchCallback(error);
  }
  finally {
    if (typeof finallyCallback === "function") finallyCallback();
  }
}