import React from 'react';
import {
  UserOutlined,
  SafetyOutlined,
  IssuesCloseOutlined,
  MailOutlined,
  KeyOutlined,
  LockOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { userViewEnum } from '../config';

interface UserMenuProperties {
  userID: number;
  view: userViewEnum;
}

const UserMenu = ({ userID, view }: UserMenuProperties) => (
  <Menu defaultSelectedKeys={[view]}>
    <Menu.Item key='profile' icon={<UserOutlined />}>
      <Link to={`/admin/users/${userID}`}>
        Profile
      </Link>
    </Menu.Item>
    <Menu.Item key='roles' icon={<SafetyOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Roles
      </Link>
    </Menu.Item>
    <Menu.Item key='status-log' icon={<IssuesCloseOutlined />}>
      <Link to={`/admin/users/${userID}/status-log`}>
        Status Log
      </Link>
    </Menu.Item>
    <Menu.Item key='emails-sent' icon={<SendOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Emails Sent
      </Link>
    </Menu.Item>
    <Menu.Item key='emails-log' icon={<MailOutlined />}>
      <Link to={`/admin/users/${userID}/emails-log`}>
        Emails Log
      </Link>
    </Menu.Item>
    <Menu.Item key='passwords-log' icon={<LockOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Passwords Log
      </Link>
    </Menu.Item>
    <Menu.Item key='tokens' icon={<KeyOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Tokens
      </Link>
    </Menu.Item>
  </Menu>
);

export default UserMenu;
