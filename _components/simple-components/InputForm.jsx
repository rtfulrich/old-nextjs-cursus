import React from 'react'
import { HiOutlineMail } from "react-icons/hi"
import { RiLockPasswordLine } from "react-icons/ri"

function InputForm({
  state, type = "text",
  label = "Label",
  id = "",
  icon = null,
  marginBottom = "mb-12",
  loading = false,
  error = null,
  clearError = () => { },
  others = {}
}) {

  const [focus, setFocus] = React.useState(false);
  const [move, setMove] = React.useState(false)

  const handleFocus = (e) => {
    clearError()
    const content = state[0];
    if (content.trim() === "") setMove(true);
    setFocus(true);
  }

  const handleBlur = () => {
    const [content] = state;
    if (content.trim() === "") {
      state[1]("")
      setMove(false)
    }
    setFocus(false);
  }

  const handleChange = e => {
    if (!loading) state[1](e.target.value)
  }

  return (
    <div className={`${marginBottom}`}>
      <div className={`relative transition-border duration-200 ease-in-out border-b-2 font-bold mt-4 pb-1 ${focus ? "border-twitter" : (error ? "border-red-400" : "border-white")}`}>
        <label htmlFor={id} className={`custom absolute left-2 ${move ? "move" : ""} ${focus ? "twitter" : ((error && focus) ? "text-red-400" : "")}`}>
          {label}
        </label>
        <input
          type={type} id={id} value={state[0]} autoComplete="off" style={{ width: "calc(100% - 30px)", bottom: "-0.15rem" }}
          className={`text-lg outline-none bg-transparent relative tracking-widest font-bold`}
          onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange}
        />
        {icon}
      </div>
      {<small className={`text-red-400 font-bold text-xs block relative top-2 tracking-widest leading-3 input-error ${error ? "show" : ""}`}>{error || "Lorem ipsum"}</small>}
    </div>
  )
}

export default InputForm
