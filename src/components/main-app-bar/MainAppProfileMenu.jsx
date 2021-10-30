import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu, Button, Avatar } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import {
  UserOutlined,
  LogoutOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import routerLinks from '../app/routerLinks';
import UserContext from '../../contexts/user-context/UserProvider';
import successNotification from '../../utils/successNotification';
import signoutApi from '../../apis/auth/signoutApi';
import errorNotification from '../../utils/errorNotification';
import checkRes from '../../utils/checkRes';
import { useTranslation } from 'react-i18next';

const MainAppProfileMenu = () => {
  const { user, removeCurrentUser } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const [loadingSignout, setLoadingSignout] = useState(false);
  const history = useHistory();
  const handleSignout = async () => {
    console.log('user  : ', user);
    try {
      setLoadingSignout(true);
      let res;
      res = await signoutApi(user?.token, i18n.language);
      if (checkRes(res)) {
        setLoadingSignout(false);
        removeCurrentUser();
        history.push(routerLinks.signinPage);

        successNotification({
          title: 'العملية تمت بنجاح',
          message: 'تم تسجيل الخروج بنجاح'
        });
      } else {
        setLoadingSignout(false);
        errorNotification({
          title: 'حدث خطأ اثناء تسجيل الخروج',
          message: 'من فضلك حاول فى وقت لاحق'
        });
      }
    } catch (error) {
      setLoadingSignout(false);
      errorNotification({
        title: 'حدث خطأ اثناء تسجيل الخروج',
        message: 'من فضلك حاول فى وقت لاحق'
      });
      console.log(error);
    }
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
          {loadingSignout ? <LoadingOutlined /> : null}
        </Button>
      </Dropdown>
    </div>
  );
};

export default MainAppProfileMenu;
