
import classNames from "classnames/bind";
import styles from "./MyBeats.module.scss";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import audio from "../../assets/audio";
import { ShopContext } from "../../context/shop-context";
import axiosInstance from "../../authorization/axiosInstance";
import Sidebar from "../../components/SideBar";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import ListBeatPurchasedBox from "../../components/listBeatPurchasedBox";
import PaginationControlled from "../../components/Pagination";
import Pagination from "../../components/Pagination";
import ListSplitter from "@/components/ListSplitter";
import MyBeatsBox from "@/components/MyBeatsBox";
import NotFound from "../NotFound";

const cx = classNames.bind(styles);

function MyBeats() {

    //Comment lai cho nay
    const navigate = useNavigate()
    const [listOrders, setListOrders] = useState([]);
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const token = useToken();
    let userId = ""
    let role = ""
    if (token) {
        userId = jwtDecode(token).sub
        role = jwtDecode(token).role
    }
    // 

    useEffect(() => {
        const loadOrders = async () => {
            if (!token) {
                navigate("/login")
                return
            }
            await axiosInstance.get(`http://localhost:8080/api/v1/request/beat/all/${userId}`)
                .then(res => {
                    if (res.data.length === 0) {
                        setListOrders(res.data)
                    }
                    else {
                        const newGroup = ListSplitter({ data: res.data, groupSize: 4 })
                        for (let i = 0; i < newGroup.length; i++) {
                            if (page === i + 1) {
                                setListOrders(newGroup[i])
                            }
                        }
                        setPages(newGroup.length)
                    }
                })
                .catch((error) => {
                    if (error.message.includes("Network")) {
                        navigate("/login")
                    }
                })
        }
        loadOrders()
    }, [])


    //  
    if (role === "CUS") {
        return (
            <div className={cx("list-header")}>
                <div className={cx("text-header")} >
                    <h1 className={cx("text-welcome")} style={{ marginBottom: 200 }}>
                        My Beats
                    </h1>

                </div>
                {listOrders.length !== 0 ?
                    <div style={{ height: 900 }}>
                        <div className={cx("listbeat")}>
                            {listOrders.map((item) => {
                                return <MyBeatsBox id={item.id} beatName={item.beatName} price={item.price} creatAt={item.creatAt} beatSoundDemo={item.beatDemo} beatSoundFull={item.beatFull} />
                            })}
                        </div>
                    </div>
                    : <div className={cx("sold-out")} style={{ zindex: '1', marginLeft: 800, height: 600, fontSize:20}}> You are not ordering any beats<div> Visiting our website to order the beats </div> </div>}
                {pages !== 1 ?
                    <div className={cx("pagination")}>
                        <Pagination pages={pages} page={page} setPage={setPage} />
                    </div>
                    : <div></div>}
            </div>
        );
    } else {
        return (
            <NotFound />
        )
    }
}

export default MyBeats;