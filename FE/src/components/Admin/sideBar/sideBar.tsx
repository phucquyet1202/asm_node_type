import React from 'react'
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Navigate, useNavigate } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';

const SideBar = () => {
    const navigate = useNavigate()
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            // onBreakpoint={(broken) => {
            //     console.log(broken);
            // }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
            // items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            //     (icon, index) => ({
            //         key: String(index + 1),
            //         icon: React.createElement(icon),
            //         label: `nav ${index + 1}`,
            //     }),
            // )}
            >
                <Menu.Item onClick={() => navigate('/admin')}>Điện thoại</Menu.Item>
                <Menu.Item onClick={() => navigate('/admin/cate')}>Danh mục</Menu.Item>
                <Menu.Item >Máy tính</Menu.Item>
                <Menu.Item >Âm thanh</Menu.Item>

            </Menu>

        </Sider>

    )
}

export default SideBar