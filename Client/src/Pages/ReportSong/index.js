import classNames from "classnames/bind";
import styles from "./ReportSong.module.scss";
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

function ReportSong() {
    const [listSongs, setListSongs] = useState([])
    const [listGenres, setListGenres] = useState([])
    const [genre, setGenre] = useState("")
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [searchSong, setSearchSong] = useState("")
    const admin = true;
    sessionStorage.setItem("Admin", JSON.stringify(admin))

    useEffect(() => {
        loadSongs()
    }, [page])

    const loadSongs = async () => {
        await axiosInstance.get("http://localhost:8080/api/v1/admin/report/song")
            .then((res) => {
                if (res.data.length === 0) {
                    setListSongs(res.data)
                }
                else {
                    const newGroup = ListSplitter({ data: res.data, groupSize: 8 })
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

    return (

        <div className={cx("list-songs")}>
            <h1 className={cx("title")}> LIST OF SONGS REPORTED</h1>
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

            <div className={cx("middle-moinoi")}>
                <div className={cx('body-right')}>
                    {listSongs.length !== 0 ?
                        <div>
                            {console.log(listSongs)}
                            <div className={cx('scroll-container')}>
                                {listSongs.map((song, index) => (
                                    <div className={cx('song')} key={index}>
                                        <Link style={{ color: "black" }} to={`/song/${song.id}`}>
                                            <div className={cx("name-and-musician")}>
                                                <div className={cx('number-song')}>
                                                    <span>{index + 1}.</span>
                                                </div>
                                                <div className={cx('song-name')}>
                                                    <span style={{ fontWeight: 500 }}>{song.songName}</span>
                                                    <span>{song.singer}</span>
                                                </div>
                                            </div>
                                            {song.status === -1 ?
                                                <td class="text-center" style={{ width: 170, textAlign: "center", marginTop: 20 }}>
                                                    <span style={{ background: "red", padding: 5, height: 5, color: 'white', fontSize: '1.8rem', marginLeft: 10, borderRadius: 18 }} class={cx("label label-default")}>Banned</span>
                                                </td>
                                                :
                                                <td class="text-center" style={{ width: 170, textAlign: "center" }}>
                                                    <span style={{ background: "green", padding: 5, height: 5, color: 'white', fontSize: '1.8rem', margin: '0 auto', borderRadius: 18 }} class={cx("label label-default")}>Active</span>
                                                </td>
                                            }
                                        </Link>
                                    </div>
                                ))}

                            </div>
                            {pages !== 1 ?
                                <div className={cx("pagination")}>
                                    <Pagination pages={pages} page={page} setPage={setPage} />
                                </div>
                                : <div></div>}
                        </div>
                        : <div style={{ display: "flex", justifyContent: "center", marginBottom: 1000, fontSize: 25 }}> {console.log(listSongs)} There are no reportted songs in the system! </div>}

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

export default ReportSong;
