import React, { useEffect, useState } from 'react'
import { useGetOneCartMutation, useRemoveCartMutation } from '../../../api/cart'
import { Popconfirm, message } from 'antd'

const Cart = ({ user }: any) => {
    const [getCart] = useGetOneCartMutation()
    const [cart, setCart] = useState<any>(null)
    const [removeCart] = useRemoveCartMutation()
    const vat = 50000

    useEffect(() => {
        if (user) {
            getCart(user?._id).then((res: any) => setCart(res?.data))
        }
    }, [user])
    const handleQuantityChange = (productId: string, newQuantity: number) => {
        setCart((prevCart: any) => {

            const updatedProducts = prevCart?.data?.products?.map((item: any) => {

                if (item.product._id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            return { ...prevCart, data: { ...prevCart.data, products: updatedProducts } };
        });
    };
    const [messageApi, contextHolder] = message.useMessage();
    const text = 'Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?';
    const description = 'Delete the task';


    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Xóa sản phẩm giỏ hàng thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Xóa sản phẩm giỏ hàng thất bại',
        });
    };


    const remove = (id: any) => {
        removeCart({ cartId: cart?.data?._id, productId: id })
            .unwrap()
            .then(() => {
                success()
                setTimeout(() => {
                    getCart(user?._id).then((res: any) => setCart(res?.data));
                }, 2000);

            })
    }
    const totalPrice = cart?.data?.products?.reduce((total: any, products: any) => {
        const productPrice = products?.product?.price;
        return total + productPrice * products?.quantity;
    }, 0)
    return (
        <div className="h-auto bg-gray-100 pt-20">
            {cart?.data?.products?.length > 0 ? (<h1 className="mb-10 text-center text-2xl font-bold">DANH SÁCH GIỎ HÀNG</h1>) : (<h1 className="mb-10 text-center text-2xl font-bold">Không có sản phẩm nào trong giỏ hàng</h1>)}
            {user ? (<div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {cart?.data?.products?.map((item: any) => {
                        const productId = item.product._id;
                        return (
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={item?.product?.images?.[0]?.base_url} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">{item?.product?.name}</h2>
                                        <p className="mt-1 text-xs text-gray-700">{item?.product?.brand?.name}</p>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className=" flex border-gray-100">
                                            <span
                                                onClick={() => handleQuantityChange(productId, item.quantity - 1)}
                                                className={`pointer-events border bg-gray-100 border-gray-100 cursor-pointer rounded-l py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 ${item.quantity <= 1 ? 'pointer-events-none opacity-50 border border-gray-400 border-opacity-50' : ''}`}
                                            >
                                                -
                                            </span>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                            <span
                                                onClick={() => handleQuantityChange(productId, item.quantity + 1)}
                                                className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                            >
                                                +
                                            </span>
                                        </div>
                                        {contextHolder}
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">{item?.product?.price?.toLocaleString("vi-VN")}đ</p>
                                            <Popconfirm
                                                placement="topLeft"
                                                title={text}
                                                description={description}
                                                onConfirm={() => remove(item?.product?._id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* <!-- Sub total --> */}
                {cart?.data?.products?.length > 0 ? (<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">{totalPrice?.toLocaleString("vi-VN")}đ</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">{vat?.toLocaleString("vi-VN")}đ</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">{(totalPrice + vat)?.toLocaleString('vi-VN')}đ</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Thanh toán</button>
                </div>) : ''}
            </div>) : (<div></div>)}
        </div>
    )
}

export default Cart