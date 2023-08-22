import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, message } from 'antd';
import SideBar from '../../sideBar/sideBar';

import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
import ICategory from '../../../../interfaces/category';
import { editCate, getCateById } from '../../../../api/category';





const EditCategory = () => {
    const [cate, setCate] = useState<ICategory>({} as ICategory);
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>();



    const getCategory = async () => {
        if (id) {
            const { data } = await getCateById(id);
            setCate(data);
            form.setFieldsValue(data); // cập nhật giá trị của form khi pro thay đổi
        }
    };

    useEffect(() => {
        getCategory();
    }, [id]);

    const onFinish = async (values: ICategory,) => {
        console.log(values);
        if (id) {
            try {
                const { data } = await editCate(values, id);
                if (data) {
                    message.success('Cập nhật sản phẩm thành công')
                    setTimeout(() => {
                        navigate('/admin/cate')
                    }, 1000)
                } else {
                    message.error('Cập nhật sản phẩm thất bại')
                }
            } catch (error: any) {
                message.error(error.message)
            }
        }


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
                        value={cate.name}

                    />
                </Form.Item>
                <Form.Item
                    label='Tên Danh mục'
                    name='slug'
                    rules={[{ required: true, message: 'Tên danh mục không được bỏ trống!' }]}
                >
                    <Input
                        value={cate.name}

                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 16 }} >
                    <Button type="primary" htmlType="submit" className='bg-blue-500'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}
export default EditCategory;