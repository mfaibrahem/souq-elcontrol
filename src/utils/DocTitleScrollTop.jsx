import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DocTitleScrollTop = (docTitle) => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  return useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${docTitle ? `${docTitle} |` : ''} ${
      i18n.language === 'en'
        ? process.env.REACT_APP_TITLE
        : process.env.REACT_APP_TITLE_AR
    }`;

    return () => {
      document.title =
        i18n.language === 'en'
          ? process.env.REACT_APP_TITLE
          : process.env.REACT_APP_TITLE_AR;
    };
  }, [docTitle, pathname, i18n.language]);
};

export default DocTitleScrollTop;
