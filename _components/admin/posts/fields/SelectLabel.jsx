import React from 'react'

function SelectLabel({ label, id, children, fieldRef, text, className = "", ...rests }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div className={className}>
      <label htmlFor={id} className={`font-semibold tracking-widest transition-colors duration-150 ${focus ? "text-blue-500" : ""}`}>
        {label}
      </label>
      <select
        htmlFor={id} name={id} id={id} ref={fieldRef} {...rests}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        className="w-full rounded-lg bg-transparent px-2 py-1 placeholder-gray-300 placeholder-opacity-90 text-sm font-semibold tracking-widest outline-none border-2 focus:border-blue-500 transition-colors duration-150"
      >
        <option className="font-semibold tracking-widest bg-gray-400 text-black py-1">{text}</option>
        {children}
      </select>
    </div>
  )
}

export default SelectLabel
