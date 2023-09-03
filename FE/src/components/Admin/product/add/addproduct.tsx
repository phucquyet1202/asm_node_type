import React from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, Space, message } from 'antd';
import SideBar from '../../sideBar/sideBar';
import { IProduct } from '../../../../interfaces/product';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import ICategory from '../../../../interfaces/category';
import { useGetAllCateQuery } from '../../../../api/category';
import { useAddProductMutation } from '../../../../api/product';
const AddProduct = () => {
    const navigate = useNavigate()
    const { data: cate } = useGetAllCateQuery()
    const [addproduct] = useAddProductMutation()
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
    const onFinish = (values: IProduct) => {
        addproduct(values)
            .unwrap()
            .then(() => {
                success()
                setTimeout(() => {
                    navigate('/admin')
                }, 5000);
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className='h-full'>


            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='w-2/3 mx-auto'
            >
                <h1 className='text-center my-6 text-[18px]'>Thêm mới sản phẩm</h1>
                <Form.Item
                    label="Tên Sản Phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Tên sản phẩm ko được bỏ trống!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá gốc"
                    name="price"
                    rules={[{ required: true, message: 'Giá sản phẩm không được bỏ trông' }]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item
                    label="Giá bán"
                    name="original_price"
                    rules={[{ required: true, message: 'Giá bán không được bỏ trống' }]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Ảnh sp"
                    name={["images", 0, "base_url"]}
                    rules={[{ required: true, message: 'Ảnh sản phẩm không được bỏ trống' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="mô tả"
                    name="short_description"
                    rules={[{ required: true, message: 'Mô tả sản phẩm không được bỏ trốngtrống' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Danh mục">
                    <Input.Group compact>
                        <Form.Item
                            label='Danh Mục'
                            noStyle
                            name="brand"
                            rules={[{ required: true, message: 'Province is required' }]}
                        >
                            <Select placeholder="Danh mục">
                                {cate?.map((item: any) => {
                                    return (
                                        <Option value={item._id}>{item.name}</Option>
                                    )
                                })}

                            </Select>
                        </Form.Item>

                    </Input.Group>
                </Form.Item>

                {contextHolder}
                <Space>
                    <Form.Item wrapperCol={{ offset: 11, span: 16 }} >
                        <Button type="primary" htmlType="submit" className='bg-blue-500'>
                            Submit
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </Layout>
    )
}
export default AddProduct;