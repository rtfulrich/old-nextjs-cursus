import React from 'react'
import { HiOutlineMail, HiUser } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import InputForm from '../../../_components/simple-components/InputForm';

function Register({ setShowAuthModal, setInModal }) {
  // S T A T E S
  const [pseudo, setPseudo] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [confimPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    email: null, pseudo: null, password: null, confimPassword: null
  });

  // M E T H O D S
  function handleSubmit(e) {

    console.log(pseudo, email, password, confimPassword);
  }

  const clearError = (property) => setErrors({ ...errors, other: null, [property]: null })

  // J S X
  return (
    <>
      <h2 className="text-center text-uppercase tracking-widest font-bold border-b border-gray-200 bg24 py-2 rounded-t-lg text-lg">I S O R A T R A</h2>
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
          state={[confimPassword, setConfirmPassword]} error={errors.confimPassword}
          clearError={() => clearError("confirmPassword")} marginBottom="mb-8"
          icon={
            <RiLockPasswordLine
              className={`absolute right-2 top-1 text-xl transition-color ease-in-out duration-200 cursor-pointer ${focus ? "twitter" : (errors.confimPassword ? "text-red-400" : "")}`}
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
