import React from "react";
import {
  CodeOutlined,
  DatabaseFilled,
  GithubFilled,
  HomeOutlined,
  LaptopOutlined,
  PhoneOutlined,
  
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import "./App.css";

const { Header, Content, Sider } = Layout;

const navItems: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined style={{color: "white"}}/>,
  },
  {
    label: "Skills",
    key: "skills",
    icon: <DatabaseFilled />
  },
  { 
    label: "Personal Projects", 
    key: "personal projects",
    icon: <CodeOutlined style={{color: "white"}}/>,
  },
  { 
    label: "Work Experience", 
    key: "work",
    icon: <LaptopOutlined style={{color: "white"}}/>
  },
  { 
    label: "Contact Me", 
    key: "contact",
    icon: <PhoneOutlined style={{color: "white"}}/>
  },
];

const redirectToGithub = () => {
  window.open("https://github.com/jordanburdett");
}

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <GithubFilled style={{color: "white", fontSize: "26px", marginRight: "15px"}} onClick={redirectToGithub}/>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={navItems}
        />
      </Header>
    </Layout>
  );
};

export default App;
