import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../../interfaces/product'
import { getById } from '../../../api/product'

const DetailProductPage = () => {
    const { id } = useParams()
    console.log(id);
    const [product, setProduct] = useState<IProduct>({} as IProduct)

    useEffect(() => {
        const getProductById = async () => {
            if (id) {
                const { data } = await getById(id)
                setProduct(data)
            }

        }
        getProductById()
    }, [])
    console.log(product);
    return (
        <div>
            <div className='bg-[#E5E5E5]'>
                <div className='font-semibold text-[20px] py-3 h-[60px] w-2/3 container mx-auto '>
                    <h1 className=''>{product?.name}</h1>
                </div>
            </div>
            <div className='container mx-auto my-9 w-2/3'>

                <div className='grid grid-cols-2 '>
                    <div className='w-2/3 '>
                        <div className='my-9 w-full'>
                            <img src={product?.images?.[0]?.base_url} alt="" />
                        </div>
                        <div className='flex lg:w-3/4 sm:mx-4  sm:w-1/2 lg:mx-6' >
                            <img src="/img_bottom.png" alt="" className='mx-1 w-1/3' />
                            <img src="/img_bottom.png" alt="" className='mx-1 w-1/3' />
                            <img src="/img_bottom.png" alt="" className='mx-1 w-1/3' />
                            <img src="/img_bottom.png" alt="" className='mx-1 w-1/3' />

                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='my-9'>
                            <span className='text-red-500 font-medium text-[20px]'>{product?.price}</span>
                            <span className='text-gray-400 text-[17px] px-5'>{product?.original_price}</span>
                        </div>
                        <div className='h-4/6 sm:h-3/5 lg:text-[18px]'>
                            <p>
                                {product?.short_description}
                            </p>
                        </div>
                        <div className='sm:mt-[-13px] lg:mt-[40px] lg:mx-28 w-full'>
                            <button className='w-1/2 bg-red-600 hover:bg-blue-500  text-white h-[50px]'>Mua Ngay</button>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 mt-14'>
                    <div className='text-red-500 text-center my-3 pt-3 font-bold text-[20px]'>
                        <h2>ĐẶC ĐIỂM NỔI BẬT</h2>
                    </div>
                    <div className='px-4 w-3/4 lg:text-[18px]'>

                        <p>Camera chất lượng, bắt trọn từng khoảng khắc - Cụm 4 camera với cảm biến chính lên đến 108 MP</p>
                        <p>Thưởng thức không gian giải trí cực đỉnh - Màn hình lớn 6.7 inch, độ phân giải Full HD+, 120Hz mượt mà</p>
                        <p> Cấu hình Galaxy A73 5G được nâng cấp mạnh với chip Snapdragon 778G, RAM lên đến 8 GB</p>
                        <p>Chiến game thoải mái không lo gián đoạn - Viên pin lớn 5000 mAh, hỗ trợ sạc nhanh 25 W</p>

                    </div>
                </div>
                <div className='lg:text-[18px]'>
                    <div className='pt-6'>
                        <p>
                            Năm 2022 hứa hẹn sẽ là một năm rất đáng trông đợi đối với những ai là fan của thương hiệu điện thoại Samsung. Mới đây, hãng sẽ tiếp tục cho ra mắt nhiều smartphone với sự cải tiến trong thiết kế và cấu hình, trong đó phải kể đến chiếc Samsung Galaxy A73 với nhiều cải tiến so với thế hệ trước. Vậy sản phẩm có gì nổi bật, giá bao nhiêu và liệu có nên mua không? Tìm hiểu ngay nhé!
                        </p>
                    </div>
                    <div className='pt-6 '>
                        <h3 className='pb-4 font-semibold lg:text-[22px]'>
                            Đánh giá Samsung A73 - Hiệu năng mượt mà, chụp ảnh chuyên nghiệp
                        </h3>
                        <p>
                            Điện thoại cao cấp nhất dòng Galaxy A series sở hữu nhiều nâng cấp đáng giá so với thế hệ trước, từ ngoại hình cho đến hiệu năng, đặc biệt là hệ thống camera. Sau đây là những đánh giá chi tiết về chiếc
                        </p>
                    </div>
                    <div className='pt-6'>
                        <h3 className='pb-4 font-semibold lg:text-[22px]'>
                            Thiết kế sang trọng, màn hình Super AMOLED
                        </h3>
                        <p>
                            Trước khi mua bất kỳ chiếc điện thoại nào, người dùng cũng sẽ quan tâm đến thiết kế sản phẩm trước. Với phiên bản A73, Samsung đã tạo nên một chiếc smartphone với vẻ ngoài mang đến cảm giác sang trọng và tinh tế.
                        </p>
                        <p className='py-6'>
                            Samsung Galaxy A73 được thiết kế gọn nhẹ với tiêu chí đáp ứng khả năng mang theo để tiện đi lại cho người dùng. Giờ đây, bạn có thể mang theo chiếc smartphone bên cạnh đến bất cứ đâu, bất cứ lúc nào.
                        </p>
                        <p>
                            Kích thước và trọng lượng của chiếc điện thoại rất vừa phải và dĩ nhiên sẽ không chiếm quá nhiều diện tích trong túi xách và có thể di chuyển dễ dàng.
                        </p>
                    </div>
                </div>
                <div className='mt-10 text-center text-[18px]'>
                    <button type="button" className="py-2.5 px-5 mr-2 mb-2  text-[18px] w-1/3 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Xem thêm</button>

                </div>
            </div>
        </div>
    )
}

export default DetailProductPage