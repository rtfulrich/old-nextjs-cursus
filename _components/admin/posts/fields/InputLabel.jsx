import React from 'react'

function InputLabel({
  label,
  id,
  children,
  fieldRef,
  errorNeeds = [null, null, "attribute"],
  className = "",
  type = "text",
  ...rests
}) {

  const errorAttribute = errorNeeds[2];
  const allErrors = errorNeeds[0]
  const error = allErrors[errorAttribute];
  const setErrors = errorNeeds[1];

  const clearError = () => setErrors({ ...allErrors, [errorAttribute]: null })

  const [focus, setFocus] = React.useState(false);
  return (
    <div className={className}>
      <label htmlFor={id} className={`font-semibold tracking-widest transition-colors duration-150 ${focus ? "text-blue-500" : (error ? "text-red-500" : "")}`}>
        {label}
      </label>
      <input
        type={type} name={id} id={id} ref={fieldRef}
        className={`w-full rounded-lg bg-transparent px-2 py-1 placeholder-gray-300 placeholder-opacity-90 text-sm font-semibold tracking-widest outline-none border-2 ${error ? "border-red-500" : ""} focus:border-blue-500 transition-colors duration-150`}
        autoComplete="off" placeholder={children} {...rests}
        onChange={clearError}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      />
      {error && <small className="text-red-500 font-bold tracking-wider">{error}</small>}
    </div>
  );

}

export default InputLabel
