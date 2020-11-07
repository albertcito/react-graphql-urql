import React from 'react';
import {
  UserOutlined,
  SafetyOutlined,
  IssuesCloseOutlined,
  MailOutlined,
  KeyOutlined,
  PullRequestOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

interface UserMenuProperties {
  userID: number;
}

const UserMenu = ({ userID }: UserMenuProperties) => (
  <Menu>
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
      <Link to={`/admin/users/${userID}/roles`}>
        Status Log
      </Link>
    </Menu.Item>
    <Menu.Item key='email-log' icon={<MailOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Email Log
      </Link>
    </Menu.Item>
    <Menu.Item key='tokens' icon={<KeyOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Tokens
      </Link>
    </Menu.Item>
    <Menu.Item key='connections' icon={<PullRequestOutlined />}>
      <Link to={`/admin/users/${userID}/roles`}>
        Connections
      </Link>
    </Menu.Item>
  </Menu>
);

export default UserMenu;
