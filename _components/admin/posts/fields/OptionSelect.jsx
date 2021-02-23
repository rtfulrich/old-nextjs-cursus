import React from 'react'

function OptionSelect({ value, children }) {
  return (
    <option value={value} className="bg-black text-white font-semibold tracking-widest py-3 w-full">
      {children}
    </option>
  )
}

export default OptionSelect
