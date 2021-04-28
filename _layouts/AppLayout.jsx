import React from 'react'
import Head from 'next/head'
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import axios from 'axios';
import UserContext, { AUTH_FALSE, AUTH_TRUE } from '../_react-contexts/user-context';
import { API_URL } from '../_constants/URLs';
import LoadingContext from '../_react-contexts/loading-context';
import { useRouter } from 'next/router';
import Unauthorized from './components/errors/Unauthorized';
import { ADMIN_PSEUDO } from '../_constants/users';
import sanctumRequest from '../_helpers/sanctumRequest';

axios.defaults.withCredentials = true;

function AppLayout({ children, title = null, withFooter = true }) {

  // V A R I A B L E S
  const router = useRouter();

  if (router.isFallback) return (
    <div
      className="h-screen w-screen bg-black flex flex-col items-center justify-center"
      style={{ zIndex: 1000 }}
    >
      <div className="flex flex-col items-center">
        <img src="/images/logo7.webp" alt="IanaTek Logo" className="w-48 sm:w-64 md:w-96" />
        <h1 className="text-white text-8xl md:text-9xl font-bold tracking-widest">IanaTek</h1>
      </div>
    </div>
  );

  // C O N T E X T S
  const { user, setUser } = React.useContext(UserContext);
  const { pageLoading, setPageLoading } = React.useContext(LoadingContext);

  // React.useEffect(() => console.log("app layout mount : user :", user), [user])

  React.useEffect(async () => await sanctumRequest(
    async () => {
      setPageLoading({ type: true });
      const response = await axios.get(`${API_URL}/check-auth`);
      const authUser = response.data.user;
      if (authUser) setUser({ type: AUTH_TRUE, payload: authUser });
      else setUser({ type: AUTH_FALSE });
      setPageLoading({ type: false });
    }
  ), []);

  // J S X
  let pageContent;
  if (typeof user === "object" && router.pathname.match("/admin") && user?.pseudo !== ADMIN_PSEUDO)
    pageContent = <Unauthorized />;
  else pageContent = children;

  return (
    <>
      <Head>
        {typeof title === "string" && <title>{title} | IanaTek</title>}
        <link rel="shortcut icon" href="/images/logo7.webp" type="image/webp" />

        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-JKFJGSHTPL"></script> */}
        {/* <script dangerouslySetInnerHTML={
          {
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-JKFJGSHTPL');
            `,
          }
        }></script> */}
      </Head>

      {/* Page has finished loading */}
      <div>
        {pageLoading && (
          <div
            className="h-screen w-screen bg-black flex flex-col items-center justify-center"
            style={{ zIndex: 1000 }}
          >
            <div className="flex flex-col items-center">
              <img src="/images/logo7.webp" alt="IanaTek Logo" className="w-48 sm:w-64 md:w-96" />
              <h1 className="text-white text-8xl md:text-9xl font-bold tracking-widest">IanaTek</h1>
            </div>
          </div>
        )}
        <div className={`${pageLoading ? "hidden" : ""}`}>
          <Header />
          <div className="mt-12 flex">
            <Sidebar />
            <div className="bg-black text-white flex-1 flex flex-col justify-between" style={{ minHeight: "calc(100vh - 3rem)" }}>
              <main id="main-content" className="flex-1 z-auto">
                {pageContent}
              </main>
              {withFooter && <Footer />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppLayout
