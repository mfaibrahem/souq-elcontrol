/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useContext } from 'react';
import { Menu, Dropdown } from 'antd';
import { CloudDownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import UserContext from '../../contexts/user-context/UserProvider';
import checkRes from '../../utils/checkRes';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import { useTranslation } from 'react-i18next';
import ChatIcon from '../../common/icons/ChatIcon';
import getAllSellerMessagesApi from '../../apis/seller-apis/getAllSellerMessagesApi';
const MainAppMessages = () => {
  const [settingsClicked, setSettingsClicked] = React.useState(false);
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
      return (
        <Menu.Item className="notifications-menu-link" key={1}>
          <div
            className="notification-content"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <LoadingOutlined style={{ fontSize: 20 }} />
          </div>
        </Menu.Item>
      );
    }
    if (allFetchedMessages?.length > 0) {
      return allFetchedMessages.map((obj) => (
        <Menu.Item className="notifications-menu-link" key={obj?.id}>
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
        </Menu.Item>
      ));
    }
    if (
      !isLoading &&
      (!allFetchedMessages || allFetchedMessages?.length === 0)
    ) {
      return (
        <Menu.Item className="notifications-menu-link" key={1}>
          <div className="notification-content">
            {i18n.language === 'ar' && 'لا توجد رسائل'}
            {i18n.language === 'en' && 'No messages'}
          </div>
        </Menu.Item>
      );
    }
    return <Menu.Item className="notifications-menu-link" key={1}></Menu.Item>;
  };

  const menu = (
    <Menu className="notifications-dropdown-ul" ref={notificationsBodyRef}>
      {renderNotificationsMenue()}
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
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
          <ChatIcon />
          {allFetchedMessages?.length > 0 && (
            <span className="active-notifications"></span>
          )}
        </div>
      </div>
    </Dropdown>
  );
};

export default MainAppMessages;
