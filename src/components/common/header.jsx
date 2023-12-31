// AppHeader.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import localStorage from "../../services/localStorage";
import { MdMenu } from "react-icons/md";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import IconLogo from "./../../images/logo.png";
import CustomMenuItem from "./CustomMenuItem"; // Update the import path
import SlideMenu from "./SlideMenu"; // Import the new SlideMenu component
import UserOld from "./../../images/icon_profile_elderly_m.png";
import Eventsicon from "./../../images/icon_party_m.png";
import Logouticon from "./../../images/icon_logout_m.png";
import "./header.css";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showSlideMenu, setShowSlideMenu] = useState(false);

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const [menuItems, setMenuItems] = useState([
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <img src={UserOld} alt="Dashboard" />
    },
    {
      label: "Events",
      link: "event",
      icon: <img src={Eventsicon} alt="Events" />
    },
    {
      label: "Logout",
      link: "logout",
      icon: <img src={Logouticon} alt="Logout" />
    }
  ]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleSlideMenu = () => {
    setShowSlideMenu(!showSlideMenu);
  };

  return (
    <div className="headers">

      {/* <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Link to="/elder/dashboard">
            <div id="menuLogo">
              <img src={IconLogo} alt="Logo" />
            </div>
          </Link>

          <Menu
            className="desktop-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}
            items={
              [
                ...menuItems.map((item, index) => {
                  return {
                    key: index,
                    icon: item.icon,
                    label: item.label,
                    onClick: () => { navigate(item.link) }
                  }
                })
              ]
            }
          />
          <i className="hamburgerMenu" onClick={toggleSlideMenu}>
            {" "}
            <MdMenu className="menu-icon" size={32} />
          </i>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer
            }}
            className="hide-in-small"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <div className="main-content">
            {showSlideMenu && (
              <SlideMenu menuItems={menuItems} onClose={toggleSlideMenu} />
            )}
              <Outlet />
            </div>

          </Content>
        </Layout>
      </Layout> */}
      {/* <Outlet /> */}
    </div>
  );
};

export default AppHeader;
