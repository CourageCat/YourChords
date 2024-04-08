import classNames from "classnames/bind";
import styles from "./ListSongAll.module.scss";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "../../authorization/useToken";
import { faComment, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import Pagination from "@/components/Pagination";
import ListSplitter from "@/components/ListSplitter";
const cx = classNames.bind(styles);

function ListSongAll({search}) {
    const [listSongs, setListSongs] = useState([])
    const [listGenres, setListGenres] = useState([])
    const [genre, setGenre] = useState("")
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [searchSong, setSearchSong] = useState("")
    const admin = false;
    sessionStorage.setItem("Admin", JSON.stringify(admin))

    useEffect(() => {
        loadGenres()
    }, [])
    useEffect(() => {
        loadSongs()
    }, [page, search])

    const loadSongs = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/song/name?songname=${search}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setListSongs(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 10 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (page === i + 1) {
                            setListSongs(newGroup[i])
                        }
                    }
                    setPages(newGroup.length)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const loadGenres = async () => {
        await axiosInstance.get("http://localhost:8080/api/v1/genre")
            .then((res) => {
                setListGenres(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadSongsByGenre = async (e) => {
        await axiosInstance.get(`http://localhost:8080/api/v1/song/genre?genrename=${e}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setListSongs(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 10 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (page === i + 1) {
                            setListSongs(newGroup[i])
                        }
                    }
                    setPages(newGroup.length)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSearchSong = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/song/name?songname=${searchSong}`)
            .then((res) => {
                if (res.data.length === 0) {
                    setListSongs(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 10 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (page === i + 1) {
                            setListSongs(newGroup[i])
                        }
                    }
                    setPages(newGroup.length)
                }
            })
    }
    return (

        <div className={cx("list-songs")}>

            {/* <div className={cx("button-chords")}>
                <Link to="/chordsdetails">
                    <button variant="contained" className={cx("button")}>
                        <div className={cx("text")}>Chords</div>
                    </button>
                </Link>
                <Link to="/songs">
                    <button variant="contained" className={cx("button")}>
                        <div className={cx("text")}>Songs</div>
                    </button>
                </Link>
                <Link to="/listbeat2">
                    <button variant="contained" className={cx("button")}>
                        <div className={cx("text")}>List Beat</div>
                    </button>
                </Link>
                <div className={cx("line")}>
                </div>
            </div> */}
            <div className={cx("firstpart")}>
                <div className={cx("title")}>CHORDS OF SONGS</div>
            </div>
            <div className={cx("middle-moinoi")}>
                <div className={cx('body-right')}>
                    {listSongs.length !== 0 ?
                        <div>
                            <div className={cx('scroll-container')}>
                                {listSongs.map((song, index) => (
                                    <Link style={{ color: "black" }} to={`/song/${song.id}`}><div className={cx('song')} key={index}>

                                        <div className={cx("name-and-musician")}>
                                            {/* <img className={cx("img")} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} alt="anh" /> */}
                                            <div className={cx("number")}></div>
                                                <span>{index + 1}.</span>
                                            <div className={cx("song-name")}>
                                                <span style={{ fontWeight: 500 }}>{song.songName}</span>
                                                <span>{song.singer}</span>
                                            </div>
                                        </div>

                                        {/* <Popup trigger={<button className={cx("button-page")}>...</button>} position="bottom centers">
                                            <div className={cx("text-all")}>
                                                <div style={{ fontWeight: 500, fontSize: '2rem', padding: 5, display: 'flex', justifyContent: 'center', background: 'white' }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                        <path d="M6.25016 19.7917C6.25016 20.9375 7.18766 21.875 8.3335 21.875H16.6668C17.8127 21.875 18.7502 20.9375 18.7502 19.7917V7.29167H6.25016V19.7917ZM19.7918 4.16667H16.146L15.1043 3.125H9.896L8.85433 4.16667H5.2085V6.25H19.7918V4.16667Z" fill="black" />
                                                    </svg>
                                                    <a>Add to Playlist</a>
                                                </div>
                                            </div>
                                        </Popup> */}
                                    </div></Link>
                                ))}

                            </div>
                            {pages !== 1 ?
                                <div className={cx("pagination")}>
                                    <Pagination pages={pages} page={page} setPage={setPage} />
                                </div>
                                : <div></div>}
                        </div>
                        : <h1 style={{ textAlign: "center" }}> There are no songs in the system! </h1>}
                    {/* <div className={cx('pagination')}>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10L13 19L14.4 17.5L7 10L14.4 2.5L13 1L4 10Z" fill="black" />
                            </svg>
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.00001 1L5.60001 2.5L13 10L5.60001 17.5L7.00001 19L16 10L7.00001 1Z" fill="black" />
                            </svg>
                        </button>
                    </div> */}


                </div>
            </div>
        </div>
    );
}

export default ListSongAll;
