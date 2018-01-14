import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { ConnectedMenu } from './';

const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledContent = styled(Content)`
  padding: 50px;
  min-height: 100vh;
`;

export const MainLayout: React.SFC<{}> = ({ children }) => (
  <StyledLayout>
    <Header>
      <ConnectedMenu />
    </Header>
    <StyledContent>{children}</StyledContent>
  </StyledLayout>
);

export const AppLayout = withRouter(MainLayout);
