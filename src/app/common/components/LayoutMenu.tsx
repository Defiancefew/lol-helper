import React from 'react';
import { Menu, Icon } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IStore } from 'models';
import { ConnectedSearchForm } from '../../summoner/components';
import { toggleModal } from '../../options';

const StyledIcon = styled(Icon)`
  margin-left: 10px;
`;

export interface ILayoutMenuProps {
  toggleModal: typeof toggleModal;
  isApiChecked: boolean;
}

// Inlining styles since some parts of antd can't be styled with styled-components
export const LayoutMenu: React.SFC<ILayoutMenuProps> = ({ toggleModal, isApiChecked }) => (
  <Menu style={{ display: 'flex', lineHeight: '64px' }} theme="dark" mode="horizontal">
    <Menu.Item>
      <Link to="/">Home</Link>
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
    <Menu.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span onClick={() => toggleModal(true)}>
        {isApiChecked ? 'Authorized' : 'Unauthorized'}
        <StyledIcon type="setting" />
      </span>
    </Menu.Item>
  </Menu>
);

export const ConnectedMenu = connect(({ auth }: IStore) => ({ isApiChecked: auth.isApiChecked }), { toggleModal })(
  LayoutMenu,
);
