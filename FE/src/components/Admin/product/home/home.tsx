import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Image, Layout, Menu, Popconfirm, Space, Table, Tag, message, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../../../interfaces/product';
import { deleProduct, getAll } from '../../../../api/product';
import { Link, useNavigate } from 'react-router-dom';
import AddProduct from '../add/addproduct';
import SideBar from '../../sideBar/sideBar';
const HomeProduct: React.FC = () => {

    const navigate = useNavigate()
    const { Header, Content, Footer, Sider } = Layout;
    interface DataType {
        key: string;
        name: string;
        price: number;
        images: string[];
        short_description: string;
    }


    const checkDelete = async (id: string) => {
        try {
            const data = await deleProduct(id)
            if (data) {
                message.success('xóa thành công')
                setTimeout(() => {
                    navigate("/admin")
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
            title: 'Tên sản phẩmphẩm',
            dataIndex: "name",
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: "images",
            key: 'images',
            render: (text: string) => <Image width={100} src={text} />,
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
            dataIndex: 'categoryId',
            key: 'categoryId',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <Button type="primary" onClick={() => navigate(`/admin/edit/${record.key}`)} className='bg-blue-600'>
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
                        <Button type="primary" danger>Delete</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [products, setProducts] = useState<DataType[]>([]);

    const getProductData = async () => {
        const { data }: any = await getAll();
        setProducts(data.map((item: IProduct) => {

            return {
                key: item._id,
                name: item.name,
                price: item.price,
                short_description: item.short_description,
                images: item.images[0].base_url,
                categoryId: item.brand?.name
            }
        }));

    };

    useEffect(() => {
        getProductData();
    }, []);
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


