import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-red-500 h-full'>
            <div className='text-center font-extrabold py-52'>
                <h1>Bạn không có quyền truy cập trang quản trị</h1>
                <button type="button" onClick={() => navigate('/')} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Quay lại</button>
            </div>
        </div>
    )
}

export default ErrorPage