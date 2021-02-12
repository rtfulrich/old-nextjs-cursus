import React from 'react'
import Head from 'next/head'
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import AuthContext, { authReducer } from '../_react-contexts/auth-context';
import { Online, Offline } from "react-detect-offline"

function AppLayout({ children, title = null, withFooter = true }) {
  const [isAuth, dispatch] = React.useReducer(authReducer, false);

  // React.useEffect(() => useSanctum())

  return (
    <>
      <Head>
        {typeof title === "string" && <title>{title}</title>}
        <link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
      </Head>
      <AuthContext.Provider value={{ isAuth, setIsAuth: dispatch }}>
        {/* <Online> */}
        <Header />
        <div className="mt-12 flex">
          <Sidebar />
          <div className="bg-black text-white flex-1 flex flex-col justify-between" style={{ minHeight: "calc(100vh - 3rem)" }}>
            <div id="main-content" className="flex-1">
              {children}
            </div>
            {withFooter && <Footer />}
          </div>
        </div>
        {/* </Online>
        <Offline>
          Offline
      </Offline> */}
      </AuthContext.Provider>
    </>
  )
}

export default AppLayout
