import axios from 'axios';
import React from 'react'
import { Modal } from 'react-bootstrap';
import { RiMessengerFill, RiNotification2Fill } from 'react-icons/ri';
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

  const handleAuthModal = async (clickEvent) => {
    clickEvent.preventDefault()
    setShowAuthModal(true);
  }

  // J S X
  return (
    <>
      {/* @auth */}
      {
        user && <div className="flex items-center">
          <RiMessengerFill className="mr-4 text-lg" />
          <RiNotification2Fill className="mr-4 text-lg" />
          <a href="#" className="px-2 py-1 rounded-lg bg-danger" onClick={handleSignout}>Hiala sera</a>
        </div>
      }
      {/* @else */}
      {
        !user && <a href="#" className="px-2 py-1 rounded-lg bg-danger" onClick={handleAuthModal}>Isera</a>
      }
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} size="login"
        className="" centered
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
      {/* @endauth */}
    </>
  )
}

export default HeaderRight
