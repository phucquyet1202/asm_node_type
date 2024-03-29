import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import UserLayout from './components/User/layout/UserLayout'
import HomePage from './components/User/home/homePage'
import Signup from './components/User/signup_signin/signup'
import Signin from './components/User/signup_signin/signin'
import DetailProductPage from './components/User/products/detailProductPage'
import AddProduct from './components/Admin/product/add/addproduct'
import EditProduct from './components/Admin/product/edit/edit'
import HomeProduct from './components/Admin/product/home/home'
import HomeCategory from './components/Admin/category/home/home'
import AddCategory from './components/Admin/category/add/addCate'
import LayoutAdmin from './components/Admin/layout/layout_admin'
import ErrorPage from './components/User/errorPage/errorPage'
import EditCategory from './components/Admin/category/edit/edit'
import { message } from 'antd'
import Cart from './components/User/cart/cart'
import { useGetUserByTokenMutation } from './api/user'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<any>(null)
  const token = localStorage.getItem('token')
  const [getUser] = useGetUserByTokenMutation()
  useEffect(() => {
    if (token) {
      getUser(token).unwrap().then(res => setUser(res.data));
    }
  }, [getUser, token])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />

        <Route path='/' element={<UserLayout user={user} />}> {/* user Layout */}
          <Route index element={<HomePage />} />
          <Route path='chi-tiet/:id' element={<DetailProductPage user={user} />} />
          <Route path='cart' element={<Cart user={user} />} />

        </Route>

        <Route path='/admin' element={user?.role === "admin" ? (<LayoutAdmin />) : (<ErrorPage />)}>
          < Route index element={<HomeProduct />} /> {/* admin Layout */}
          <Route path='add' element={<AddProduct />} />
          <Route path='edit/:id' element={<EditProduct />} />
          <Route path='cate' element={<HomeCategory />} />
          <Route path='cate/add' element={<AddCategory />} />
          <Route path='cate/edit/:id' element={<EditCategory />} />

        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App