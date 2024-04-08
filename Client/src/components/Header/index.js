// Import library
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';


// Import component
import Search from "../Search";

// Import css
import styles from "./Header.module.scss";
import Button from '@mui/material/Button';
import { useContext, useState, useRef, useMemo } from "react";
import jwtDecode from "jwt-decode";
import useToken from "../../authorization/useToken";
import LogoutIcon from '@mui/icons-material/Logout';
import { ShopContext } from "../../context/shop-context";
import HeaderGuest from "../HeaderGuest";
import HeaderAdmin from "../HeaderAdmin";
import HeaderCustomer from "../HeaderCustomer";
import HeaderMusician from "../HeaderMusician";


const cx = classNames.bind(styles);


function Header() {

  const navigate = useNavigate()
  const { clearCart } = useContext(ShopContext)
  const token = useToken()
  let userRole = ''
  let name = ''
  if (token) {
    userRole = jwtDecode(token).role
    name = jwtDecode(token).username
  }
  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token")
      clearCart()
    }
  }
  const [page, setPage] = useState("Page");  
  return (
    <div>
      {!token ? <HeaderGuest/>
      : userRole ==="CUS" ? <HeaderCustomer/>
      : userRole ==="AD" ? <HeaderAdmin/>
      : <HeaderMusician/>
      }
    </div>
  )
}

export default Header;
