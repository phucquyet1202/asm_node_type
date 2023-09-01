import React, { useEffect, useState } from 'react'
import { IProduct } from '../../../interfaces/product'
import { Link } from 'react-router-dom'
type Props = {
    data: IProduct
}
const ProductPage = ({ data }: Props) => {
    // console.log(data);
    return (

        <div className='my-8  '>

            <div className="max-w-sm p-6 bg-white md:h-[400px] lg:h-[450px] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pb-12">
                <Link to={`/chi-tiet/${data._id}`} className=" sm:my-8">
                    <img alt="Art" src={data.images?.[0].base_url} className=" w-4/5 md:h-48 sm:h-90 lg:h-auto" />
                    <h3 className="mt-4 text-lg font-bold px-7 text-gray-900 sm:text-[14px] md:text-[15px] lg:text-[16px] lg:w-11/12 md:w-full ">
                        {data.name}
                    </h3>

                    <span className='text-red-500 font-semibold sm:px-3 xl:px-8'>{data.price?.toLocaleString("vi-VN")}đ</span>
                    <span className='text-gray-400 mx-3'>{data.original_price?.toLocaleString("vi-VN")}đ</span>
                    <div className='flex my-3 px-7'>
                        <img src="/Vector.png" alt="" />
                        <img src="/Vector.png" alt="" />
                        <img src="/Vector.png" alt="" />
                        <img src="/Vector.png" alt="" />
                        <img src="/Vector.png" alt="" />
                    </div>
                    <p className='text-gray-400  lg:mx-28 md:mx-16 px-12 w-full -my-7'>
                        72 đánh giá
                    </p>
                </Link>
            </div>

        </div >
    )
}

export default ProductPage