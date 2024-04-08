
import classNames from "classnames/bind";
import styles from "./ViewBeat.module.scss";
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
import ViewBeatBox from "../../components/viewBeatBox";
import Pagination from "../../components/Pagination";
import ListSplitter from "@/components/ListSplitter";

const cx = classNames.bind(styles);

function ListBeatPurchased() {

    //Comment lai cho nay
    const navigate = useNavigate()
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const [listGenres, setListGenres] = useState(null);
    // const [play, setPlay] = useState(false);
    // const [srcMusic, setSrcMusic] = useState("");
    // const audioRef = useRef();
    const token = useToken();
    const [checkLike, setCheckLike] = useState();
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    
    // 
    // const handleClickAudio = (value) => {

    //     setSrcMusic(`data:audio/mpeg;base64,${atob(value.beatSound)}`);
    //     console.log(srcMusic)

    // }

    // useEffect(() => {
    //     const data = DATA.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    //     setList(data);
    // }, [search])
    // // useEffect(() => {
    // //     const video = document.querySelector('video');
    // //     if (video) {
    // //         video.playbackRate = 1.5;
    // //     }
    // // }, []);

    // //Comment lai cho nay
    // console.log(play);
    //  UseEffect(() => {
    //     if (play) {
    //         audioRef.current.play();

    //     } else {

    //         audioRef.current.pause();
    //     }
    // }, [play])

    useEffect(() => {
        loadBeats()
    }, [checkLike, page])

    useEffect(() => {
        loadGenres()
    }, [])

    const loadBeats = async () => {
        if(!token){
            navigate("/login")
            return
        }
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/user/${jwtDecode(token).sub}/all`)
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

    const handleSearch = async() => {
        if(!token){
            navigate("/login")
        }
        if(search !== ""){
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/name/${search}`)
        .then((res) => {
            setList(res.data)
        })
        .catch((error) =>{
            console.log(error)
        })
    }else{
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/user/${jwtDecode(token).sub}/all/${page}`)
            .then(res => {
                setList(res.data.dtoList)
                setPages(res.data.max)
                console.log(pages)            
            })
            .catch((error) => {
                if (error.message.includes("Network")) {
                    navigate("/login")
                }
            })
    }
        // setList(data);
    }

        return (
            <div className={cx("list-header")}>
                {/* {listGenres && listMusicianName ?
                    <Sidebar listGenres={listGenres} listMusicianName={listMusicianName} page = {2}></Sidebar>
                    : <div></div>} */}
                <div className={cx("text-header")}>
                    <h1 className={cx("text-welcome")} style={{marginBottom:200}}>
                        My Beat
                    </h1>
                </div>

                {/* <div className={cx("list-beat")}>
                {list.map((item, index) => {
                    return <ListBeatBox key={index} name={item.name} type={item.type} price={item.price} member={item.member} play={play} setPlay={setPlay} />
                })}
            </div> */}
                {list.length !== 0  ?
                    <div style={{height:900}}>
                        <div className={cx("listbeat")}>
                            {list.map((item) => {
                                return <ViewBeatBox id={item.id} name={item.beatName} genre={item.genre} price={item.price} view={(item.view / 2).toFixed()} like={item.totalLike} handleLike={() => handleLike(item.id)} rating={item.rating} vocalRange={item.vocalRange} fullName={item.user.fullName} status={item.status} page={2} />
                            })}
                        </div>
                    </div>
                    : <div className={cx("sold-out")} style={{ zindex: '1', marginLeft: 800, height: 600 }}> All of your beats are sold out or you have not upload any beats<div> You can upload a new beat whenver you want </div> </div>}
                    {pages !== 1 ?
                        <div className={cx("pagination")}>
                            <Pagination pages={pages} page={page} setPage={setPage} />
                        </div>
                        : <div></div>}

                {/* <div className={cx("audio")}>

                <div className={cx("control")}>
                    <div className={cx("btn", "btn-prev")}>
                        <i className="fas fa-step-backward"></i>
                        <FontAwesomeIcon icon={faStepBackward} />
                    </div>
                    <div className={cx("btn", "btn-toggle-play")} onClick={() => setPlay(!play)}>
                        <FontAwesomeIcon icon={faPause} className={cx("icon-pause", "icon", {
                            "play": play === true,
                        })} />
                        <FontAwesomeIcon icon={faPlay} className={cx("icon-play", "icon", {
                            "play": play === false,
                        })} />
                    </div>
                    <div className={cx("btn", "btn-next")}>
                        <FontAwesomeIcon icon={faStepForward} />
                    </div>

                </div>
                <div className={cx("time-audio")}>
                    <span className={cx("start")}>0:00</span>
                    <input id="progress" className={cx("progress")} type="range" value="0" step="1" min="0" max="100" />
                    <span className={cx("end")}>0:00</span>
                </div>
            </div> */}
                {/* <audio style={{ borderRadius: 10 }} id="audio" ref={audioRef} src={srcMusic}>
            </audio> */}
            </div>
        );
}

export default ListBeatPurchased;