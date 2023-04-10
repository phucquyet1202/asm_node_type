import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Image, Layout, Menu, Popconfirm, Space, Table, Tag, message, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../../sideBar/sideBar';
import { deleteCate, getAllCate } from '../../../../api/category';
import ICategory from '../../../../interfaces/category';
import { IProduct } from '../../../../interfaces/product';
import { getAll } from '../../../../api/product';
const HomeCategory: React.FC = () => {
    const navigate = useNavigate()
    const { Header, Content, Footer, Sider } = Layout;
    interface DataType {
        key: string;
        name: string;

    }



    const checkDelete = async (id: string) => {
        try {
            const data = await deleteCate(id)
            if (data) {
                message.success('xóa thành công')
                setTimeout(() => {
                    navigate("/admin/cate")
                    window.location.reload()
                }, 1000);
            } else {
                throw new Error('xóa sản phẩm thất bại')
            }

        } catch (error: any) {
            message.error(error.message)
        }
    }



    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: "index",
            key: 'index',
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
                <Space size="middle">

                    <Button type="primary" onClick={() => navigate(`/admin/cate/edit/${record.key}`)} className='mx-[-40px]  bg-blue-600'>
                        Edit
                    </Button>
                    <Popconfirm className='bg-blue-600'
                        placement="right"
                        title='Bạn có chắc chắn muốn xóa sản phẩm không'
                        description='Xóa là nghỉ luôn đấy'
                        onConfirm={() => checkDelete(record.key)}
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

    const [cate, setCate] = useState<DataType[]>([]);

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await getAllCate();

            setCate(
                data.map((item: ICategory, index: number) => {
                    return {
                        key: item._id,
                        index: index + 1,
                        name: item.name,

                    }
                }))
        }

        fetchProduct()
    }, [])

    console.log(cate);

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


