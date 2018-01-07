import React from 'react';
import { Layout } from 'antd';
import { LayoutMenu } from './';

const { Header, Content, Footer } = Layout;

export const AppLayout: React.SFC<any> = ({ children }) => (
  <Layout>
    <Header>
      <LayoutMenu />
    </Header>
    <Content style={{ padding: '50px', height: '100vh' }}>{children}</Content>
  </Layout>
);
