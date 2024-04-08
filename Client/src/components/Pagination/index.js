import React, { useEffect, useState } from 'react';

import classNames from "classnames/bind"

import styles from "./Pagination.module.scss"
import { grey } from '@mui/material/colors';

const cx = classNames.bind(styles)
// Example items, to simulate fetching from another resources.
function Pagination({ pages, page, setPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  let list = []
  for (let i = 0; i < pages; i++) {
    list.push(i + 1)
  }
  const [active, setActive] = useState(1);

  console.log(page)
  return (
    <div className={cx("pagination-header")} style={{ marginTop: 50 }}>
      {page !== 1 ?
        <span onClick={() => [setPage(page - 1), setActive(page - 1)]}><button className={cx('button-pagi')}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M5 12.5L16.25 23.75L18 21.875L8.75 12.5L18 3.125L16.25 1.25L5 12.5Z" fill="white" />
        </svg></button></span>
        : <span></span>
      }

      {list.map((item, index) => {
        return <span key={index} className={cx("number-pagi")} onClick={() => setPage(item)}>
          <ul>
            <li className={cx("link", {
              "active": active === item
            })} onClick={() => setActive(item)}>{item}</li>
          </ul>
        </span>
      })}
      {page !== list.length ?
        <span onClick={() => [setPage(page + 1), setActive(page + 1)]}><button className={cx('button-pagi')}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path d="M8.75 1.25L7 3.125L16.25 12.5L7 21.875L8.75 23.75L20 12.5L8.75 1.25Z" fill="white" />
        </svg></button></span>
        : <span></span>
      }
    </div>
  );
}
export default Pagination;