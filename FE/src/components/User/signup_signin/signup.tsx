import React from 'react'
import { useForm } from "react-hook-form"
import { signupUser } from '../../../api/user'
import IUser from '../../../interfaces/user'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    type Props = {}
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate()
    const checkSignup = async (user: IUser) => {
        try {
            const users = await signupUser(user)
            if (users) {
                message.success('Đăng ký thành công')
                setTimeout(() => {
                    navigate("/signin");
                }, 1000)
            } else {
                throw new Error('Đăng ký không thành công')
            }
        } catch (error: any) {
            message.error(error.message)
        }
    }
    return (
        <div className='container mx-auto w-1/2'>
            <div className='text-center my-10 font-bold text-[22px]'>
                <h1>Đăng ký</h1>
            </div>
            <form onSubmit={handleSubmit(checkSignup)}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                    <input type="text" {...register('name', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" />
                    {errors.name && <span>Ten dang nhap khong duoc bo trong</span>}

                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" {...register('email', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" />
                    {errors.email && <span>Email khong duoc bo trong</span>}

                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                    <input type="text" {...register('phone', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    {errors.phone && <span>So dien thoai khong duoc bo trong</span>}

                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" {...register('password', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                    {errors.pasword && <span>Mat khau khong duoc bo trong</span>}

                </div>

                <div className='text-center'>
                    <button type="submit" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng ký</button>

                </div>
            </form>

        </div>
    )
}

export default Signup