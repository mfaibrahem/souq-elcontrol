import React, { useState, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import mainAppBarLinks from '../../components/main-app-bar/mainAppBarLinks';

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
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(INITIAL_VALUES.selectedLink);
  const [activeLink, setActiveLink] = useState(INITIAL_VALUES.activeLink);
  const { t } = useTranslation();
  useEffect(() => {
    setLinks([...mainAppBarLinks(t)]);
  }, [t]);

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
