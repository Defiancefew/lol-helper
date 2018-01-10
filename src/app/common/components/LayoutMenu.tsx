import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export const LayoutMenu: React.SFC<any> = () => (
  <Menu style={{ display: 'flex', lineHeight: '64px' }} theme="dark" mode="horizontal">
    <Menu.Item>
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/summoner">Summoner</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/itemset">Item set</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/rune">Rune calc</Link>
    </Menu.Item>

    <Menu.Item style={{ marginLeft: 'auto' }}>
      <Link to="/keycheck">
        <Icon type="login" />
      </Link>
    </Menu.Item>
  </Menu>
);
