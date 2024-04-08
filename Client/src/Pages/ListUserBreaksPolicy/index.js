import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import styles from "./ListUserBreaksPolicy.module.scss";
import BasicPagination from "../../components/Pagination";
import PaginationControlled from "../../components/Pagination";
import ReactPaginate from 'react-paginate';
import Pagination from "../../components/Pagination";
import axiosInstance from "../../authorization/axiosInstance";
import { ShopContext } from "../../context/shop-context";
import ListSplitter from "@/components/ListSplitter";


const cx = classNames.bind(styles);

// Fake API

function ListUserBreaksPolicy() {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        loadListUser()
    }, [page])

    const loadListUser = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/admin/musician/policy`)
            .then((res) => {
                console.log(res.data)
                if (res.data.length === 0) {
                    setListUser(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 8 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (page === i + 1) {
                            setListUser(newGroup[i])
                        }
                    }
                    setPages(newGroup.length)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const [active, setActive] = useState(0);
    console.log(page)
    return (

        <div className={cx("container")}>
            <h1 className={cx("login-wrapper")}>List Musician</h1>
            <div className={cx("line")}>
            </div>
            {listUser.length !== 0 ? <div className={cx("listuser-header")}>
                <thead>
                    <tr>
                        <th><span style={{ paddingRight: 150 }}>User</span></th>
                        <th><span>Created</span></th>
                        <th class="text-center"><span>Status</span></th>
                        <th><span style={{ marginLeft: 100 }}>Email</span></th>
                        <th><span style={{ marginLeft: 170 }}>Role</span></th>
                    </tr>
                </thead>

                <tbody className={cx("grid-row")}>
                    {listUser.map((user) => {
                        const dateReleasing = new Date(user.createAt)
                        const month = dateReleasing.getUTCMonth() + 1
                        const day = dateReleasing.getUTCDate()
                        const year = dateReleasing.getUTCFullYear()
                        return (
                            <div className={cx("row-1")}>
                                <td style={{ paddingTop: 15, paddingLeft: 50, width: 270 }}>
                                    {user.avatar === null ?
                                        <img className={cx("img-user")} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s"} />
                                        : <img className={cx("img-user")} src={user.avatar} />
                                    }

                                    <a href="#" style={{ marginLeft: 10, fontSize: '1.5rem' }} class="user-link"> <Link to={`/viewdetailsuserbyadmin/${user.id}`}>{user.fullName}</Link></a>
                                    {/* <span class="user-subhead">Admin</span> */}
                                </td>
                                <td style={{ marginLeft: 200 }}>
                                    {day}/{month}/{year}
                                </td>
                                {user.status !== 1 ?
                                    <td class="text-center" style={{ width: 170, textAlign: "center" }}>
                                        <span style={{ background: "red", padding: 5, height: 5, color: 'white', fontSize: '1.8rem', marginLeft: 10, borderRadius: 18 }} class={cx("label label-default")}>Banned</span>
                                    </td>
                                    :
                                    <td class="text-center" style={{ width: 170, textAlign: "center" }}>
                                        <span style={{ background: "green", padding: 5, height: 5, color: 'white', fontSize: '1.8rem', margin: '0 auto', borderRadius: 18 }} class={cx("label label-default")}>Active</span>
                                    </td>}
                                <td style={{ width: 400 }}>
                                    <a style={{ marginLeft: 20, textDecorationLine: 'underline', color: '#337ab7' }} href="#">{user.mail}</a>
                                </td>
                                {user.role === "CUS" ?
                                    <td>
                                        <a style={{ width: 50, marginRight: 30, fontWeight: 500 }} href="#">Customer</a>
                                    </td>
                                    :
                                    <td>
                                        <a style={{ marginRight: 30, fontWeight: 500 }} href="#">Musician</a>
                                    </td>
                                }

                            </div>
                        )
                    })}

                </tbody>
                {pages !== 1 ?
                    <div className={cx("pagination")}>
                        <Pagination pages={pages} page={page} setPage={setPage} />
                    </div>
                    : <div></div>}
            </div>
                : <div style={{ display: "flex", justifyContent: "center", marginBottom: 1000, fontSize: 25 }}> There are no user who has broken the policies </div>}
        </div>
    );
}

export default ListUserBreaksPolicy;
