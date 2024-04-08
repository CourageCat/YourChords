// Import library
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';


// Import component
import Search from "../Search";

// Import css
import styles from "./HeaderAdmin.module.scss";
import Button from '@mui/material/Button';
import { useContext, useState, useRef, useMemo } from "react";
import jwtDecode from "jwt-decode";
import useToken from "../../authorization/useToken";
import LogoutIcon from '@mui/icons-material/Logout';
import { ShopContext } from "../../context/shop-context";


const cx = classNames.bind(styles);


function HeaderAdmin() {
  const navigate = useNavigate()
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
    }
  }
  const [page, setPage] = useState("Page");
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("header-left")}>
        <Link to="/" className={cx("header-link")}>
          <span className={cx("logo")}>YourChords</span>
        </Link>
      </div>
      <img className={cx("img-header")} src={require("../../assets/images/Other/Logo.png")} />
      <div className={cx("header-right")}>
        <div className={cx("navigation")}>
          <Link to={"/"}><div className={cx("nav-item")}>Home</div></Link>
          <Popup trigger={<button className={cx("button-page")}>Warning</button>} position="bottom center" closeOnDocumentClick on={['hover', 'focus']}>
            <div className={cx("text-all")}>
              <Link to="/listUserBreaksPolicy"><div className={cx("link-text")} >User</div></Link>
            </div>
          </Popup>
          <Popup trigger={<button className={cx("button-page")}>Ban</button>} position="bottom center" closeOnDocumentClick on={['hover', 'focus']}>
            <div className={cx("text-all")}>
              <Link to="/listalluserban"><div className={cx("link-text")} >User</div></Link>
              <Link to="/bannedsong"><div className={cx("link-text")} >Song</div></Link>
            </div>
          </Popup>
          <Popup trigger={<button className={cx("button-page")}>Report</button>} position="bottom center" closeOnDocumentClick on={['hover', 'focus']}>
            <div className={cx("text-all")}>
              <Link to="/listuserreport"><div className={cx("link-text")} >User</div></Link>
              <Link to="/reportsong"><div className={cx("link-text")} >Song</div></Link>
            </div>
          </Popup>
          <div className={cx("nav-item")}>
          </div>
        </div>

        {/* Phan quyen header */}
        <div className={cx("pop-up")}>
          <Popup trigger={<button className={cx("button-popup")}>Hi, {name}</button>} position="bottom center" closeOnDocumentClick on={['hover', 'focus']}>
            <div className={cx("text-all")}>
              <Link to="/adminprofile"><div className={cx("link-text")}>Account</div></Link>
              <Link to="/listuser"><div className={cx("link-text")}>View User</div></Link>
              <Link to="/"><div className={cx("link-text")} onClick={handleLogout}> Log out</div></Link>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
