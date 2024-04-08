import classNames from "classnames/bind";
import styles from "./Seach.module.scss";
import { React, useState } from "react";
import TippyHeadless from '@tippyjs/react/headless';
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "@/context/shop-context";

const cx = classNames.bind(styles);

function Search() {
  const {search, setSearch} = useContext(ShopContext)
  return (
      <div className={cx("search-wrapper")}>
        <input
          type="text"
          placeholder="Search..."
          className={cx("input")}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {/* <div className={cx("search")}>
        </div> */}
        <div className={cx("submit")}>
        <Link to="/viewbeatsall">
          <svg
            className={cx("icon-search")}
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M25.194 24.4299L18.8539 17.9638C20.6917 15.8731 21.6496 13.1473 21.5258 10.361C21.4019 7.57471 20.206 4.94567 18.19 3.02803C16.174 1.11039 13.4955 0.0539811 10.7191 0.0814873C7.94268 0.108993 5.2853 1.21827 3.30709 3.17547C1.32888 5.13268 0.184398 7.78492 0.114894 10.5731C0.0453893 13.3613 1.05629 16.0676 2.93451 18.1215C4.81273 20.1755 7.41152 21.4166 10.1831 21.5833C12.9546 21.75 15.6824 20.8292 17.7914 19.015L24.1315 25.481C24.2719 25.6145 24.4584 25.688 24.6517 25.686C24.845 25.6841 25.03 25.6068 25.1678 25.4705C25.3055 25.3343 25.3852 25.1496 25.3901 24.9555C25.395 24.7614 25.3247 24.5729 25.194 24.4299ZM1.64106 10.7908C1.65493 8.96268 2.20814 7.17976 3.23073 5.66744C4.25333 4.15513 5.69937 2.98134 7.38601 2.29453C9.07265 1.60771 10.9241 1.43871 12.7063 1.80889C14.4885 2.17907 16.1214 3.07181 17.3984 4.37421C18.6754 5.67661 19.5393 7.33019 19.8807 9.12583C20.2221 10.9215 20.0258 12.7785 19.3166 14.4622C18.6073 16.1458 17.417 17.5804 15.8962 18.5845C14.3753 19.5887 12.5922 20.1173 10.7723 20.1034C8.3329 20.082 6.0016 19.0895 4.2898 17.3436C2.57799 15.5978 1.62544 13.2412 1.64106 10.7908Z"
              fill="white"
            />
          </svg>
          </Link >
        </div>
      </div>
  );
}

export default Search;
