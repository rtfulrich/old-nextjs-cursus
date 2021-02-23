import React from 'react'

function InputLabel({ label, id, children, fieldRef, className = "", type = "text", ...rests }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div className={className}>
      <label htmlFor={id} className={`font-semibold tracking-widest transition-colors duration-150 ${focus ? "text-blue-500" : ""}`}>
        {label}
      </label>
      <input
        type={type} name={id} id={id} ref={fieldRef}
        className="w-full rounded-lg bg-transparent px-2 py-1 placeholder-gray-300 placeholder-opacity-90 text-sm font-semibold tracking-widest outline-none border-2 focus:border-blue-500 transition-colors duration-150"
        autoComplete="off" placeholder={children} {...rests}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      />
    </div>
  )
}

export default InputLabel
