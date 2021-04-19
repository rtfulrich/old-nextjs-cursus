import axios from 'axios';
import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { RESET_PASSWORD_MODAL } from '../../../pages/kaontiko';
import InputForm from '../../../_components/simple-components/InputForm';
import { API_URL } from '../../../_constants/URLs';
import sanctumRequest from '../../../_helpers/sanctumRequest';
import UserContext, { AUTH_TRUE } from '../../../_react-contexts/user-context';

function Login({ setShowAuthModal, setInModal }) {
  // S T A T E S
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({
    email: null,
    password: null,
    other: null
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false)

  // C O N T E X T S
  const { user, setUser } = React.useContext(UserContext);

  // M O U N T  E F F E C T S
  React.useEffect(() => () => null, []);

  // M E T H O D S
  const handleSubmit = () => sanctumRequest(
    async () => {
      if (loading) return;
      setErrors({ email: null, password: null, other: null });
      setLoading(true);
      const response = await axios.post(`${API_URL}/login`, { email, password });
      setLoading(false);
      const { status, message } = response.data;
      if (status === 400) setErrors({ ...errors, other: message });
      else if (status === 200) {
        const newUser = response.data.user;
        const name = newUser.first_name ? `${newUser.first_name} ${newUser.last_name}` : newUser.pseudo;
        setUser({ type: AUTH_TRUE, payload: newUser });
        toast.success(<>Miarahaba anao, <br /><span className="font-bold text-lg tracking-widest">{name}</span> !</>);
        setShowAuthModal(false);
      }
    },
    error => {
      const response = error.response;
      const { data, status } = response;

      // Invalid data sent to the api
      if (status === 422) {
        let { email, password } = response.data.errors;
        email = email ? email[0] : null;
        password = password ? password[0] : null;
        setErrors({ ...errors, email, password });
      }

      // Internal server error
      if (status === 500) setErrors({ ...errors, other: data.message });

      setLoading(false);
      // Forbidden (probably because the user is already authenticated)
      if (status === 403) setShowAuthModal(false);
    }
  );

  const clearError = (property) => setErrors({ ...errors, other: null, [property]: null })

  // J S X
  return (
    <>
      <h2 className="text-center text-uppercase tracking-widest font-bold border-b border-gray-200 bg24 py-2 rounded-t-lg text-lg">L O G I N</h2>
      <div className="px-3 py-2">
        {<small className={`text-red-400 font-bold text-xs text-center block tracking-widest leading-3 input-error ${errors.other ? "show" : ""}`}>{errors.other || "Lorem ipsum"}</small>}
        <InputForm
          label="Email" id="login-email" type="email" loading={loading} state={[email, setEmail]}
          error={errors.email} clearError={() => clearError("email")}
          icon={<HiOutlineMail className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 ${focus ? "twitter" : (errors.email ? "text-red-400" : "")}`} />}
        />
        <InputForm
          label="Tenimiafina" type={!showPassword ? "password" : "text"} id="login-password" loading={loading}
          state={[password, setPassword]} error={errors.password}
          clearError={() => clearError("password")} marginBottom="mb-8"
          icon={
            <RiLockPasswordLine
              className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.password ? "text-red-400" : "")}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
        <button className={`py-1 rounded-full w-full ${loading ? "bg-gray-400" : "twitter-bg twitter-bg-hover"} transition-colors duration-150 font-bold tracking-widest text-xl flex items-center justify-center`} onClick={handleSubmit}>
          I S E R A
          </button>
        <div className="flex justify-between items-center">
          <div className="font-bold my-4 text-center text-xs twitter twitter-hover transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => setInModal("register-form")}>Hisoratra aho ?</div>
          <span className="font-bold py-0 text-xs twitter twitter-hover transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => setInModal(RESET_PASSWORD_MODAL)}>Adino ny tenimiafina ?</span>
        </div>
      </div>
    </>
  )
}

export default Login
