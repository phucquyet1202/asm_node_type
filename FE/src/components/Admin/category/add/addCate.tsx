import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, Space, message } from 'antd';
import SideBar from '../../sideBar/sideBar';
// import { addCate, getAllCate } from '../../../../api/category';
import { IProduct } from '../../../../interfaces/product';
import { Option } from 'antd/es/mentions';
// import { addProduct } from '../../../../api/product';
import { useNavigate } from 'react-router-dom';
import ICategory from '../../../../interfaces/category';
import { useAddCateMutation } from '../../../../api/category';

const AddCategory = () => {
    const navigate = useNavigate()
    const [addCate] = useAddCateMutation()
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
    const onFinish = (values: ICategory) => {
        addCate(values).unwrap()
            .then(() => {
                success()
                setTimeout(() => {
                    navigate('/admin/cate')
                }, 2000);
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
                <h1 className='text-center my-6 text-[18px]'>Thêm mới danh mục</h1>
                <Form.Item
                    label="Tên Thương hiệu"
                    name="name"
                    rules={[{ required: true, message: 'Tên Thương hiệu ko được bỏ trống!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên danh mục"
                    name="slug"
                    rules={[{ required: true, message: 'Tên danh mục ko được bỏ trống!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 16 }} >
                    {contextHolder}
                    <Space>
                        <Button type="primary" htmlType="submit" className='bg-blue-500'>
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Layout>
    )
}
export default AddCategory;