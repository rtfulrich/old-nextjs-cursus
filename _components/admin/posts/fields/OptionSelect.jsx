import React from 'react'

function OptionSelect({ selected, value, children }) {
  return (
    <option value={value} /* selected={selected} */ className="bg-black text-white font-semibold tracking-widest py-3 w-full">
      {children}
    </option>
  )
}

export default OptionSelect
