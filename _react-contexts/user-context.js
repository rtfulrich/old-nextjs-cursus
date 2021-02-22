import React from 'react'

export const AUTH_TRUE = true;
export const AUTH_FALSE = false;

const UserContext = React.createContext(undefined)

export const userReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TRUE:
      return action.payload;
    case AUTH_FALSE:
      return null;
    default: return state
  }
}

export default UserContext;