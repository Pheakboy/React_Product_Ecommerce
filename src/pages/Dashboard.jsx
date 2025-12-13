import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Dropdown,
  Avatar,
  Space,
  Table,
} from "antd";
import { useAuth } from "../contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const { Header: AntHeader, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fetch data from Firestore collection
  useEffect(() => {
    const fetchFirestoreData = async () => {
      // Change "user" to your collection name
      const collectionRef = collection(db, "user");
      const querySnapshot = await getDocs(collectionRef);

      const dataList = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        id: doc.id,
        ...doc.data(),
      }));

      setData(dataList);
      console.log("✅ Firestore data:", dataList);
    };

    fetchFirestoreData();
  }, []);

  // Table columns configuration
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text || "-"}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>View</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: user?.email || "User",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <AntHeader
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600 }}>
            Dashboard
          </h2>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <span>{user?.name || user?.email || "User"}</span>
            </Space>
          </Dropdown>
        </AntHeader>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "Home" }, { title: "Dashboard" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <p
              style={{ color: "#666", fontSize: "16px", marginBottom: "24px" }}
            >
              Data from Firestore Collection
            </p>

            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
