import React from 'react'

export const AUTH_TRUE = "AUTH_TRUE"
export const AUTH_FALSE = "AUTH_FALSE"

const AuthContext = React.createContext({
  isAuth: null,
  setIsAuth: null
})

export const authReducer = (state, action) => {
  switch (action) {
    case AUTH_TRUE:
      return true;
    case AUTH_FALSE:
      return false;
    default: return state
  }
}

export default AuthContext;