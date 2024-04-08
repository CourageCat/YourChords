// Import library
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';


// Import component
import Search from "../Search";

// Import css
import styles from "./HeaderGuest.module.scss";
import Button from '@mui/material/Button';
import { useContext, useState, useRef, useMemo } from "react";
import jwtDecode from "jwt-decode";
import useToken from "../../authorization/useToken";
import LogoutIcon from '@mui/icons-material/Logout';
import { ShopContext } from "../../context/shop-context";
import { Alert, Snackbar } from "@mui/material";


const cx = classNames.bind(styles);


function HeaderGuest() {

  const navigate = useNavigate()
  const token = useToken()
  let userRole = ''
  let name = ''
  if (token) {
    userRole = jwtDecode(token).role
    name = jwtDecode(token).username
  }
  return (
    <div className={cx("header-wrapper")}>
      <div className={cx("header-left")}>
        <Link to="/" className={cx("header-link")}>
          <span className={cx("logo")}>YourChords</span>
        </Link>
        <div className={cx("search")}>
          <Search />
        </div>
      </div>
      <img className={cx("img-header")} src={require("../../assets/images/Other/Logo.png")} />
      <div className={cx("header-right")}>
        <div className={cx("navigation")}>
          <Link to={"/"}><div className={cx("nav-item")}>Home</div></Link>
          <div>
            <Popup trigger={<button className={cx("button-page")}>Pages</button>} position="bottom centers" closeOnDocumentClick on={['hover', 'focus']}>
              <div className={cx("text-all")}>
                <Link to="/listbeat"><div className={cx("link-text")}>Beat</div></Link>
                <Link to="/chordsdetails"><div className={cx("link-text")}>Chords</div></Link>
                <Link to="/songs"><div className={cx("link-text")} style={{textWrap: 'nowrap'}}>Chords of Songs</div></Link>
              </div>
            </Popup>
          </div>
          <Link to={"/contact"}><div className={cx("nav-item")}>Contact</div></Link>
        </div>
        {/* Phan quyen header */}
        <Link to="/login">
          <button variant="contained" className={cx("action")}>
            <div className={cx("login")}>Login</div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderGuest;
