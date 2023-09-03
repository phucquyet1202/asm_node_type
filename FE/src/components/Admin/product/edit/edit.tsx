import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, Space, message } from 'antd';
import SideBar from '../../sideBar/sideBar';
// import { getAllCate } from '../../../../api/category';
import { IProduct } from '../../../../interfaces/product';
import { Option } from 'antd/es/mentions';
// import { addProduct, editProduct, getById } from '../../../../api/product';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllCateQuery } from '../../../../api/category';
import { useGetOneProductQuery, useUpdateProductMutation } from '../../../../api/product';





const EditProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const { data: cate } = useGetAllCateQuery()
    const { id } = useParams();
    const { data: pro } = useGetOneProductQuery(id)
    const [update] = useUpdateProductMutation()

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
        console.log(values);
        update({ ...values, _id: id }).unwrap()
            .then(() => {
                success()
                setTimeout(() => {
                    navigate('/admin')
                }, 2000);
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        form.setFieldsValue(pro)
    }, [pro])
    return (
        <>

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
                <h1 className='text-center my-6 text-[18px]'>Cập nhật sản phẩm</h1>
                <Form.Item
                    label='Tên Sản Phẩm'
                    name='name'
                    rules={[{ required: true, message: 'Tên sản phẩm không được bỏ trống!' }]}
                >
                    <Input

                    />
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
                            <Select placeholder="Danh mục" >
                                {cate?.map((item: any) => {
                                    return (
                                        <Option value={item?._id}>{item?.name}</Option>
                                    )
                                })}

                            </Select>
                        </Form.Item>

                    </Input.Group>
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
        </>
    )
}
export default EditProduct;