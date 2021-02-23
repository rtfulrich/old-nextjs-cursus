import React from 'react'

const LoadingContext = React.createContext(true);

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case true:
      return true;
    case false:
      return false;
    default: return state
  }
}

export default LoadingContext;