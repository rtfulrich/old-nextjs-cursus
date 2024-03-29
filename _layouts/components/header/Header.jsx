import React from 'react'
import { FaBars } from 'react-icons/fa'
import { toggleSidebar } from '../../../_helpers/toggleSidebar'
import HeaderRight from './HeaderRight';
import LoadingContext from '../../../_react-contexts/loading-context';
import IanaTekLogo from '../../../_components/front/IanaTekLogo';
import { IANATEK_VERSION } from '../../../_constants/ianatek-constants';

function Header() {

  const { pageLoading } = React.useContext(LoadingContext);

  return (
    <header className={`h-12 ${pageLoading ? "hidden relative bg-transparent" : "flex fixed bg33"} items-center justify-between text-white pr-2 md:pr-4 top-0 w-full z-50`}>
      <div className="flex h-full items-center">
        <div className="twitter-bg twitter-bg-hover cursor-pointer h-full w-12 flex justify-center items-center transition-colors duration-200 ease-in-out" onClick={toggleSidebar}>
          <FaBars className="text-2xl" />
        </div>
        <h1 className="ml-4 h-full flex items-center my-auto">
          <IanaTekLogo url="/" />
        </h1>
      </div>
      <div>
        <HeaderRight />
      </div>
    </header>
  )
}

export default Header
