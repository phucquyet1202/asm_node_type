import React from 'react'
import SideBar from '../sideBar/sideBar'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
// import { HeaderAdmin } from '../header/header'

const LayoutAdmin = () => {
    return (
        <Layout className='h-full'>
            <SideBar />


            <Outlet />
        </Layout>
    )
}

export default LayoutAdmin