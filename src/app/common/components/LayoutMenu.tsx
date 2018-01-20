import React from 'react';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ConnectedSearchForm } from '../../summoner/components';
import { toggleModal } from '../../options';

const StyledIcon = styled(Icon)`
  margin-left: 10px;
`;

// Inlining styles since some parts of antd can't be styled with styled-components
export const LayoutMenu: React.SFC<any> = ({ toggleModal }) => (
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
        <StyledIcon type="login" />
      </Link>
    </Menu.Item>
    <Menu.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span onClick={() => toggleModal(true)}>
        <StyledIcon type="setting" />
      </span>
    </Menu.Item>
  </Menu>
);

export const ConnectedMenu = connect(null, { toggleModal })(LayoutMenu);
