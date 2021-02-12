import React from 'react'
import { CloseButton, Modal } from 'react-bootstrap';
import AuthContext, { AUTH_FALSE, AUTH_TRUE } from '../../_react-contexts/auth-context';
import Login from './Login';

function HeaderRight() {
  const { isAuth, setIsAuth } = React.useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [inModal, setInModal] = React.useState("login-form");

  const handleSignout = (clickEvent) => {
    clickEvent.preventDefault()
    setIsAuth(AUTH_FALSE)
  }

  const handleAuthModal = (clickEvent) => {
    clickEvent.preventDefault()
    setShowAuthModal(true);
  }

  return (
    <>
      {
        isAuth && <a href="#" className="px-2 py-1 rounded-lg bg-danger" onClick={handleSignout}>Hiala sera</a>
      }
      {
        !isAuth && <a href="#" className="px-2 py-1 rounded-lg bg-danger" onClick={handleAuthModal}>Isera</a>
      }
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} size="login"
        className="-mt-20" centered
      >
        {/* <CloseButton
          className="absolute hover:bg-red-700 rounded-full px-2 pb-2"
          style={{ top: "-10px", right: "-10px", zIndex: "1050", background: "rgba(220,38,38, 1)", opacity: 0.9, color: "white" }}
          onClick={() => setShowAuthModal(false)}
        /> */}
        <div className="bg45 rounded-xl border-2 border-gray-400">
          {inModal === "login-form" && <Login setShowAuthModal={setShowAuthModal} setInModal={setInModal} />}
          {inModal === "register-form" && <Register setShowAuthModal={setShowAuthModal} setInModal={setInModal} />}
        </div>
      </Modal>
    </>
  )
}

export default HeaderRight
