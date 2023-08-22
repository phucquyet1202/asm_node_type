import { Outlet } from 'react-router-dom'
import Header from '../header_navbar_footer/header'
import NavBar from '../header_navbar_footer/NavBar'
import Footer from '../header_navbar_footer/footer'
import '../../../index.css'
const UserLayout = () => {
  return <div>
    <Header />
    <NavBar />
    <Outlet />
    <Footer />
  </div>
}
export default UserLayout