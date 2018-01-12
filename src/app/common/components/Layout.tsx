import React from 'react';
import { Layout } from 'antd';
import { LayoutMenu } from './';

const { Header, Content, Footer } = Layout;

export const AppLayout: React.SFC<{}> = ({ children }) => (
  <Layout style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <Header>
      <LayoutMenu />
    </Header>
    <Content style={{ padding: '50px', minHeight: '100vh' }}>{children}</Content>
  </Layout>
);
