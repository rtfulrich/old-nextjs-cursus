import React from 'react'
import Link from "next/link"
import { FaBars } from 'react-icons/fa'
import { toggleSidebar } from '../../../_helpers/toggleSidebar'
import HeaderRight from './HeaderRight';

function Header() {

  return (
    <header className={`h-12 flex items-center justify-between text-white pr-2 md:pr-4 fixed top-0 w-full bg33`}>
      <div className="flex h-full items-center">
        <div className="twitter-bg twitter-bg-hover cursor-pointer h-full w-12 flex justify-center items-center transition-colors duration-200 ease-in-out" onClick={toggleSidebar}>
          <FaBars className="text-2xl" />
        </div>
        <h1 className="ml-4 h-full flex items-center my-auto">
          <Link href="/"><a style={{ textDecoration: "none" }} className="text-white flex items-center">
            <img src="/favicon.svg" alt="Logo" width="30" /> <span className="text-2xl font-bold tracking-widest mx-3">IanaTek</span>
          </a></Link>
        </h1>
      </div>
      <div>
        <HeaderRight />
      </div>
    </header>
  )
}

export default Header
