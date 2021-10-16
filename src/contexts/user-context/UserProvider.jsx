import React, { createContext, useReducer } from 'react';
import { setUser, removeUser, setUserToStateAction } from './user.actions';
import userReducer from './user.reducer';
import Cookies from 'js-cookie';

const getUserFromSession = () => {
  if (sessionStorage.getItem('currentUser')) {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  } else if (Cookies.get('currentUser')) {
    return JSON.parse(Cookies.get('currentUser'));
  }
  return null;
};

const INITIAL_STATE = {
  loggedIn:
    Cookies.get('currentUser') || sessionStorage.getItem('currentUser')
      ? true
      : false,
  user: getUserFromSession()
};

const contextInitialState = {
  ...INITIAL_STATE,
  setUserToState: (user) => {},
  setCurrentUser: (user) => {},
  removeCurrentUser: () => {}
};

const UserContext = createContext(contextInitialState);

export const UserProvider = ({ children }) => {
  const [reducerState, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { user, loggedIn } = reducerState;
  const setCurrentUser = (cUser) => dispatch(setUser(cUser));
  const setUserToState = (u) => dispatch(setUserToStateAction(u));
  const removeCurrentUser = () => dispatch(removeUser());

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        user,
        setUserToState,
        setCurrentUser,
        removeCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
