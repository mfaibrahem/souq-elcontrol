import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getAboutUsApi from '../../apis/homepage/aboutUsApi';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';

const INITIAL_VALUES = {
  isLoadingGeneralSettings: false,
  setIsLoadingGeneralSettings: (v) => {},
  fetchGeneralSettingsCount: 0,
  setFetchGeneralSettingsCount: (v) => {},
  fetchedGeneralSettings: null,
  setFetchedGeneralSettings: (v) => {}
};

const GeneralSettingsContext = createContext(INITIAL_VALUES);

export const GeneralSettingsProvider = ({ children }) => {
  const customApiRequest = useCustomApiRequest();
  const { i18n } = useTranslation();
  const [isLoadingGeneralSettings, setIsLoadingGeneralSettings] = useState(
    INITIAL_VALUES?.isLoadingGeneralSettings
  );
  const [fetchGeneralSettingsCount, setFetchGeneralSettingsCount] = useState(
    INITIAL_VALUES?.fetchGeneralSettingsCount
  );
  const [fetchedGeneralSettings, setFetchedGeneralSettings] = useState(
    INITIAL_VALUES?.fetchedGeneralSettings
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingGeneralSettings(true);
      customApiRequest(
        getAboutUsApi(i18n.language),

        (res) => {
          setIsLoadingGeneralSettings(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedGeneralSettings(res.data.data);
          }
        },
        (error) => {
          setIsLoadingGeneralSettings(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  return (
    <GeneralSettingsContext.Provider
      value={{
        isLoadingGeneralSettings,
        setIsLoadingGeneralSettings,
        fetchGeneralSettingsCount,
        setFetchGeneralSettingsCount,
        fetchedGeneralSettings,
        setFetchedGeneralSettings
      }}
    >
      {children}
    </GeneralSettingsContext.Provider>
  );
};

export default GeneralSettingsContext;
