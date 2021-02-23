import React from 'react'

function TextareaLabel({ label, id, children, fieldRef, rows = "10", className = "", ...rests }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div className={className}>
      <label htmlFor={id} className={`font-semibold tracking-widest transition-colors duration-150 ${focus ? "text-blue-500" : ""}`}>
        {label}
      </label>
      <textarea
        name={id} id={id} ref={fieldRef}
        className="w-full rounded-lg bg-transparent px-2 py-1 placeholder-gray-300 placeholder-opacity-90 text-sm font-semibold tracking-widest outline-none border-2 focus:border-blue-500 transition-colors duration-150"
        placeholder={children} {...rests} rows={rows}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      />
    </div>
  )
}

export default TextareaLabel
