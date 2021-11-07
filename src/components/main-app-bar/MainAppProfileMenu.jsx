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

const MainAppProfileMenu = () => {
  const { user } = useContext(UserContext);

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
        overlay={
          <Menu>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <RouterLink to={routerLinks.profilePage}>
                الملــف الشخصى
              </RouterLink>
            </Menu.Item>

            <Menu.Item
              key="3"
              icon={<LogoutOutlined />}
              onClick={handleSignout}
            >
              تسجيل الخروج
            </Menu.Item>
          </Menu>
        }
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
