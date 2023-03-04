import React, { useContext } from 'react';
import { Dropdown, Menu, Button, Avatar } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import routerLinks from '../app/routerLinks';
import UserContext from '../../contexts/user-context/UserProvider';
import useSignout from '../../custom-hooks/useSignout';
import { useTranslation } from 'react-i18next';

const MainAppProfileMenu = () => {
  const { user } = useContext(UserContext);
  const { i18n } = useTranslation();
  const { isLoadingSignout, signMeOut } = useSignout();
  const handleSignout = () => {
    signMeOut();
  };
  return (
    <div className="avatar-wrapper">
      <Dropdown
        arrow
        trigger={['click']}
        // disabled={loadingSignout}
        menu={{
          items: [
            {
              key: 1,
              icon: <UserOutlined />,
              label: (
                <RouterLink to={routerLinks.profilePage}>
                  {i18n?.language === 'ar' ? 'الملف الشخصي' : 'profile'}
                </RouterLink>
              )
            },
            {
              key: 2,
              icon: <LogoutOutlined />,
              onClick: handleSignout,
              label: i18n.language === 'ar' ? 'تسجيل الخروج' : 'Signout'
            }
          ]
        }}
      >
        <Button className="profile-menu-btn" type="text">
          <Avatar size={40} icon={<UserOutlined />} src={user?.image} />
          {isLoadingSignout ? <LoadingOutlined /> : null}
        </Button>
      </Dropdown>
    </div>
  );
};

export default MainAppProfileMenu;
