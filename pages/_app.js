import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/dist/tailwind.min.css';
import '../styles/globals.css'
import "../styles/layout/layout.scss";
import React from 'react';
import UserContext, { userReducer } from '../_react-contexts/user-context';
import AppLayout from '../_layouts/AppLayout';
import NotFound from '../_layouts/components/errors/NotFound';
import Unauthorized from '../_layouts/components/errors/Unauthorized';
import { useRouter } from 'next/router';
import LoadingContext, { loadingReducer } from '../_react-contexts/loading-context';

function IanaTek({ Component, pageProps }) {
  // V A R I A B L E S
  const router = useRouter();
  if (router.pathname.match("/admin")) pageProps.page.noFooter = true;

  // C O N T E X T S
  const [user, userDispatch] = React.useReducer(userReducer, undefined);
  const [pageLoading, pageLoadingDispatch] = React.useReducer(loadingReducer, false);

  // J S X
  let component;
  if (pageProps.page?.notFound) component = <NotFound />
  else if (pageProps.page?.unauthorized) component = <Unauthorized />
  else component = <Component {...pageProps} />

  return (
    <LoadingContext.Provider value={{ pageLoading, setPageLoading: pageLoadingDispatch }}>
      <UserContext.Provider value={{ user, setUser: userDispatch }}>
        <AppLayout
          title={pageProps.page?.title}
          withFooter={!pageProps.page?.noFooter}
        >
          {component}
        </AppLayout>
      </UserContext.Provider>
    </LoadingContext.Provider>
  )
}

export default IanaTek
