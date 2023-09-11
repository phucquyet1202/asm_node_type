import React, { useState } from 'react'
import { useCreateCommentsMutation, useDeleteCommentsMutation, useGetOneProductQuery } from '../../../api/product';
import { useParams } from 'react-router-dom';
import { message } from 'antd';


const Comment = ({ user }: any) => {
    console.log(user);
    const [comment, setComment] = useState('')
    const [addComment] = useCreateCommentsMutation()
    const { id } = useParams();
    const { data: product } = useGetOneProductQuery(id)
    const [deleComment] = useDeleteCommentsMutation()

    const [messageApi, contextHolder] = message.useMessage();

    const successDelet = () => {
        messageApi.open({
            type: 'success',
            content: 'Xóa bình luận thành công',
        });
    };
    const successAdd = () => {
        messageApi.open({
            type: 'success',
            content: 'Bình luận thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thêm sản phẩm vào giỏ hàng thất bại',
        });
    };

    const handleSubmit = () => {
        addComment({ product: product?._id, comment })
            .unwrap()
            .then(() => setTimeout(() => {
                successAdd()
            }, 1000))
    }
    const deleteComment = (id: any) => {
        deleComment(id).unwrap()
            .then(() => setTimeout(() => successDelet(), 1000))
    }
    const calculateTimeDifference = (createdAt: Date) => {
        const currentTimestamp = Date.now();
        const itemTimestamp = new Date(createdAt).getTime();

        const difference = currentTimestamp - itemTimestamp;

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return `${seconds} giây trước`;
        }
    };
    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
            <div className="w-full mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
                </div>
                <div className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="Comment" className="sr-only">Your Comment</label>
                        <textarea id="Comment" onChange={(value: any) => setComment(value.target.value)} rows={6} className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" placeholder="Write button Comment..." required defaultValue={""} />
                    </div>
                    {user ? (<button onClick={() => handleSubmit()} className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-red-400 hover:bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post Comment
                    </button>) : (<button className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-red-400 hover:bg-red-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post Comment
                    </button>)}
                </div>
                {product?.comments?.map((item: any) => (
                    <div key={item?._id}>
                        {contextHolder}
                        <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough" />{item?.user?.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate >{item?.createdAt ? calculateTimeDifference(item?.createdAt) : ''}</time></p>
                                </div>
                                {user?._id == item?.user?._id ? (<div>
                                    <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                            </path>
                                        </svg>
                                        <span className="sr-only">Comment settings</span>
                                    </button>
                                    {/* Dropdown menu */}
                                    <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                                            <li>
                                                <button className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</button>
                                            </li>
                                            <li>
                                                <button onClick={() => deleComment(item?._id)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</button>
                                            </li>
                                            <li>
                                                <button className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>) : ''}
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">{item?.comment}</p>
                            <div className="flex items-center mt-4 space-x-4">
                                <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                    Reply
                                </button>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default React.memo(Comment)