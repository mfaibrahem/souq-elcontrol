import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import routerLinks from '../app/routerLinks';
import MainAppBarLg from './MainAppBarLg';
import MainAppBarMd from './MainAppBarMd';
import './MainAppBar.scss';

const MainAppBar = () => {
  // detect route
  const { pathname } = useLocation();
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    if (pathname === routerLinks.homePage) {
      // setIsLight(true);
      setIsLight(false);
    } else {
      setIsLight(false);
    }
  }, [pathname]);

  /////////////////////////////////////////

  const [scrollY, setScrollY] = useState(
    window.scrollY || document.documentElement.scrollTop
  );
  const [scrollDir, setScrollDir] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      if ((window.scrollY || document.documentElement.scrollTop) > scrollY) {
        setScrollDir('scroll-down');
      } else {
        setScrollDir('scroll-up');
      }
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <>
      <MainAppBarLg
        exceeds0={scrollY > 0}
        className={`main-app-bar main-app-bar-lg ${
          pathname !== '/' ? 'not-home' : ''
        } ${isLight ? 'light' : 'dark'} ${scrollDir ? scrollDir : ''} ${
          scrollY > 0 ? 'exceeds0' : ''
        }`}
      />

      <MainAppBarMd
        exceeds0={scrollY > 0}
        className={`main-app-bar main-app-bar-md ${
          pathname !== '/' ? 'not-home' : ''
        } ${isLight ? 'light' : 'dark'} ${scrollDir ? scrollDir : ''} ${
          scrollY > 0 ? 'exceeds0' : ''
        }`}
      />
    </>
  );
};

export default MainAppBar;
