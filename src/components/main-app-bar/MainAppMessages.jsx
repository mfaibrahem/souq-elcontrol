/* eslint-disable react-hooks/exhaustive-deps */
import { CloudDownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import getAllSellerMessagesApi from '../../apis/seller-apis/getAllSellerMessagesApi';
import ChatIcon from '../../common/icons/ChatIcon';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import UserContext from '../../contexts/user-context/UserProvider';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
const MainAppMessages = ({ isAppbarMd = false }) => {
  const [settingsClicked] = React.useState(false);
  const notificationsBodyRef = useRef(null);

  const { user } = useContext(UserContext);
  const { i18n } = useTranslation();
  const {
    isLoading,
    setIsLoading,
    allFetchedMessages,
    setAllFetchedMessages,
    fetchCount,
    setFetchCount
  } = useContext(ContactSellerContext);

  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getAllSellerMessagesApi(null, user?.token, i18n.language),
        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data)
            setAllFetchedMessages(res.data.data);
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [fetchCount, user]);

  const renderNotificationsMenue = () => {
    if (isLoading) {
      return [
        {
          key: 1,
          label: (
            <div
              className="notification-content"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <LoadingOutlined style={{ fontSize: 20 }} />
            </div>
          )
        }
      ];
    }
    if (allFetchedMessages?.length > 0) {
      return allFetchedMessages.map((obj) => ({
        key: obj?.id,
        className: 'notifications-menu-link',
        label: (
          <div className="notification-content">
            {obj?.store?.name ? (
              <p
                className={`notification-title ${
                  i18n.dir() === 'ltr' ? 'ltr' : 'rtl'
                }`}
              >
                {' '}
                {obj.store.name}
              </p>
            ) : (
              ''
            )}
            <div className="notification-data">
              {obj?.message ? (
                <div className="notification-message">{obj.message}</div>
              ) : (
                ''
              )}

              {obj?.file ? (
                <a href={obj.file} target="_blank" rel="noreferrer">
                  <CloudDownloadOutlined
                    style={{
                      fontSize: 18
                    }}
                  />
                </a>
              ) : (
                ''
              )}
            </div>
          </div>
        )
      }));
    }
    if (
      !isLoading &&
      (!allFetchedMessages || allFetchedMessages?.length === 0)
    ) {
      return [
        {
          key: 19,
          className: 'notifications-menu-link',
          label: (
            <div className="notification-content">
              {i18n.language === 'ar' && 'لا توجد رسائل'}
              {i18n.language === 'en' && 'No messages'}
            </div>
          )
        }
      ];
    }
    return <Menu.Item className="notifications-menu-link" key={1}></Menu.Item>;
  };

  return (
    <Dropdown
      className="notifications-dropdown-ul"
      menu={{
        items: renderNotificationsMenue()
      }}
      trigger={['click']}
      arrow
      placement="bottomLeft"
      overlayClassName="notifications-dropdown-wrap"
    >
      <div
        className="main-app-notifications"
        onClick={() => {
          setFetchCount((prev) => prev + 1);
        }}
      >
        <div
          className={`notification-btn-wrap ${
            settingsClicked ? 'clicked' : ''
          }`}
        >
          {isAppbarMd ? (
            <>
              <ChatIcon />
              {allFetchedMessages?.length > 0 && (
                <span className="active-notifications"></span>
              )}
              {i18n.language === 'ar' && 'الرســائل '}
              {i18n.language === 'en' && 'Messages '}
            </>
          ) : (
            <>
              <ChatIcon />
              {allFetchedMessages?.length > 0 && (
                <span className="active-notifications"></span>
              )}
            </>
          )}
        </div>
      </div>
    </Dropdown>
  );
};

export default MainAppMessages;
