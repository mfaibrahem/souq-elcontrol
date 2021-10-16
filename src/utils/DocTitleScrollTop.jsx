import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DocTitleScrollTop = (docTitle) => {
  const { pathname } = useLocation();
  return useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${docTitle ? `${docTitle} |` : ''} ${
      process.env.REACT_APP_TITLE
    }`;

    return () => {
      document.title = process.env.REACT_APP_TITLE;
    };
  }, [docTitle, pathname]);
};

export default DocTitleScrollTop;
