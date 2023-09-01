import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProduct } from '../../../interfaces/product';
import Cart from '../cart/cart';
import { useGetOneProductQuery } from '../../../api/product';
import { useAddCartMutation } from '../../../api/cart';
import { useGetUserByTokenMutation } from '../../../api/user';
import { Space, message } from 'antd';
import Comment from '../comment/comment';

const DetailProductPage = ({ user }: any) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product } = useGetOneProductQuery(id)
    const [addCart] = useAddCartMutation()
    const [activeImg, setActiveImage] = useState(product?.images?.[0]?.base_url)

    const [amount, setAmount] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Thêm sản phẩm vào giỏ hàng thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm sản phẩm vào giỏ hàng thất bại',
        });
    };


    const handleClick = () => {
        if (user) {
            addCart({ products: [{ product: product._id, quantity: amount }] })
                .unwrap().then(() => (
                    setTimeout(() => {
                        navigate('/cart')
                    }, 2000),
                    success()
                )).catch(() => error())
        }
    };





    return (
        <div className='container mx-auto mb-10'>
            <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
                <div className='flex flex-col gap-4 lg:w-2/4'>
                    <img src={product?.images?.[0]?.base_url} alt="" className=' w-2/3 aspect-square rounded-xl my-4' />
                    <div className='flex flex-row justify-between h-24 w-2/3'>
                        <img src={product?.images?.[0]?.medium_url} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images?.[0]?.medium_url)} />
                        <img src={product?.images?.[0]?.medium_url} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images?.[0]?.medium_url)} />
                        <img src={product?.images?.[0]?.large_url} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images?.[0]?.large_url)} />
                        <img src={product?.images?.[0]?.medium_url} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images?.[0]?.medium_url)} />
                    </div>
                </div>
                {/* ABOUT */}
                <div className='flex flex-col gap-4 lg:w-2/4 xl:-mt-20'>
                    <div>
                        <h1 className='text-3xl font-bold'>{product?.name}</h1>
                    </div>
                    <p className='text-gray-700'>
                        {product?.short_description}
                    </p>
                    <div >
                        <span className='text-2xl font-semibold text-red-600 px-4'>{product?.price?.toLocaleString("vi-VN")}đ</span>
                        <span className='text-2xl font-semibold  line-through mx-20'>{product?.original_price?.toLocaleString("vi-VN")}đ</span>
                    </div>

                    <div className='flex flex-row items-center gap-12'>
                        <div className='flex flex-row items-center'>
                            <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                            <span className='py-4 px-6 rounded-lg'>{amount}</span>
                            <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                        </div>
                        {contextHolder}
                        <Space>
                            <button onClick={() => handleClick()} className='bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                        </Space>
                    </div>
                </div>
            </div>
            <Comment user={user} />
        </div>
    )
}

export default React.memo(DetailProductPage);
