import React from 'react';
import { MenuProps, message } from 'antd';
import { Dropdown, Space, Layout } from 'antd';
const { Header } = Layout;

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <div className='grid border-b'>
                <span>Admin</span>
                <span className='mb-3'>admin@gmail.com</span>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <span>
                Setting
            </span>
        ),
        disabled: true,
    },
    {
        key: '3',
        label: (
            <a href="/">
                Client
            </a>
        )
    },
    {
        key: '4',
        danger: true,
        label: (
            <button onClick={() => message.success("Đăng xuất thành công!")} > Đăng xuất</button >
        ),
    },
];

// export const HeaderAdmin = () => {
//     return (
//         <Header className="bg-gray-300 text-center text-black">
//             <Dropdown menu={{ items }}>
//                 <Space>
//                     <i className="fa-solid fa-user-tie text-[30px]"></i>
//                 </Space>
//             </Dropdown>
//         </Header>
//     )
// };