import React, { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGetUserByTokenMutation } from "../../../api/user"
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineSearch } from 'react-icons/ai'
import { updateSearchTerm } from "../../../slices/search"

const Header = ({ user }: any) => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  const checkLogout = () => {
    localStorage.removeItem("token");
    window.location.reload()
  }

  const searchs = () => {
    if (name) {
      dispatch(updateSearchTerm(name));
      setName('')
    }
  };


  return (
    <div className="bg-[#D70018] w-full ">
      <div className='container mx-auto flex items-center gap-6'>
        <div className="w-1/12">
          <img src="/logo.png" alt="" className="lg:w-2/3 sm:w-full" />
        </div>

        <div className="w-full mx-auto ">

          <div className="flex items-center w-full">
            <div className="relative w-2/3 ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" onChange={(value: any) => setName(value.target.value)} value={name} id="simple-search" className="h-[33px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            </div>
            <div className="mx-3">
              <button onClick={() => searchs()}>
                <AiOutlineSearch className="text-white text-2xl" />
              </button>
            </div>
            <div className="px-3 text-[20px] text-white">
              <i className="fa-solid fa-user" ></i>
            </div>
            <div>{user ? (<div className="text-white rounded-lg py-2 font-bold">{user.name}/<button className="text-white rounded-lg py-2 font-bold hover:bg-red-700  space-x-2 text-sm md:text-base" onClick={() => checkLogout()}>Đăng xuất</button></div>) : (<div className="flex items-center space-x-2 ml-3">
              <Link to={"/signin"} className="text-white rounded-lg py-2 font-bold hover:bg-red-700 flex items-center space-x-2 text-sm md:text-base">
                <span>Đăng nhập</span>
              </Link>
              <Link to={'/signup'} className=" text-white rounded-lg py-2 font-bold hover:bg-red-700 flex items-center space-x-2 text-sm md:text-base">
                <span>Đăng ký</span>
              </Link>
            </div>)}</div>
            <div>
              {(user && user?.role == "admin") ? (<div className="text-white rounded-lg py-2 font-bold hover:bg-red-700 flex items-center space-x-2 text-sm md:text-base mx-4"><Link to={'/admin'}>Trang quan tri</Link></div>) : ''}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default React.memo(Header)