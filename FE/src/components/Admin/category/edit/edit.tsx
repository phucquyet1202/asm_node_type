import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, Space, message } from 'antd';
import SideBar from '../../sideBar/sideBar';

import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
import ICategory from '../../../../interfaces/category';
import { useGetOneCateQuery, useUpdateCateMutation } from '../../../../api/category';
// import { editCate, getCateById } from '../../../../api/category';





const EditCategory = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: cate } = useGetOneCateQuery(id)
    const [update] = useUpdateCateMutation()
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
    useEffect(() => {
        form.setFieldsValue(cate)
    }, [cate]);

    const onFinish = async (values: ICategory) => {
        update({ ...values, _id: id }).unwrap()
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
                form={form}
                name='basic'
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                className='w-2/3 mx-auto'
            >
                <h1 className='text-center my-6 text-[18px]'>Cập nhật Danh Mục</h1>
                <Form.Item
                    label='Tên thương hiệu'
                    name='name'
                    rules={[{ required: true, message: 'Tên thương hiệu không được bỏ trống!' }]}
                >
                    <Input

                    />
                </Form.Item>
                <Form.Item
                    label='Tên Danh mục'
                    name='slug'
                    rules={[{ required: true, message: 'Tên danh mục không được bỏ trống!' }]}
                >
                    <Input

                    />
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
export default EditCategory;