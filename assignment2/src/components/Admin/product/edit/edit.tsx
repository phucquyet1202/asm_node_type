import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Select, message } from 'antd';
import SideBar from '../../sideBar/sideBar';
import { getAllCate } from '../../../../api/category';
import { IProduct } from '../../../../interfaces/product';
import { Option } from 'antd/es/mentions';
import { addProduct, editProduct, getById } from '../../../../api/product';
import { useNavigate, useParams } from 'react-router-dom';





const EditProduct = () => {
    const [cate, setCate] = useState<IProduct[]>([]);
    const [pro, setPro] = useState<IProduct>({} as IProduct);
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>();

    const getCate = async () => {
        try {
            const { data } = await getAllCate();
            setCate(data);
            form.setFieldsValue(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProduct = async () => {
        if (id) {
            const { data } = await getById(id);
            setPro(data);
            form.setFieldsValue(data); // cập nhật giá trị của form khi pro thay đổi
        }
    };

    useEffect(() => {
        getCate();
        getProduct();
    }, [id]);

    const onFinish = async (values: IProduct) => {
        console.log(values);
        if (id) {
            try {
                const { data } = await editProduct(values, id);
                if (data) {
                    message.success('Cập nhật sản phẩm thành công')
                    setTimeout(() => {
                        navigate('/admin')
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
                        value={pro.name}

                    />
                </Form.Item>
                <Form.Item
                    label="Giá gốc"
                    name="price"
                    rules={[{ required: true, message: 'Giá sản phẩm không được bỏ trông' }]}
                >
                    <Input type='number' value={pro.price} />
                </Form.Item>
                <Form.Item
                    label="Giá bán"
                    name="original_price"
                    rules={[{ required: true, message: 'Giá bán không được bỏ trống' }]}
                >
                    <Input type='number' value={pro.original_price} />
                </Form.Item>

                <Form.Item
                    label="Ảnh sp"
                    name={["images", 0, "base_url"]}
                    rules={[{ required: true, message: 'Ảnh sản phẩm không được bỏ trống' }]}
                >
                    <Input value={pro.images?.[0].base_url} />
                </Form.Item>

                <Form.Item
                    label="mô tả"
                    name="short_description"
                    rules={[{ required: true, message: 'Mô tả sản phẩm không được bỏ trốngtrống' }]}
                >
                    <Input value={pro.short_description} />
                </Form.Item>

                <Form.Item label="Danh mục">
                    <Input.Group compact>
                        <Form.Item
                            label='Danh Mục'
                            noStyle
                            name="categoryId"
                            rules={[{ required: true, message: 'Province is required' }]}
                        >
                            <Select placeholder="Danh mục" >
                                {cate.map((item) => {
                                    return (
                                        <Option value={item._id}>{item.name}</Option>
                                    )
                                })}

                            </Select>
                        </Form.Item>

                    </Input.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 11, span: 16 }} >
                    <Button type="primary" htmlType="submit" className='bg-blue-500'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default EditProduct;