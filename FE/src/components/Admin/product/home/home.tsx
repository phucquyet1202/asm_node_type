import React, { useEffect, useState } from 'react';
import { Button, Image, Layout, Menu, Popconfirm, Space, Table, Tag, message, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../../../interfaces/product';
import { Link, useNavigate } from 'react-router-dom';
import AddProduct from '../add/addproduct';
import SideBar from '../../sideBar/sideBar';
import { useGetAllProductQuery, useRemoveProductMutation } from '../../../../api/product';
const HomeProduct = () => {

    const navigate = useNavigate()
    const { Header, Content, Footer, Sider } = Layout;
    interface DataType {
        _id: string;
        name: string;
        price: number;
        images: any[];
        short_description: string;
        brand: any
    }

    const { data: products } = useGetAllProductQuery()
    const [removePro] = useRemoveProductMutation()
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
        removePro(id).unwrap()
            .then(() => success());
    }


    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên sản phẩm',
            dataIndex: "name",
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: "images",
            key: 'images',
            render: (text: any) => <Image width={100} src={text?.[0]?.base_url} />,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Mô tả',
            dataIndex: 'short_description',
            key: 'short_description',
        },
        {
            title: 'Danh mục',
            dataIndex: 'brand',
            key: 'brand',
            render: (text: any) => <p>{text.name}</p>,

        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Button type="primary" onClick={() => navigate(`/admin/edit/${record._id}`)} className='bg-blue-600'>
                        Edit
                    </Button>
                    {contextHolder}
                    <Space>
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
                            <Button type="primary" danger>Delete</Button>
                        </Popconfirm>
                    </Space>
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
                <Button onClick={() => navigate('/admin/add')}>Them moi</Button>
                <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={products} />
            </Content>
        </Layout>
    );
};

export default HomeProduct;


