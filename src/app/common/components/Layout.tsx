import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { LayoutMenu } from './';

const { Header, Content, Footer } = Layout;

export const MainLayout: React.SFC<{}> = ({ children }) => (
  <Layout style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <Header>
      <LayoutMenu />
    </Header>
    <Content style={{ padding: '50px', minHeight: '100vh' }}>{children}</Content>
  </Layout>
);

export const AppLayout = withRouter(MainLayout);
