import React from 'react'
import { domainToUnicode } from 'url';
import InputForm from '../../_components/simple-components/InputForm'

function Login({ setShowAuthModal, setInModal }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const rememberRef = React.useRef(false)
  const [errors, setErrors] = React.useState({
    email: null,
    password: null,
    other: null
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false)

  // React.useEffect(() => console.log(email), [email])

  const handleSubmit = async () => {
    if (loading) return;
    setErrors({ email: null, password: null, other: null });
    await setLoading(true);
    setTimeout(() => {
      setLoading(false)
      // setShowAuthModal(false)
      setErrors({
        email: "lsjfsljksdml",
        password: "slqjdifeozax",
        other: "The email is required"
      })
    }, 2000);
  }

  const clearError = (property) => setErrors({ ...errors, other: null, [property]: null })

  return (
    <>
      <h2 className="text-center text-uppercase tracking-widest font-bold border-b border-gray-200 bg24 py-2 rounded-t-lg text-lg">L O G I N</h2>
      <div className="px-3 py-2">
        {<small className={`text-red-400 font-bold text-xs text-center block tracking-widest leading-3 input-error ${errors.other ? "show" : ""}`}>{errors.other || "Lorem ipsum"}</small>}
        <InputForm
          label="Email" id="email" type="email" loading={loading} state={[email, setEmail]}
          error={errors.email} clearError={() => clearError("email")}
        />
        <InputForm
          label="Tenimiafina" type={!showPassword ? "password" : "text"} id="password" loading={loading} others={{ showPassword, setShowPassword }}
          state={[password, setPassword]} error={errors.password}
          clearError={() => clearError("password")} marginBottom="mb-8"
        />
        <div className="flex justify-between mb-2">
          <label htmlFor="remember" className="cursor-pointer">
            <input type="checkbox" id="remember" ref={rememberRef} className="cursor-pointer" /> <span className="font-bold">Tadidiana aho</span>
          </label>
          <span className="font-bold py-0 text-xs twitter twitter-hover transition-colors duration-150 ease-in-out cursor-pointer">Adino ny tenimiafina ?</span>
        </div>
        <button className={`py-1 rounded-full w-full ${loading ? "bg-gray-400" : "twitter-bg twitter-bg-hover"} transition-colors duration-150 font-bold tracking-widest text-xl flex items-center justify-center`} onClick={handleSubmit}>
          I S E R A
        </button>
      </div>
    </>
  )
}

export default Login
