import Link from 'next/link'
import React from 'react'

function Unauthorized() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-center">
        <h3 className="text-4xl font-bold tracking-widest">You are not authorized !</h3>
        <Link href="/"><a>Hoany amy pejy fandraisana</a></Link>
      </div>
    </div>
  )
}

export default Unauthorized
