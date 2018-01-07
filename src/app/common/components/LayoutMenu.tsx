import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const LayoutMenu: React.SFC<any> = () => (
  <Menu theme="dark" mode="horizontal">
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/keycheck">Auth</Link>
    </Menu.Item>
  </Menu>
);
