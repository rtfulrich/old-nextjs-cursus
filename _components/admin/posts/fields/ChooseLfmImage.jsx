import React from 'react'
import { FaUpload } from 'react-icons/fa'
import useFilemanager from '../../../../_hooks/useFilemanager'

function ChooseLfmImage({
  id,
  fieldRef,
  label = "Image cover",
  children = "Choose an image cover",
  errorNeeds = [null, null, "attribute"],
  className = "",
  ...rests
}) {

  const errorAttribute = errorNeeds[2];
  const allErrors = errorNeeds[0]
  const error = allErrors[errorAttribute];
  const setErrors = errorNeeds[1];

  const clearError = () => setErrors({ ...allErrors, [errorAttribute]: null })

  const [image, setImage] = React.useState(null);
  const [focus, setFocus] = React.useState(false);

  React.useEffect(() => useFilemanager(id), []);

  return (
    <div className={className}>
      <label htmlFor={id} className={`font-semibold tracking-widest transition-colors duration-150 ${focus ? "text-blue-500" : (error ? "text-red-500" : "")}`}>
        {label}
      </label>
      <label htmlFor={id} id={id} className={`font-semibold tracking-widest ${error ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"} flex justify-center items-center cursor-pointer transition-colors duration-150 w-full py-2 rounded-t-lg mb-0`}>
        <FaUpload className="mr-3" /> {children}
      </label>
      <input
        type="text" data-input={id} name={id} ref={fieldRef}
        className={`w-full rounded-b-lg bg-transparent px-2 py-1 placeholder-gray-300 placeholder-opacity-90 text-sm font-semibold tracking-widest outline-none border-2 ${error ? "border-red-500" : ""} focus:border-blue-500 border-t-none transition-colors duration-150`}
        placeholder="The URL of the image"
        onChange={(e) => {
          setImage(e.target.value);
          clearError();
        }}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        {...rests}
      />
      {error && <small className="text-red-500 font-bold tracking-wider">{error}</small>}
      <div data-preview={id} className="flex justify-center mt-4">
        {image && <img src={image} className="max-w-full" />}
      </div>
    </div>
  )
}

export default ChooseLfmImage
