import React from 'react'
import { FaUpload } from 'react-icons/fa'
import useFilemanager from '../../../../_hooks/useFilemanager'

function ChooseLfmImage({
  id,
  fieldRef,
  label = "Image cover",
  children = "Choose an image cover",
  className = ""
}) {

  const [image, setImage] = React.useState(null)

  React.useEffect(() => useFilemanager(id), []);

  return (
    <div className={className}>
      <label htmlFor={id} className="font-semibold tracking-widest">{label}</label>
      <label htmlFor={id} id={id} className={`font-semibold tracking-widest bg-blue-500 hover:bg-blue-600 flex justify-center items-center cursor-pointer transition-colors duration-150 w-full py-2 rounded-t-lg mb-0`}>
        <FaUpload className="mr-3" /> {children}
      </label>
      <input type="text" data-input={id} name={id} ref={fieldRef} className="w-full rounded-b-lg bg-transparent px-2 py-1 placeholder-gray-300 placeholder-opacity-90 text-sm font-semibold tracking-widest outline-none border-2 focus:border-blue-500 border-t-none transition-colors duration-150" onChange={(e) => setImage(e.target.value)} />
      <div data-preview={id} className="flex justify-center mt-4">
        {image && <img src={image} className="max-w-full" />}
      </div>
    </div>
  )
}

export default ChooseLfmImage
