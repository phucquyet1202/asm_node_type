import React, { useEffect, useState } from 'react'
import ProductPage from '../products/productPage'
import { IProduct } from '../../../interfaces/product'
import { getAll } from '../../../api/product'

const HomePage = () => {
    const [product, setProducts] = useState<IProduct[]>([])

    const fetchProducts = async () => {
        const { data } = await getAll()
        // console.log(data);
        setProducts(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    // console.log(product);
    return (
        <div className=''>
            <div className="w-4/5 my-12 mx-auto h-auto">
                <img src="/banner.png" alt="" />
            </div>
            <div className='mx-auto container w-4/5 text-[20px]'>
                <h1>ĐIỆN THOẠI NỔI BẬT NHẤT</h1>
            </div>
            <div className='my-9 container w-full mx-auto  grid lg:grid-cols-4 gap-4 md:grid-cols-3 ms:grid-cols-3 '>
                {product.map(products => <ProductPage
                    data={products}
                    key={products._id} />)}

            </div>
        </div>
    )
}

export default HomePage