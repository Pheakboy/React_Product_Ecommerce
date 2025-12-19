import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  HomeOutlined,
  FolderOutlined,
  TeamOutlined,
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
  Modal,
  Form,
  Input,
  message,
  Card,
  Statistic,
  Row,
  Col,
} from "antd";
import { useAuth } from "../contexts/AuthContext";
import { usePortfolio } from "../contexts/PortfolioContext";
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
  getItem("Dashboard", "dashboard", <HomeOutlined />),
  getItem("Users", "users", <TeamOutlined />),
  getItem("Portfolio", "portfolio", <FolderOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();




  const {
    portfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
  } = usePortfolio();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fetch user data from Firestore collection
  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        const collectionRef = collection(db, "user");
        const querySnapshot = await getDocs(collectionRef);

        const dataList = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          id: doc.id,
          ...doc.data(),
        }));

        setUserData(dataList);
        console.log("✅ Firestore user data:", dataList);
      } catch (error) {
        console.error("Error fetching user data:", error);
        message.error("Failed to fetch user data");
      }
    };

    fetchFirestoreData();
  }, []);


  // User table columns configuration
  const userColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text || "-"}</span>,
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
        <Space size="small">
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" danger size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Portfolio table columns configuration
  const portfolioColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: 300,
    },
    {
      title: "Technologies",
      dataIndex: "tech",
      key: "tech",
      render: (tech) => (
        <span>{Array.isArray(tech) ? tech.join(", ") : tech || "-"}</span>
      ),
      width: 250,
    },
    {
      title: "Stats",
      dataIndex: "stats",
      key: "stats",
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
  };

  const handleAddPortfolioItem = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Portfolio Item",
      content: "Are you sure you want to delete this item?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deletePortfolioItem(id);
          message.success("Portfolio item deleted successfully");
        } catch (error) {
          message.error("Failed to delete portfolio item");
          console.error("Error deleting portfolio item:", error);
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingItem) {
        // Update existing item
        await updatePortfolioItem(editingItem.id, values);
        message.success("Portfolio item updated successfully");
      } else {
        // Add new item
        await addPortfolioItem(values);
        message.success("Portfolio item added successfully");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingItem(null);
    } catch (error) {
      console.error("Error saving portfolio item:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: user?.email || "User",
      disabled: true,
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

  // Render Dashboard Overview
  const renderDashboard = () => (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
          Welcome back, {user?.name || user?.email || "User"}!
        </h2>
        <p style={{ color: "#666" }}>Here's your dashboard overview</p>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={userData.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Portfolio Items"
              value={portfolioItems.length}
              prefix={<FolderOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Projects"
              value={userData.length + portfolioItems.length}
              prefix={<DesktopOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Render Users Page
  const renderUsersPage = () => (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                margin: 0,
                marginBottom: "4px",
              }}
            >
              Users Management
            </h2>
            <p style={{ color: "#666", margin: 0 }}>
              Manage user data from Firestore
            </p>
          </div>
        </div>
      </div>
      <Card>
        <Table
          columns={userColumns}
          dataSource={userData}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );

  // Render Portfolio Page
  const renderPortfolioPage = () => (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 600,
                margin: 0,
                marginBottom: "4px",
              }}
            >
              Portfolio Management
            </h2>
            <p style={{ color: "#666", margin: 0 }}>
              Create, edit, and manage portfolio items
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddPortfolioItem}
          >
            Add New Item
          </Button>
        </div>
      </div>
      <Card>
        <Table
          columns={portfolioColumns}
          dataSource={portfolioItems}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );

  // Determine breadcrumb items
  const getBreadcrumbItems = () => {
    const breadcrumbMap = {
      dashboard: [{ title: "Home" }, { title: "Dashboard" }],
      users: [{ title: "Home" }, { title: "Users" }],
      portfolio: [{ title: "Home" }, { title: "Portfolio" }],
    };
    return (
      breadcrumbMap[currentPage] || [{ title: "Home" }, { title: "Dashboard" }]
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: "#001529" }}
      >
        <div
          style={{ padding: "16px", textAlign: "center", marginBottom: "16px" }}
        >
          <h3
            style={{
              color: "white",
              margin: 0,
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            Admin
          </h3>
        </div>
        <Menu
          theme="dark"
          selectedKeys={[currentPage]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
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
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <div />
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Space style={{ cursor: "pointer" }}>
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <span style={{ fontWeight: 500 }}>
                {user?.name || user?.email || "User"}
              </span>
            </Space>
          </Dropdown>
        </AntHeader>
        <Content style={{ margin: "24px 24px 0" }}>
          <Breadcrumb
            style={{ marginBottom: "24px" }}
            items={getBreadcrumbItems()}
          />
          <div
            style={{
              padding: "24px",
              minHeight: "calc(100vh - 200px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            {currentPage === "dashboard" && renderDashboard()}
            {currentPage === "users" && renderUsersPage()}
            {currentPage === "portfolio" && renderPortfolioPage()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ margin: 0, color: "#999" }}>
            © 2024 Admin Dashboard. All rights reserved.
          </p>
        </Footer>
      </Layout>

      {/* Portfolio Item Modal */}
      <Modal
        title={editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
          setEditingItem(null);
        }}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please enter the project title" },
            ]}
          >
            <Input placeholder="e.g., AI Task Manager" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Describe your project..." />
          </Form.Item>

          <Form.Item
            label="Technologies (comma separated)"
            name="tech"
            rules={[{ required: true, message: "Please enter technologies" }]}
            getValueFromEvent={(e) => {
              const value = e.target.value;
              return value.split(",").map((tech) => tech.trim());
            }}
          >
            <Input placeholder="e.g., React, Node.js, MongoDB" />
          </Form.Item>

          <Form.Item
            label="Statistics"
            name="stats"
            rules={[{ required: true, message: "Please enter statistics" }]}
          >
            <Input placeholder="e.g., 15K+ Users" />
          </Form.Item>

          <Form.Item label="Link (optional)" name="link">
            <Input placeholder="e.g., https://example.com" />
          </Form.Item>

          <Form.Item label="Gradient Class (optional)" name="gradient">
            <Input placeholder="e.g., from-blue-500 to-cyan-500" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
