
import classNames from "classnames/bind";
import styles from "./ListBeatAll.module.scss";
import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ListBeatBox from "../../components/ListBeatBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import audio from "../../assets/audio";
import { ShopContext } from "../../context/shop-context";
import axiosInstance from "../../authorization/axiosInstance";
import Sidebar from "../../components/SideBar";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import Pagination from "../../components/Pagination";
import ListSplitter from "@/components/ListSplitter";

const cx = classNames.bind(styles);

function ListBeatAll({search}) {
    console.log(search)
    //Comment lai cho nay
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [listGenres, setListGenres] = useState(null);
    const [listMusicianName, setListMusicianName] = useState(null);
    const token = useToken();
    const [checkLike, setCheckLike] = useState();
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
        
    useEffect(() => {
        loadBeats()
    }, [checkLike, page, search])

    useEffect(() => {
        loadGenres()
    }, [])

    useEffect(() => {
        loadMusicianName()
    }, [])

    const loadBeats = async () => {
        if(search !== ""){
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/name/${search}`)
            .then(res => {
                if (res.data.length === 0) {
                    setList(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 8 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (page === i + 1) {
                            setList(newGroup[i])
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
        } else{
            await axiosInstance.get(`http://localhost:8080/api/v1/beat/all`)
            .then(res => {
                if (res.data.length === 0) {
                    setList(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 8 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (page === i + 1) {
                            setList(newGroup[i])
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
    }

    //
    const loadGenres = async () => {
        await axiosInstance.get("http://localhost:8080/api/v1/genre")
            .then((res) => {
                setListGenres(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadMusicianName = async () => {
        await axiosInstance.get("http://localhost:8080/api/v1/user/musician/name")
            .then((res) => {
                setListMusicianName(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleLike = async (id) => {
        if (!token) {
            navigate("/login")
            return
        } else {
            await axiosInstance.post(`http://localhost:8080/api/v1/beat/like/${jwtDecode(token).sub}/${id}`)
                .then((res) => {
                    setCheckLike(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleSearch = async () => {
        if (search !== "") {
            await axiosInstance.get(`http://localhost:8080/api/v1/beat/name/${search}`)
                .then((res) => {
                    setList(res.data)
                    setPages(1)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            loadBeats()
        }
        // setList(data);
    }

    const handleSearchByGenres = async (e) => {
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/genre/${e}`)
            .then((res) => {
                setList(res.data)
                setPages(1)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSearchByMusicianName = async (e) => {
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/musician/${e}`)
            .then((res) => {
                setList(res.data)
                setPages(1)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className={cx("list-header")}>
            {console.log(list)}
            {/* {listGenres && listMusicianName ?
                <Sidebar listGenres={listGenres} listMusicianName={listMusicianName} handleSearchByGenres={handleSearchByGenres} handleSearchByMusicianName={handleSearchByMusicianName} page={1}></Sidebar>
                : <div></div>} */}
            <div className={cx("text-header")}>
                <h1 className={cx("text-welcome")}>
                    Welcome To Our Beats
                </h1>

            </div>
            {list.length !== 0 ?
                <div style={{height:900}}>
                    <div className={cx("listbeat")}>
                        {list.map((item) => {
                            return <ListBeatBox id={item.id} name={item.beatName} genre={item.genre} price={item.price} view={(item.view / 2).toFixed()} like={item.totalLike} handleLike={() => handleLike(item.id)} rating={item.rating} vocalRange={item.vocalRange} fullName={item.user.fullName} setOpenFailedSnackBar={setOpenFailedSnackBar} setMessageFailed={setMessageFailed} setOpenSuccessSnackBar={setOpenSuccessSnackBar} setMessageSuccess={setMessageSuccess} />
                        })}

                    </div>
                    
                </div>
                

                : <div className={cx("sold-out")} style={{ zindex: '1', marginLeft: 800, height: 800 }}> Can not find beat that matches your search!<div> Thank you for your visiting on our website </div> </div>}
                {pages !== 1 ?
                        <div className={cx("pagination")}>
                            <Pagination pages={pages} page={page} setPage={setPage} />
                        </div>
                        : <div></div>}

            <Snackbar open={openSuccessSnackBar} autoHideDuration={500} onClose={() => setOpenSuccessSnackBar(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }} >
                <Alert variant="filled" onClose={() => setOpenSuccessSnackBar(false)} severity="success" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                    {messageSuccess}
                </Alert>
            </Snackbar>
            <Snackbar open={openFailedSnackBar} autoHideDuration={2000} onClose={() => setOpenFailedSnackBar(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }}>
                <Alert variant="filled" onClose={() => setOpenFailedSnackBar(false)} severity="error" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                    {messageFailed}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ListBeatAll;