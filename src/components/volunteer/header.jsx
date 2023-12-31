import { useState } from "react";
import { useNavigate } from "react-router-dom";

import  { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import IconLogo from "./../../images/logo.png";
const { Header, Sider, Content } = Layout;
const AppHeader = () => {


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/login")
  }

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }} = theme.useToken();

  return (
    <div className="headers">
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <img src={IconLogo}/>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Dashboard',
                onClick: ()=> { navigate('dashboard')}
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: 'Profile',
                onClick: ()=> { navigate('Profile')}
              },
              // {
              //   key: '3',
              //   icon: <UserOutlined />,
              //   label: 'History',
              //   onClick: ()=> { navigate('history')}
              // },
              
              {
                key: "4",
                icon: <UserOutlined/>,
                label: "Events",
                onClick: () => {navigate('event')}
              },
              {
                key: "5",
                icon: <UserOutlined/>,
                label: "Rewards",
                onClick: () => {navigate('rewards')}
              },
              {
                key: '6',
                icon: <VideoCameraOutlined />,
                label: 'Logout',
                onClick: ()=> { logout()}
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AppHeader
