import React, { useState, useContext, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import mainAppBarLinks from '../../components/main-app-bar/mainAppBarLinks';
import UserContext from '../user-context/UserProvider';

const INITIAL_VALUES = {
  links: [],
  setLinks: (v) => {},
  selectedLink: null,
  setSelectedLink: (v) => {},
  activeLink: null, // to handle the color of the current nav link
  setActiveLink: (v) => {} // to handle the color of the current nav link
};

const MainAppBarContext = createContext(INITIAL_VALUES);

export const MainAppBarProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(INITIAL_VALUES.selectedLink);
  const [activeLink, setActiveLink] = useState(INITIAL_VALUES.activeLink);
  const { t } = useTranslation();
  useEffect(() => {
    setLinks([...mainAppBarLinks(t, user)]);
  }, [t, user]);

  return (
    <MainAppBarContext.Provider
      value={{
        links,
        setLinks,
        selectedLink,
        setSelectedLink,
        activeLink,
        setActiveLink
      }}
    >
      {children}
    </MainAppBarContext.Provider>
  );
};

export default MainAppBarContext;
