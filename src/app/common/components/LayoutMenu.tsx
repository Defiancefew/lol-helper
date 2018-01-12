import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { ConnectedSearchForm } from '../../summoner/components';

export const LayoutMenu: React.SFC<{}> = () => (
  <Menu style={{ display: 'flex', lineHeight: '64px' }} theme="dark" mode="horizontal">
    <Menu.Item>
      <Link to="/">News</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/itemset">Item set</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/rune">Rune calc</Link>
    </Menu.Item>
    <Menu.Item style={{ marginLeft: 'auto', display: 'flex', background: 'none' }}>
      <ConnectedSearchForm />
    </Menu.Item>
    <Menu.Item>
      <Link to="/keycheck">
        <Icon type="login" />
      </Link>
    </Menu.Item>
  </Menu>
);
