import React from 'react'
import Head from 'next/head'
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import { Online, Offline } from "react-detect-offline"
import useSanctum from '../_hooks/useSanctum';
import axios from 'axios';
import UserContext, { AUTH_FALSE, AUTH_TRUE } from '../_react-contexts/user-context';
import { API_URL } from '../_constants/URLs';

axios.defaults.withCredentials = true;

function AppLayout({ children, title = null, withFooter = true }) {
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => console.log(user), [user])

  React.useEffect(async () => {
    await useSanctum()
    axios.get(`${API_URL}/check-auth`)
      .then(response => {
        const user = response.data.user;
        if (user) setUser({ type: AUTH_TRUE, user });
        else setUser({ type: AUTH_FALSE });
      })
      .catch(error => alert("Error : " + error))
  }, [])

  return (
    <>
      <Head>
        {typeof title === "string" && <title>{title}</title>}
        <link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
      </Head>

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

    </>
  )
}

export default AppLayout
