import classNames from "classnames/bind";
import styles from "./ViewDetailBeat.module.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Avatar, Box, Button, IconButton, Menu, MenuItem, Modal, Snackbar, Tooltip, Typography } from "@mui/material";
import axiosInstance from '../../authorization/axiosInstance';
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import useToken from '../../authorization/useToken';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Pagination from "@/components/Pagination";
const cx = classNames.bind(styles);

function ViewDetailBeat() {
    const { addToCart, checkAddToCart, addToCartMessage, setCheckAddToCart } = useContext(ShopContext)
    const { beatId } = useParams();
    const [beatDetail, setBeatDetail] = useState(null)
    const [listMusicianBeat, setListMusicianBeat] = useState(null)
    const audioRef = useRef();
    const token = useToken();
    const [rating, setRating] = useState(0)
    const [checkLike, setCheckLike] = useState(false)
    const [beatSoundDemo, setBeatSoundDemo] = useState("")
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    let userId = ""
    if (token) {
        userId = jwtDecode(token).sub
    }

    useEffect(() => {
        const loadDetailBeat = async () => {
            await axiosInstance.get(`http://localhost:8080/api/v1/beat/${beatId}`)
                .then((res) => {
                    setBeatDetail(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        loadDetailBeat()
    }, [beatId])


    useEffect(() => {
        loadMusicianBeat()
    }, [beatDetail])

    useEffect(() => {
        loadSoundDemo()
    }, [beatId])

    useEffect(() => {
        loadCheckLike()
    }, [beatId])

    useEffect(() => {
        const loadRating = async () => {
            await axiosInstance.get(`http://localhost:8080/api/v1/beat/rate/user/${userId}/${beatId}`)
                .then((res) => {
                    setRating(res.data.star)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        loadRating()
    },[beatId])

    const loadCheckLike = async () => {
        if (!token) {
            return
        }
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/check/${userId}/${beatId}`)
            .then((res) => {
                setCheckLike(res.data)
            })
            .catch((error) => {
                setCheckLike(error.message.data)
            })
    }

    const Heart = ({ id }) => {
        return (<svg className={cx("new-icon-like")} id={id} width="155" height="130" viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M112.577 6.51645L112.588 6.51678L112.598 6.51707C124.83 6.85668 134.648 13.4871 139.798 25.162C147.658 42.9826 142.048 60.4882 131.657 75.7368C121.27 90.9784 106.855 102.747 99.8285 107.966C92.3832 113.495 84.0338 118.699 75 123.419C65.9653 118.698 57.6161 113.496 50.1717 107.966L50.1715 107.966C43.1455 102.747 28.7296 90.9784 18.3433 75.7368C7.95214 60.4882 2.34207 42.9826 10.2021 25.162L10.2022 25.1617C15.3515 13.4855 25.1696 6.85669 37.4015 6.51709L37.4155 6.51667C49.4687 6.15616 62.0214 12.1853 69.9783 21.8669L75 27.9771L80.0217 21.8669C87.982 12.1812 100.536 6.14284 112.577 6.51645Z" stroke="white" strokeWidth="13" />
        </svg>)
    }

    const handleLikeClick = (id) => {
        setBeatDetail({ ...beatDetail, totalLike: checkLike ? beatDetail.totalLike - 1 : beatDetail.totalLike + 1 })
        setCheckLike(!checkLike)
        handleLike(id)
    }
    const loadSoundDemo = async () => {
        await axiosInstance(`http://localhost:8080/api/v1/beat/user/demo/${beatId}`)
            .then((res) => {
                setBeatSoundDemo((res.data.beatSound))
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const handleLike = async (id) => {
        if (!token) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You need to login before using this function!")
            setCheckLike(false)
        } else {
            await axiosInstance.post(`http://localhost:8080/api/v1/beat/like/${jwtDecode(token).sub}/${id}`)
                .catch((error) => {
                    setOpenFailedSnackBar(true)
                    setMessageFailed("Error when using this function!")
                    console.log(error)
                    window.location.reload()
                })
        }
    }

    const loadMusicianBeat = async () => {

        if (beatDetail === null) {
            return
        }

        await axiosInstance.get(`http://localhost:8080/api/v1/beat/user/musician/${beatDetail.user.id}/all/${page}`)
            .then((res) => {
                setListMusicianBeat(res.data.dtoList)
                setPages(res.data.max)

            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRating = async (e) => {
        if (!token) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You need to login before using this function!")
        } else {
            await axiosInstance.post(`http://localhost:8080/api/v1/rate/beat/rating/${jwtDecode(token).sub}/${beatId}`, { rate: e.target.value })
                .then((res) => {
                    setOpenSuccessSnackBar(true)
                    setMessageSuccess("Rating Successfully")
                })
                .catch((error) => {
                    setOpenFailedSnackBar(true)
                    setMessageFailed("Rating Failed!")
                    console.log(error)
                })
        }
    }

    if (listMusicianBeat !== null) {
        const dateReleasing = new Date(beatDetail.creatAt)
        const month = dateReleasing.getUTCMonth() + 1
        const day = dateReleasing.getUTCDate()
        const year = dateReleasing.getUTCFullYear()
        return (
            <div className={cx("first-container")}>
                {console.log("Total Like: " + beatDetail.totalLike)}
                <div className={cx('view-detail')}>
                    <div className={cx('view-detail-beat')}>
                        <div className={cx('detail-1')}>
                            <div className={cx('mid-detail-left')}>
                                <div>
                                    <div className={cx('container')}>
                                        <img className={cx('image')} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} />
                                    </div>
                                    <div className={cx('information')}>
                                        {console.log(beatDetail)}
                                        <h1><b style={{ color: 'white' }}>{beatDetail.beatName}</b></h1>
                                        <h4 style={{ fontWeight: 500, color: 'white', fontSize: '2.2rem' }}> {beatDetail.description} &#x2022; 2023 </h4>
                                    </div>
                                    <div style={{ marginTop: -60 }}>
                                        <audio className={cx("audio")} id="audio" ref={audioRef} controls src={beatSoundDemo}>
                                        </audio>
                                        {token ?
                                            <div className={cx("container-like")}>
                                                <Stack className={cx("rating-form")} spacing={1}>
                                                    <Rating className={cx("start-icon")} name="size-large" defaultValue={rating} size="large" onChange={(e) => [handleRating(e), setRating(e.target.value)]} />
                                                </Stack>
                                                <div style={{ marginTop: 50, fontWeight: "bold", fontSize: 20, marginLeft: 10 }}>{rating}</div>
                                                <button className={cx("button")} onClick={() => handleLikeClick(beatDetail.id)}>
                                                    {console.log(checkLike)}
                                                    <Heart id={checkLike ? cx('favorite-stroke') : cx('favorite-filled')} />
                                                </button>
                                                <div style={{ marginTop: 50, fontWeight: "bold", fontSize: 20, marginRight: 200, marginLeft: 10 }}>{beatDetail.totalLike}</div>
                                            </div>
                                            :
                                            <div className={cx("container-like")}>
                                                <Stack className={cx("rating-form")} spacing={1}>
                                                    <Rating className={cx("start-icon")} name="size-large" defaultValue={rating} size="large" onChange={(e) => [handleRating(e), setRating(e.target.value)]} />
                                                </Stack>
                                                <button style={{marginRight:180}} className={cx("button")} onClick={() => handleLikeClick(beatDetail.id)}>
                                                    {console.log(checkLike)}
                                                    <Heart id={checkLike ? cx('favorite-stroke') : cx('favorite-filled')} />
                                                </button>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('mid-detail-right')}>
                                <Link style={{ color: "white" }} to={`/viewdetailsmusician/${beatDetail.user.id}`}><h3><b style={{ fontSize: '3rem' }}>Musician information</b></h3></Link>
                                <div className={cx('info-musician')}>
                                    <span style={{ fontSize: '2rem' }} >&#x2022; Name: {beatDetail.user.fullName} </span>
                                    <span style={{ fontSize: '2rem' }} >&#x2022; Contact: {beatDetail.user.mail}</span>
                                    <span style={{ fontSize: '2rem' }} >&#x2022; Profession: {beatDetail.professional}</span>
                                    <span style={{ fontSize: '2rem' }} >&#x2022; Years of operation: {beatDetail.year} years</span>
                                    <span style={{ fontSize: '2rem' }} >&#x2022; Number of beats: {listMusicianBeat.length} </span>
                                    <span style={{ fontSize: '2rem' }} >&#x2022; Prize: {beatDetail.prize}</span>
                                </div>
                                <h3 style={{ marginTop: 30, fontSize: '3rem' }} ><b >Beat information</b></h3>
                                <div className={cx('list')}>
                                    <div className={cx('genre')}>
                                        <span style={{ fontSize: '2rem' }} >&#x2022; Beat's Name: {beatDetail.beatName}</span>
                                        {beatDetail.genres !== null ?
                                            <span style={{ fontSize: '2rem' }} >&#x2022; Genre:
                                                {
                                                    beatDetail.genres.map((item, index) => {
                                                        return <span style={{ fontSize: '2rem' }} >  {item.name}</span>
                                                    })

                                                }
                                            </span>
                                            :
                                            <span>&#x2022; Genre:

                                            </span>
                                        }
                                        <span style={{ fontSize: '2rem' }} >&#x2022; Price: ${beatDetail.price}</span>
                                        {/* <span style={{ fontSize: '2rem' }} >&#x2022; Views: {(beatDetail.view / 2).toFixed()}</span> */}
                                        <span style={{ fontSize: '2rem' }} >&#x2022; Tone: {beatDetail.vocalRange}</span>
                                        <span style={{ fontSize: '2rem' }}  >&#x2022; Total Rating: {(beatDetail.totalRating)}</span>
                                        <span style={{ fontSize: '2rem' }} >&#x2022; Release date: {day}/{month}/{year}</span>
                                    </div>
                                    {beatDetail.status === 1 ?
                                        <div>
                                            {token ? <div className={cx('mid-button')}>
                                                {console.log(beatId)}
                                                <Button variant="contained" className={cx('button-1')} style={{ borderRadius: 15, outline: '3px solid white', marginTop: 40 }} onClick={() => [addToCart(beatId)]}>
                                                    <div style={{ fontSize: '1.4rem', textWrap: 'nowrap' }} >Add to cart</div>
                                                </Button>
                                            </div>
                                                : <div className={cx('mid-button')}>
                                                    <Button variant="contained" className={cx('button-1')} style={{ borderRadius: 15, outline: '3px solid white', marginTop: 40 }} onClick={() => [setOpenFailedSnackBar(true), setMessageFailed("You need to login before using this function!")]}>
                                                        <div>Add to cart</div>
                                                    </Button>
                                                </div>
                                            }
                                        </div>
                                        : <h2 style={{ color: "#e81f00", marginTop: 100, marginLeft: 50 }}>Beat is sold out!</h2>}
                                </div>
                            </div>
                        </div>
                        <div className={cx('total-detail')}>
                            <div className={cx('title-detail')}>
                                <span style={{ fontSize: '3rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', marginLeft: -70 }}>Beats List</span>
                            </div>

                            {listMusicianBeat.map((item, index) => {
                                if (item.status === 1) {
                                    return (

                                        <div className={cx('detail-2')}>
                                            <div className={cx('mid-detail-left-2')}>
                                                <div className={cx('container')}>
                                                    <img className={cx('image-1')} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} />
                                                </div>
                                            </div>
                                            <div className={cx('mid-detail-right-2')}>
                                                <div className={cx('text-2')}>
                                                    <h4 className={cx("musician-beat")}><b><Link style={{ color: 'white', fontSize: '2rem' }} to={`/viewdetailbeat/${item.id}`}>{item.beatName}</Link></b></h4>
                                                    <span className={cx("musician-name")} style={{ fontSize: '1.8rem', color: '#FFFFFF90' }}>{item.user.fullName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className={cx('detail-2')}>
                                            <div className={cx('mid-detail-left-2')}>
                                                <div className={cx('container')}>
                                                    <img className={cx('image-1')} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} />
                                                </div>
                                            </div>
                                            <div className={cx('mid-detail-right-2')}>
                                                <div className={cx('text-2')}>
                                                    <h4 className={cx("musician-beat")}><b><Link style={{ color: 'white', fontSize: '2rem' }} to={`/viewdetailbeat/${item.id}`}>{item.beatName}</Link></b></h4>
                                                    <span className={cx("musician-name")} style={{ fontSize: '1.8rem', color: '#FFFFFF90' }}>{item.user.fullName}</span>
                                                </div>
                                            </div>
                                            <img style={{ width: 100, height: 80, marginTop: 20, marginLeft: 70, marginBottom: 20 }} src={require("../../assets/images/Other/pngimg.com - sold_out_PNG43.png")} />
                                        </div>
                                    )
                                }
                            })}
                            {pages !== 1 ?
                                <div className={cx("pagination")}>
                                    <Pagination pages={pages} page={page} setPage={setPage} />
                                </div>
                                : <div></div>}
                        </div>
                    </div>
                </div>
                <Snackbar open={openSuccessSnackBar} autoHideDuration={2000} onClose={() => setOpenSuccessSnackBar(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }} >
                    <Alert variant="filled" onClose={() => setOpenSuccessSnackBar(false)} severity="success" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                        {messageSuccess}
                    </Alert>
                </Snackbar>
                <Snackbar open={openFailedSnackBar} autoHideDuration={2000} onClose={() => setOpenFailedSnackBar(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }}>
                    <Alert variant="filled" onClose={() => setOpenFailedSnackBar(false)} severity="error" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                        {messageFailed}
                    </Alert>
                </Snackbar>

                <Snackbar open={checkAddToCart === 1} autoHideDuration={500} onClose={() => setCheckAddToCart(0)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }} >
                    <Alert variant="filled" onClose={() => setCheckAddToCart(0)} severity="success" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                        {addToCartMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={checkAddToCart === 2} autoHideDuration={500} onClose={() => setCheckAddToCart(0)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }}>
                    <Alert variant="filled" onClose={() => setCheckAddToCart(0)} severity="warning" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                        {addToCartMessage}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
    else {
        return <h1 className={cx('first-container')}>Loading Page...</h1>
    }
}
export default ViewDetailBeat;