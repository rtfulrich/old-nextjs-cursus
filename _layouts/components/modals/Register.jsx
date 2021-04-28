import axios from 'axios';
import React from 'react'
import { HiOutlineMail, HiUser } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import InputForm from '../../../_components/simple-components/InputForm';
import { API_URL } from '../../../_constants/URLs';
import sanctumRequest from "../../../_helpers/sanctumRequest";
import UserContext, { AUTH_TRUE } from '../../../_react-contexts/user-context';

function Register({ setShowAuthModal, setInModal }) {
  // S T A T E S
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    email: null, pseudo: null, password: null, confimPassword: null
  });

  // C O N T E X T S
  const { setUser } = React.useContext(UserContext);

  // M E T H O D S
  const handleSubmit = () => sanctumRequest(
    async () => {
      if (loading) return;
      setErrors({ email: null, pseudo: null, password: null, confirmPassword: null, other: null });
      setLoading(true);

      const response = await axios.post(`${API_URL}/register`, { pseudo, email, password, confirmPassword });

      const { message } = response.data;
      const { status } = response;
      setLoading(false)
      if (status === 400) setErrors({ ...errors, other: message });
      else if (status === 200) {
        const user = response.data.user;
        setUser({ type: AUTH_TRUE, payload: user });
        setShowAuthModal(false);
        toast.success(message);
      }
    },
    (e) => {
      const response = e.response;
      const { data, status } = response;
      setLoading(false)
      // Forbidden (probably because the user is already authenticated)
      if (status === 403) setShowAuthModal(false);
      // Invalid data sent to the api
      if (status === 422) {
        let { pseudo, email, password, confirmPassword } = response.data.errors;
        pseudo = pseudo ? pseudo[0] : null;
        email = email ? email[0] : null;
        password = password ? password[0] : null;
        confirmPassword = confirmPassword ? confirmPassword[0] : null;
        setErrors({ ...errors, pseudo, email, password, confirmPassword });
      }
      // Internal server error
      if (status === 500) setErrors({ ...errors, other: data.message });
    }
  );

  const clearError = (property) => setErrors({ ...errors, other: null, [property]: null })

  // J S X
  return (
    <>
      <h2 className="text-center text-uppercase tracking-widest font-bold border-b border-gray-200 bg24 py-2 rounded-t-lg text-lg">R E G I S T E R</h2>
      <div className="px-3 py-2">
        {<small className={`text-red-400 font-bold text-xs text-center block tracking-widest leading-3 input-error ${errors.other ? "show" : ""}`}>{errors.other || "Lorem ipsum"}</small>}
        <InputForm
          label="Pseudo" id="register-pseudo" loading={loading} state={[pseudo, setPseudo]}
          error={errors.pseudo} clearError={() => clearError("pseudo")}
          icon={
            <HiUser className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 ${focus ? "twitter" : (errors.pseudo ? "text-red-400" : "")}`} />
          }
        />
        <InputForm
          label="Email" id="register-email" type="email" loading={loading} state={[email, setEmail]}
          error={errors.email} clearError={() => clearError("email")}
          icon={<HiOutlineMail className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 ${focus ? "twitter" : (errors.email ? "text-red-400" : "")}`} />}
        />
        <InputForm
          label="Tenimiafina" type={!showPassword ? "password" : "text"} id="register-password" loading={loading}
          state={[password, setPassword]} error={errors.password}
          clearError={() => clearError("password")}
          icon={
            <RiLockPasswordLine
              className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.password ? "text-red-400" : "")}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
        <InputForm
          label="Avereno ny tenimiafina" type={!showPassword ? "password" : "text"} id="register-confirm-password" loading={loading} others={{ showPassword, setShowPassword }}
          state={[confirmPassword, setConfirmPassword]} error={errors.confirmPassword}
          clearError={() => clearError("confirmPassword")} marginBottom="mb-8"
          icon={
            <RiLockPasswordLine
              className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.confirmPassword ? "text-red-400" : "")}`}
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
        <button className={`py-1 rounded-full w-full ${loading ? "bg-gray-400" : "twitter-bg twitter-bg-hover"} transition-colors duration-150 font-bold tracking-widest text-xl flex items-center justify-center`} onClick={handleSubmit}>
          I S O R A T R A
        </button>
        <div className="font-bold my-4 text-center text-xs twitter twitter-hover transition-colors duration-150 ease-in-out cursor-pointer" onClick={() => setInModal("login-form")}>Efa manana kaonty ?</div>
      </div>
    </>
  )
}

export default Register
