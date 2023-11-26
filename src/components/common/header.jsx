import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import localStorage from "../../services/localStorage";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import IconLogo from "./../../images/logo.png";
import './header.css';

const { Header, Sider, Content } = Layout;
const AppHeader = () => {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();

  const [menuItems, setMenuItems] = useState([
  
    {
      label: "Dashboard",
      link: "dashboard",
      // icon: <img src={iconAdd} alt="Dashboard" />,

    },

    // {
    //   label: "Favourite Volunteers",
    //   link: "addPost"
    // },
    {
      label: "Events",
      link: "event"
    }
  ])

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/login")
  }

  return (
    <div className="headers">

      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div id="menuLogo">
            <img src={IconLogo}  />
          </div>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            items={
              [
                ...menuItems.map((item, index) => {
                  return {
                    key: index,
                    icon: <UserOutlined />,
                    label: item.label,
                    onClick: () => { navigate(item.link) }
                  }
                }), {
                  key: menuItems.length,
                  icon: <VideoCameraOutlined />,
                  label: 'Logout',
                  onClick: () => { logout() }
                }
              ]

            }
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
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AppHeader
