import React, { useState } from 'react'
import IUser from '../../../interfaces/user'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
// import { signinUser } from '../../../api/user'
import { Space, message } from 'antd'
// import { AxiosResponse } from 'axios';

import ISignin from '../../../interfaces/signin';
import { useSigninMutation } from '../../../api/user';

const Signin = () => {
    type Props = {}
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const navigate = useNavigate();
    const [login] = useSigninMutation()
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng nhập thành công',
        });
    };

    const error = (err: any) => {
        messageApi.open({
            type: 'error',
            content: err,
        });
    };
    const checkSignin = async (user: any) => {
        login(user).unwrap().then((res) => {
            window.localStorage.setItem('token', res.token)
            setTimeout(() => {
                navigate('/')

            }, 2000);
            success()
        }).catch((err) => {
            error(err.data.message)
        })
    }

    return (
        <div className='container mx-auto w-1/2'>
            <div className='text-center my-10 font-bold text-[22px]'>
                <h1>Đăng nhập</h1>
            </div>
            <form onSubmit={handleSubmit(checkSignin)}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" {...register('email', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                    {errors.email && <span>Email khong duoc bo trong</span>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" {...register('password', { required: true })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    {errors.password && <span>mat khau khong duoc bo trong</span>}



                </div>

                <div className='text-center'>
                    {contextHolder}
                    <Space>
                        <button type="submit" id='submit' className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng Nhập</button>
                    </Space>
                </div>
            </form>

        </div>
    )
}

export default Signin