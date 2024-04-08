// Import library
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';


// Import component
import Search from "../Search";

// Import css
import styles from "./HeaderCustomer.module.scss";
import Button from '@mui/material/Button';
import { useContext, useState, useRef, useMemo } from "react";
import jwtDecode from "jwt-decode";
import useToken from "../../authorization/useToken";
import LogoutIcon from '@mui/icons-material/Logout';
import { ShopContext } from "../../context/shop-context";


const cx = classNames.bind(styles);


function HeaderCustomer() {

  const navigate = useNavigate()
  const { clearCart, cart } = useContext(ShopContext)
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
              <div className={cx("text-all-page")}>
                <Link to="/listbeat"><div className={cx("link-text")}>Beat</div></Link>
                <Link to="/chordsdetails"><div className={cx("link-text")}>Chords</div></Link>
                <Link to="/songs"><div className={cx("link-text")}>Chords of Songs</div></Link>
              </div>
            </Popup>
          </div>
          <Link to={"/contact"}><div className={cx("nav-item")}>Contact</div></Link>
          <div className={cx("nav-item")}>
              {/* Phan quyen */}
              <div style={{display:"flex", marginTop:30}}>
              {token ?
                <Link className={cx("viewCart")} to="/viewcart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M35.4166 37.5C33.1041 37.5 31.25 39.3541 31.25 41.6666C31.25 42.7717 31.689 43.8315 32.4704 44.6129C33.2518 45.3943 34.3116 45.8333 35.4166 45.8333C36.5217 45.8333 37.5815 45.3943 38.3629 44.6129C39.1443 43.8315 39.5833 42.7717 39.5833 41.6666C39.5833 40.5616 39.1443 39.5018 38.3629 38.7204C37.5815 37.9389 36.5217 37.5 35.4166 37.5ZM2.08331 4.16663V8.33329H6.24998L13.75 24.1458L10.9166 29.25C10.6041 29.8333 10.4166 30.5208 10.4166 31.25C10.4166 32.355 10.8556 33.4148 11.637 34.1962C12.4184 34.9776 13.4782 35.4166 14.5833 35.4166H39.5833V31.25H15.4583C15.3202 31.25 15.1877 31.1951 15.09 31.0974C14.9924 30.9997 14.9375 30.8673 14.9375 30.7291C14.9375 30.625 14.9583 30.5416 15 30.4791L16.875 27.0833H32.3958C33.9583 27.0833 35.3333 26.2083 36.0416 24.9375L43.5 11.4583C43.6458 11.125 43.75 10.7708 43.75 10.4166C43.75 9.86409 43.5305 9.33419 43.1398 8.94349C42.7491 8.55279 42.2192 8.33329 41.6666 8.33329H10.8541L8.89581 4.16663M14.5833 37.5C12.2708 37.5 10.4166 39.3541 10.4166 41.6666C10.4166 42.7717 10.8556 43.8315 11.637 44.6129C12.4184 45.3943 13.4782 45.8333 14.5833 45.8333C15.6884 45.8333 16.7482 45.3943 17.5296 44.6129C18.311 43.8315 18.75 42.7717 18.75 41.6666C18.75 40.5616 18.311 39.5018 17.5296 38.7204C16.7482 37.9389 15.6884 37.5 14.5833 37.5Z" fill="white" />
                  </svg>
                </Link>
                :
                <Link className={cx("viewCart")} to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M35.4166 37.5C33.1041 37.5 31.25 39.3541 31.25 41.6666C31.25 42.7717 31.689 43.8315 32.4704 44.6129C33.2518 45.3943 34.3116 45.8333 35.4166 45.8333C36.5217 45.8333 37.5815 45.3943 38.3629 44.6129C39.1443 43.8315 39.5833 42.7717 39.5833 41.6666C39.5833 40.5616 39.1443 39.5018 38.3629 38.7204C37.5815 37.9389 36.5217 37.5 35.4166 37.5ZM2.08331 4.16663V8.33329H6.24998L13.75 24.1458L10.9166 29.25C10.6041 29.8333 10.4166 30.5208 10.4166 31.25C10.4166 32.355 10.8556 33.4148 11.637 34.1962C12.4184 34.9776 13.4782 35.4166 14.5833 35.4166H39.5833V31.25H15.4583C15.3202 31.25 15.1877 31.1951 15.09 31.0974C14.9924 30.9997 14.9375 30.8673 14.9375 30.7291C14.9375 30.625 14.9583 30.5416 15 30.4791L16.875 27.0833H32.3958C33.9583 27.0833 35.3333 26.2083 36.0416 24.9375L43.5 11.4583C43.6458 11.125 43.75 10.7708 43.75 10.4166C43.75 9.86409 43.5305 9.33419 43.1398 8.94349C42.7491 8.55279 42.2192 8.33329 41.6666 8.33329H10.8541L8.89581 4.16663M14.5833 37.5C12.2708 37.5 10.4166 39.3541 10.4166 41.6666C10.4166 42.7717 10.8556 43.8315 11.637 44.6129C12.4184 45.3943 13.4782 45.8333 14.5833 45.8333C15.6884 45.8333 16.7482 45.3943 17.5296 44.6129C18.311 43.8315 18.75 42.7717 18.75 41.6666C18.75 40.5616 18.311 39.5018 17.5296 38.7204C16.7482 37.9389 15.6884 37.5 14.5833 37.5Z" fill="white" />
                  </svg>                </Link>
              }
              <div className={cx("cart-number")}>{cart.length}</div>
              </div>
          </div>
        </div>

        {/* Phan quyen header */}
        <div className={cx("username")}>
          <div className={cx("pop-up")}>
            <Popup trigger={<button className={cx("button-popup")}>Hi, {name}</button>} position="bottom left center" closeOnDocumentClick on={['hover', 'focus']}>
              <div className={cx("text-all")}>
                <Link to="/myprofile"><div className={cx("link-text")}>Account</div></Link>
                <Link to="/listBeatPurchased"><div className={cx("link-text")}>Beat Purchased</div></Link>
                <Link to="/MyCollection"><div className={cx("link-text")}>My Collection</div></Link>
                <Link to="/usersong"><div className={cx("link-text")}> My Chords of Songs</div></Link>
                <Link to="/createorderbeat"><div className={cx("link-text")}> Order new Beat</div></Link>
                <Link to="/ordertimeline"><div className={cx("link-text")}> Order Timeline</div></Link>
                <Link to="/mybeats"><div className={cx("link-text")}> My Beats</div></Link>
                <Link to="/"><div className={cx("link-text")} onClick={handleLogout}> Log out</div></Link>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderCustomer;
