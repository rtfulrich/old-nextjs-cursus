import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/dist/tailwind.min.css';
import '../styles/globals.css'
import "../styles/layout/layout.scss";
import React from 'react';
import UserContext, { userReducer } from '../_react-contexts/user-context';
import AppLayout from '../_layouts/AppLayout';
import NotFound from '../_layouts/components/errors/NotFound';
import Unauthorized from '../_layouts/components/errors/Unauthorized';

function IanaTek({ Component, pageProps }) {
  // C O N T E X T S
  const [user, userDispatch] = React.useReducer(userReducer, undefined);

  let component;
  if (pageProps.page?.notFound) component = <NotFound />
  else if (pageProps.page?.unauthorized) component = <Unauthorized />
  else component = <Component {...pageProps} />

  // J S X
  return (
    <UserContext.Provider value={{ user, setUser: userDispatch }}>
      <AppLayout title={pageProps.page?.title} withFooter={pageProps.page?.noFooter === undefined}>
        {component}
      </AppLayout>
    </UserContext.Provider>
  )
}

export default IanaTek
