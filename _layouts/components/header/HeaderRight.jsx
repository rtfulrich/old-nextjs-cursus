import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { RiMessengerFill, RiNotification2Fill } from 'react-icons/ri';
import { RESET_PASSWORD_MODAL } from '../../../pages/kaontiko';
import ResetPassword from '../../../_components/front/modals/ResetPassword';
import { API_URL } from '../../../_constants/URLs';
import UserContext, { AUTH_FALSE } from '../../../_react-contexts/user-context';
import Login from '../modals/Login';
import Register from '../modals/Register';

function HeaderRight() {

  // C O N T E X T S
  const { user, setUser } = React.useContext(UserContext);

  // S T A T E S
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [inModal, setInModal] = React.useState("login-form");
  // const []

  // M E T H O D S
  const handleSignout = (clickEvent) => {
    clickEvent.preventDefault()
    axios.post(`${API_URL}/logout`)
      .then(response => {
        const { success } = response.data;
        if (success) setUser({ type: AUTH_FALSE });
      })
      .catch(e => {
        console.log(e.response.data)
        alert("Error : " + e)
      });
  }

  const handleAuthModal = (clickEvent) => {
    clickEvent.preventDefault();
    const modal = clickEvent.target.dataset.modal;
    setInModal(modal);
    setShowAuthModal(true);
  }

  // J S X
  return (
    <>
      {/* @auth */}
      {
        user && <div className="flex items-center">
          {/* <RiMessengerFill className="mr-4 text-lg" /> */}
          {/* <RiNotification2Fill className="mr-4 text-lg" /> */}
          <Link href="/kaontiko">
            <a className="relative hidden md:flex items-center mr-4 pr-4 rounded-full bg-black border-2 border-black twitter-hover transition-all duration-200 ease-in-out cursor-pointer">
              <img src={user.avatar} className="w-9 h-9 rounded-full cursor-pointer" title={user.name} />
              <p className="pl-2 font-bold tracking-widest">{user.name}</p>
            </a>
          </Link>
          {/* <Link href="#"> */}
          <a className="relative flex md:hidden items-center mr-4 rounded-full transition-all duration-200 ease-in-out cursor-pointer border-2 border-transparent border-twitter-hover">
            <img src={user.avatar} className="w-9 h-9 rounded-full cursor-pointer" title={name} />
          </a>
          {/* </Link> */}
          <a href="#" className="px-2 py-1 rounded-lg border-twitter border-2 twitter-bg-hover transition-colors duration-200 ease-in-out font-bold tracking-widest text-white" style={{ textDecoration: "none" }} onClick={handleSignout}>Hiala sera</a>
        </div>
      }
      {/* @else */}
      {
        !user && <>
          <a href="#" data-modal="login-form" className="px-2 py-1 rounded-lg border-twitter border-2 transition-colors ease-in-out duration-200 twitter-bg-hover font-bold tracking-widest text-white mr-2" onClick={handleAuthModal} style={{ textDecoration: "none" }}>Isera</a>
          <a href="#" data-modal="register-form" className="px-2 py-1 rounded-lg border-twitter border-2 transition-colors ease-in-out duration-200 twitter-bg-hover font-bold tracking-widest text-white" onClick={handleAuthModal} style={{ textDecoration: "none" }}>Isoratra</a>
          <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} size="login" centered>
            <div className="bg45 rounded-xl border-2 border-yellow-400">
              {inModal === "login-form" && <Login setShowAuthModal={setShowAuthModal} setInModal={setInModal} />}
              {inModal === "register-form" && <Register setShowAuthModal={setShowAuthModal} setInModal={setInModal} />}
              {inModal === RESET_PASSWORD_MODAL && <ResetPassword setShowModal={setShowAuthModal} setInModal={setInModal} />}
            </div>
          </Modal>
          {/* @endauth */}
        </>
      }
    </>
  )
}

export default HeaderRight
