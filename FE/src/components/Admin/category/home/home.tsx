import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Image, Layout, Menu, Popconfirm, Space, Table, Tag, message, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../../sideBar/sideBar';
import ICategory from '../../../../interfaces/category';
import { IProduct } from '../../../../interfaces/product';
import { useGetAllCateQuery, useRemoveCateMutation } from '../../../../api/category';
const HomeCategory = () => {
    const navigate = useNavigate()
    const { Header, Content, Footer, Sider } = Layout;
    interface DataType {

        _id: string;
        name: string;
    }
    const { data: cate } = useGetAllCateQuery()
    const [deleCate] = useRemoveCateMutation()
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };

    const checkDelete = async (id: string) => {
        deleCate(id).unwrap()
            .then(() => success())
    }



    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: "key",
            key: 'key',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên danh mục',
            dataIndex: "name",
            key: 'name',
        },


        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                { contextHolder } &&
                <Space size="middle">

                    <Button type="primary" onClick={() => navigate(`/admin/cate/edit/${record._id}`)} className='mx-[-40px]  bg-blue-600'>
                        Edit
                    </Button>
                    <Popconfirm className='bg-blue-600'
                        placement="right"
                        title='Bạn có chắc chắn muốn xóa sản phẩm không'
                        description='Xóa là nghỉ luôn đấy'
                        onConfirm={() => checkDelete(record._id)}
                        okText="Yes"
                        okButtonProps={{ style: { backgroundColor: '#007bff', color: 'white' } }}
                        cancelButtonProps={{ style: { backgroundColor: '#dc3545', color: 'white' } }}
                        cancelText="No"
                    >

                        <Button type="primary" danger className='mx-4'>Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();



    return (
        <Layout className='h-full'>



            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '24px 16px 0' }}>
                <Button onClick={() => navigate('/admin/cate/add')}>Them moi</Button>
                <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={cate} />
            </Content>
        </Layout>
    );
};

export default HomeCategory;


