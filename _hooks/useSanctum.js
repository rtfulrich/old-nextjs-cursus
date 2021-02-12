import axios from "axios"
import { BACK_URL } from "../_constants/URLs"

const useSanctum = async () => {
  await axios.get(`${BACK_URL}/sanctum/csrf-cookie`)
    .then(res => console.log("Csrf cookie", res))
    .catch(e => alert("Error initializing csrf cookie"))
}

export default useSanctum;