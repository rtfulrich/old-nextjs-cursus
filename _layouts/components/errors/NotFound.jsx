import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-center">
        <h3 className="text-4xl font-bold tracking-widest">This page is not found !</h3>
        <Link href="/"><a>Hoany amy pejy fandraisana</a></Link>
      </div>
    </div>
  )
}

export default NotFound
