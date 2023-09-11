import React, { useEffect, useState } from 'react'
import ProductPage from '../products/productPage'
import { IProduct } from '../../../interfaces/product'
import { useGetAllProductQuery, useSearchProductMutation } from '../../../api/product'
import { useSelector } from 'react-redux'

const HomePage = () => {
    const { data: product } = useGetAllProductQuery();
    const { searchTerm } = useSelector((state: any) => state.search)
    const [search] = useSearchProductMutation()
    const [pro, setPro] = useState([])
    useEffect(() => {
        if (searchTerm) {
            search({ name: searchTerm })
                .unwrap()
                .then((res) => setPro(res.data))
        }
    }, [searchTerm])
    return (
        <div className=''>
            <div className="w-4/5 my-12 mx-auto h-auto">
                <img src="/banner.png" alt="" />
            </div>
            <div className='mx-auto container w-4/5 text-[20px]'>
                <h1>ĐIỆN THOẠI NỔI BẬT NHẤT</h1>
            </div>
            <div className='my-9 container w-full mx-auto  grid lg:grid-cols-4 gap-4 md:grid-cols-3 ms:grid-cols-3 '>
                {pro.length > 0 ? (pro?.map((products: any) => <ProductPage
                    data={products}
                    key={products._id} />)) : (product?.map((products: any) => <ProductPage
                        data={products}
                        key={products._id} />))}

            </div>
        </div>
    )
}

export default HomePage