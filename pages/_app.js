import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/dist/tailwind.min.css';
import '../styles/globals.css'
import "../styles/layout/layout.scss";
import React from 'react';
import UserContext, { userReducer } from '../_react-contexts/user-context';

function IanaTek({ Component, pageProps }) {
  const [user, userDispatch] = React.useReducer(userReducer, null);
  return (
    <UserContext.Provider value={{ user, setUser: userDispatch }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default IanaTek
