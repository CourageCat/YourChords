import classNames from "classnames/bind";
import styles from "./ViewDetailBeat.module.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import axiosInstance from '../../authorization/axiosInstance';
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/shop-context';
import useToken from '../../authorization/useToken';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import music from "../../assets/audio/Dont_Coi.mp3";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const cx = classNames.bind(styles);

function ViewDetailBeat() {
    const { addToCart } = useContext(ShopContext)
    const { beatId } = useParams();
    const [beatDetail, setBeatDetail] = useState(null)
    const [listMusicianBeat, setListMusicianBeat] = useState(null)
    const [play, setPlay] = useState(false);
    const audioRef = useRef();
    const token = useToken();
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [checkLike, setCheckLike] = useState(null)
    const [checkRating, setCheckRating] = useState("")
    const [data, setData] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [isCommenting, setIsCommenting] = useState(false);
    const [content, setContent] = useState('');
    const [listBeatComment, setListBeatComment] = useState([]);
    const [checkComment, setCheckComment] = useState(null)
    let userId = ""
    if (token) {
        userId = jwtDecode(token).sub
    }
    // Comment Parent
    const [parentId, setParentId] = useState("0")
    const commentParent = { beatId, userId, parentId, content }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCommentClick = () => {
        setIsCommenting(true);
    };

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handlePostComment = () => {
        console.log('Posted comment:', content);
        setIsCommenting(false);
        setContent('');
    };

    useEffect(() => {
        loadDetailBeat()

    }, [beatId, checkLike, checkRating])


    useEffect(() => {
        loadMusicianBeat()
    }, [beatDetail])

    useEffect(() => {
        loadBeatComment()
    }, [checkComment])

    const loadBeatComment = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/comment/beat/${beatId}`)
            .then((res) => {
                setListBeatComment(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const loadDetailBeat = async () => {

        await axiosInstance.get(`http://localhost:8080/api/v1/beat/${beatId}`)
            .then((res) => {
                setBeatDetail(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleLike = async (id) => {
        if (!token) {
            navigate("/login")
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

    const loadMusicianBeat = async () => {
        
        if (beatDetail === null) {
            return
        }

        await axiosInstance.get(`http://localhost:8080/api/v1/beat/user/${beatDetail.user.id}/all`)
            .then((res) => {
                setListMusicianBeat(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleRating = async (e) => {
        if (!token) {
            navigate("/login")
        } else {
            await axiosInstance.post(`http://localhost:8080/api/v1/beat/ratingStar/${jwtDecode(token).sub}/${beatId}`, { rating: e.target.value })
                .then((res) => {
                    setCheckRating("Rating Successfully")
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const handleComment = (e) => {
        setContent(e.target.value)
        console.log(content)
    }

    const handlePostCommentParent = async (e) => {
        console.log(content)
        console.log(commentParent)
        await axiosInstance.post("http://localhost:8080/api/v1/comment/beat/addComment",commentParent)
        .then((res) => {
            setCheckComment(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    if (listMusicianBeat !== null) {
        const dateReleasing = new Date(beatDetail.creatAt)
        const month = dateReleasing.getUTCMonth() + 1
        const day = dateReleasing.getUTCDate()
        const year = dateReleasing.getUTCFullYear()

        return (

            <div>
                <Link to={"/listbeat"}>
                    <Button variant="contained" className={cx("back-to-shop")}>
                        <div>Back to Shop</div>
                    </Button>
                </Link>
                {/* <div className={cx("text-header")}>
                <h1>
                    Beats Name
                </h1>
                <div className={cx('header-submit')}>
                    <Button variant="contained" className={cx('button-1')}>
                        <div>Share Beat</div>
                    </Button>
                </div>
            </div> */}
                <div className={cx('view-detail')}>


                    <div className={cx('view-detail-beat')}>
                        <div className={cx('detail-1')}>
                            <div className={cx('mid-detail-left')}>
                                <div>
                                    <div className={cx('container')}>

                                        <img className={cx('image')} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} />
                                        <div className={cx('middle-image')}>
                                            {/* <div className={cx('text')}>Click</div> */}
                                            <Button variant="contained" className={cx('button-1')}>
                                                <div>Click</div>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className={cx('information')}>
                                        <h1><b>{beatDetail.beatName}</b></h1>
                                        <h4> {beatDetail.user.fullName} &#x2022; 2023 </h4>

                                    </div>
                                    {/* <div className={cx('button-submit')}>
                            <Button variant="contained" className={cx('button-1')}>
                                <div>Follow</div>
                            </Button>
                            <Button variant="contained" className={cx('button-1')}>
                                <div>Message</div>
                            </Button>
                        </div> */}
                                    <Stack className={cx("rating-form")} spacing={1}>
                                        <Rating className={cx("start-icon")} name="size-large" defaultValue={0} size="large" onChange={handleRating} />
                                    </Stack>
                                    <div>{checkRating}</div>
                                </div>
                            </div>

                            <div className={cx('mid-detail-right')}>
                                <h3><b>Musician information</b></h3>
                                <div className={cx('info-musician')}>
                                    <span>&#x2022; Name: {beatDetail.user.fullName} </span>
                                    <span>&#x2022; Contact: {beatDetail.user.mail}</span>
                                    <span>&#x2022; Profession: Singer, Musician</span>
                                    <span>&#x2022; Years of operation: 2018–present</span>
                                    <span>&#x2022; Number of beats: {listMusicianBeat.length} </span>
                                    <span>&#x2022; Prize: Zing MP3 - Best of 2022, Green Wave 2022, Golden Apricot Award...</span>
                                </div>
                                <h3><b>Beat information</b></h3>
                                <div className={cx('icon-like')} onClick={() => handleLike(beatDetail.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                        <path d="M36 20.88C36 18.99 34.47 18 32.4 18H26.37C26.82 16.38 27 14.85 27 13.5C27 8.27995 25.56 7.19995 24.3 7.19995C23.49 7.19995 22.86 7.28995 22.05 7.73995C21.78 7.91995 21.69 8.09995 21.6 8.36995L20.7 13.23C19.71 15.75 17.28 18 15.3 19.53V32.4C16.02 32.4 16.74 32.76 17.64 33.21C18.63 33.66 19.62 34.2 20.7 34.2H29.25C31.05 34.2 32.4 32.76 32.4 31.5C32.4 31.23 32.4001 31.0499 32.3101 30.8699C33.3901 30.4199 34.2 29.52 34.2 28.35C34.2 27.81 34.1101 27.36 33.9301 26.91C34.6501 26.46 35.2801 25.65 35.2801 24.75C35.2801 24.21 35.01 23.67 34.74 23.22C35.46 22.68 36 21.78 36 20.88ZM34.1101 20.88C34.1101 22.05 32.9401 22.14 32.7601 22.68C32.5801 23.31 33.4801 23.49 33.4801 24.57C33.4801 25.65 32.13 25.65 31.95 26.28C31.77 27 32.4 27.18 32.4 28.26V28.44C32.22 29.34 30.87 29.4299 30.6 29.7899C30.33 30.2399 30.6 30.42 30.6 31.41C30.6 31.95 29.97 32.31 29.25 32.31H20.7C19.98 32.31 19.26 31.95 18.36 31.5C17.64 31.14 16.92 30.78 16.2 30.6V21.15C18.45 19.44 21.33 16.92 22.41 13.77V13.59L23.22 9.08995C23.58 8.99995 23.85 8.99995 24.3 8.99995C24.48 8.99995 25.2 10.08 25.2 13.5C25.2 14.85 24.93 16.29 24.48 18H24.3C23.76 18 23.4 18.36 23.4 18.9C23.4 19.44 23.76 19.8 24.3 19.8H32.4C33.3 19.8 34.1101 20.25 34.1101 20.88Z" fill="#699BF7" />
                                        <path d="M14.4 34.2H8.99995C8.00995 34.2 7.19995 33.39 7.19995 32.4V19.8C7.19995 18.81 8.00995 18 8.99995 18H14.4C15.39 18 16.2 18.81 16.2 19.8V32.4C16.2 33.39 15.39 34.2 14.4 34.2ZM8.99995 19.8V32.4H14.4V19.8H8.99995Z" fill="#699BF7" />
                                    </svg>
                                    <span>{beatDetail.totalLike}</span>
                                </div>
                                {/* <div className={cx('list-of-beats')}>
                                <div className={cx('cart')}>
                                    <span>$25.00</span>
                                    <span>Standard License</span>
                                    <span>MP3</span>
                                </div>
                                <div className={cx('cart')}>
                            <span>$25.00</span>
                            <span>Standard License</span>
                            <span>MP3</span>
                        </div>
                        <div className={cx('cart')}>
                            <span>$25.00</span>
                            <span>Standard License</span>
                            <span>MP3</span>
                        </div>
                        <div className={cx('cart')}>
                            <span>$25.00</span>
                            <span>Standard License</span>
                            <span>MP3</span>
                        </div>
                        <div className={cx('cart')}>
                            <span>$25.00</span>
                            <span>Standard License</span>
                            <span>MP3</span>
                        </div>
                            </div> */}
                                <div className={cx('list')}>
                                    <div className={cx('genre')}>
                                        <span>&#x2022; Beat's Name: {beatDetail.beatName}</span>
                                        <span>&#x2022; Genre:
                                            {
                                                beatDetail.genres.map((item, index) => {
                                                    return <span> {item.name},</span>
                                                })

                                            }
                                        </span>
                                        <span>&#x2022; Price: ${beatDetail.price}</span>
                                        <span>&#x2022; Views: {(beatDetail.view / 2).toFixed()}</span>
                                        <span>&#x2022; Tone: {beatDetail.vocalRange}</span>
                                        <span>&#x2022; Total Rating: {(beatDetail.totalRating)}</span>
                                        <span>&#x2022; Release date: {day}/{month}/{year}</span>
                                    </div>
                                    {token ? <div className={cx('mid-button')}>
                                        <Button variant="contained" className={cx('button-1')} onClick={() => addToCart(beatId)}>
                                            <div>Add to cart</div>
                                        </Button>
                                        <Link to={"/viewCart"}>
                                            <Button variant="contained" className={cx('button-1')}>
                                                <div>View Cart</div>
                                            </Button>
                                        </Link>
                                    </div>
                                        : <div className={cx('mid-button')}>
                                            <Link to={"/login"}>
                                                <Button variant="contained" className={cx('button-1')}>
                                                    <div>Add to cart</div>
                                                </Button>
                                            </Link>
                                            <Link to={"/login"}>
                                                <Button variant="contained" className={cx('button-1')}>
                                                    <div>View Cart</div>
                                                </Button>
                                            </Link>
                                        </div>
                                    }


                                </div>

                            </div>
                        </div>

                        <div className={cx('total-detail')}>
                            <div className={cx('title-detail')}>
                                <span>Song List</span>
                            </div>

                            {listMusicianBeat.map((item, index) => {
                                return (
                                    <div className={cx('detail-2')}>
                                        <div className={cx('mid-detail-left-2')}>
                                            <div className={cx('container')}>
                                                <img className={cx('image-1')} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} />
                                                <div className={cx('middle-image-2')}>
                                                    <Button variant="contained" className={cx('button-3')}>
                                                        <div>Click</div>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('mid-detail-right-2')}>
                                            <div className={cx('text-2')}>
                                                <h4 className={cx("musician-beat")}><b><Link to={`/viewdetailbeat/${item.id}`}>{item.beatName}</Link></b></h4>
                                                <span className={cx("musician-name")}>{item.user.fullName}</span>
                                            </div>
                                            <div className={cx('icon')}>
                                                <div className={cx('icon-mic')}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                                        <path d=" M29.5313 3.16407C27.7667 3.16287 26.0225 3.54157 24.4172 4.27443C22.8119 5.0073 21.3833 6.07714 20.2282 7.41126C19.0732 8.74538 18.219 10.3125 17.7235 12.0062C17.228 13.6998 17.1029 15.4803 17.3567 17.2266L5.05203 34.0066C4.702 34.4795 4.53404 35.0626 4.57891 35.6492C4.62378 36.2357 4.87848 36.7865 5.29636 37.2006L7.81003 39.7143C8.2243 40.1318 8.77503 40.3863 9.36151 40.4311C9.94799 40.476 10.531 40.3083 11.004 39.9586L27.7841 27.6539C29.4542 27.8884 31.1548 27.777 32.7801 27.3266C34.4054 26.8763 35.9208 26.0967 37.2322 25.0361C38.5436 23.9755 39.6229 22.6567 40.4032 21.1615C41.1835 19.6663 41.6481 18.0267 41.7681 16.3444C41.8881 14.6621 41.661 12.9731 41.1009 11.3823C40.5408 9.79143 39.6596 8.33272 38.5121 7.09673C37.3646 5.86073 35.9752 4.87383 34.4303 4.19731C32.8854 3.52079 31.2179 3.1691 29.5313 3.16407ZM39.7266 15.4688C39.7288 17.8082 38.9214 20.0764 37.4415 21.8883L23.1136 7.5586C24.6081 6.34334 26.4166 5.57675 28.3292 5.34776C30.2418 5.11877 32.1801 5.43676 33.9193 6.26486C35.6584 7.09295 37.1272 8.39719 38.1551 10.0263C39.183 11.6554 39.7279 13.5425 39.7266 15.4688ZM9.75593 38.2482C9.68814 38.298 9.60475 38.3218 9.5209 38.3154C9.43704 38.3089 9.35828 38.2726 9.2989 38.2131L6.78699 35.7012C6.72743 35.6418 6.69113 35.563 6.68468 35.4792C6.67823 35.3953 6.70206 35.3119 6.75183 35.2441L18.0405 19.8527C18.6615 21.4692 19.6152 22.9371 20.8398 24.1614C22.0644 25.3856 23.5325 26.339 25.1491 26.9596L9.75593 38.2482ZM19.336 15.4688C19.3351 13.1295 20.1423 10.8617 21.6212 9.04922L35.9526 23.3789C34.4571 24.5916 32.6487 25.356 30.7368 25.5836C28.8249 25.8113 26.8876 25.4929 25.1491 24.6653C23.4107 23.8378 21.9421 22.5348 20.9133 20.9073C19.8846 19.2797 19.3377 17.3942 19.336 15.4688ZM19.0284 25.9717C19.1265 26.0696 19.2042 26.186 19.2573 26.314C19.3104 26.442 19.3377 26.5793 19.3377 26.7179C19.3377 26.8565 19.3104 26.9937 19.2573 27.1218C19.2042 27.2498 19.1265 27.3661 19.0284 27.4641L17.6221 28.8703C17.5242 28.9683 17.4078 29.046 17.2798 29.0991C17.1518 29.1521 17.0145 29.1794 16.876 29.1794C16.7374 29.1794 16.6001 29.1521 16.4721 29.0991C16.3441 29.046 16.2278 28.9683 16.1298 28.8703C16.0318 28.7723 15.954 28.656 15.901 28.528C15.848 28.3999 15.8207 28.2627 15.8207 28.1241C15.8207 27.9855 15.848 27.8483 15.901 27.7203C15.954 27.5923 16.0318 27.4759 16.1298 27.3779L17.536 25.9717C17.6339 25.8732 17.7502 25.7951 17.8784 25.7417C18.0065 25.6883 18.1439 25.6608 18.2827 25.6606C18.4215 25.6604 18.559 25.6877 18.6873 25.7408C18.8155 25.7938 18.9321 25.8717 19.0302 25.9699L19.0284 25.9717Z" fill="#699BF7" />
                                                    </svg>
                                                </div>
                                                <div className={cx('icon-heart')}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                                        <path d="M32.5446 0C28.3962 0 24.7641 2.08174 22.5 5.60054C20.2359 2.08174 16.6038 0 12.4554 0C9.15313 0.00434338 5.98723 1.53707 3.6522 4.26191C1.31717 6.98675 0.00372202 10.6812 0 14.5347C0 30.9448 20.8507 44.2276 21.7386 44.7762C21.9726 44.9231 22.2343 45 22.5 45C22.7657 45 23.0273 44.9231 23.2614 44.7762C24.1493 44.2276 45 30.9448 45 14.5347C44.9963 10.6812 43.6828 6.98675 41.3478 4.26191C39.0128 1.53707 35.8469 0.00434338 32.5446 0ZM22.5 40.9784C18.8317 38.4841 3.21429 27.1212 3.21429 14.5347C3.21747 11.6758 4.19211 8.93504 5.92446 6.9135C7.6568 4.89195 10.0055 3.75461 12.4554 3.75088C16.3627 3.75088 19.6433 6.17958 21.0134 10.0805C21.1345 10.4245 21.3405 10.7187 21.6052 10.9257C21.8699 11.1328 22.1813 11.2433 22.5 11.2433C22.8187 11.2433 23.1301 11.1328 23.3948 10.9257C23.6595 10.7187 23.8655 10.4245 23.9866 10.0805C25.3567 6.17255 28.6373 3.75088 32.5446 3.75088C34.9945 3.75461 37.3432 4.89195 39.0755 6.9135C40.8079 8.93504 41.7825 11.6758 41.7857 14.5347C41.7857 27.1025 26.1643 38.4817 22.5 40.9784Z" fill="#699BF7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                            })}



                        </div>
                    </div>
                </div>

                {/* Comment */}

                <div className={cx('comment-all')}>
                    <div className={cx('comment')}>
                        <textarea id="ABC" name="ABC" rows="2" cols="174" placeholder=' Comment...' onChange={handleComment} ></textarea>
                        {!token ?
                            <Link to={"/login"}>
                                <div className={cx('post-button')}>
                                    <button>Post a comment</button>
                                </div>
                            </Link>
                            : <div className={cx('post-button')} onClick={() => handlePostCommentParent()}>
                                <button>Post a comment</button>
                            </div>
                        }
                        <div>
                            <select name="comment" id="comment">
                                <option value="Latest comments">Latest comments</option>
                                <option value="Oldest comment">Oldest comment</option>
                            </select>
                        </div>
                        {listBeatComment.length !== 0 ? <div>
                            {listBeatComment.map((comment, index) => {
                                return (
                                    <div className={cx('show-comment-of-cus')}>
                                        <div className={cx('show-comment-left')}>
                                            <img className={cx('background-image')} src="https://static.hopamchuan.com/assets/images/default-ava.png" />
                                        </div>
                                        <div className={cx('show-comment-right')}>
                                            <div className={cx('comment-item-username')}>
                                                <span className={cx('username')}>Toi la Customer</span>
                                            </div>
                                            <div className={cx('comment-username')}>
                                                <div className={cx('text-comment-username')}>
                                                    <span>{comment.content}</span>
                                                </div>
                                                <div className={cx('edit-delete')}>
                                                    <React.Fragment>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                                            <Tooltip title="Chỉnh sửa hoặc xóa bình luận này">
                                                                <IconButton
                                                                    onClick={handleClick}
                                                                    size="small"
                                                                    sx={{ ml: 2 }}
                                                                    aria-controls={open ? 'account-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={open ? 'true' : undefined}
                                                                >
                                                                    <Avatar sx={{
                                                                        width: 20,
                                                                        height: 20,
                                                                        color: 'black',
                                                                        backgroundColor: 'white',
                                                                        '&:hover': {
                                                                            backgroundColor: 'lightgray',
                                                                            cursor: 'pointer'
                                                                        },
                                                                    }}>...</Avatar>
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            id="account-menu"
                                                            open={open}
                                                            onClose={handleClose}
                                                            onClick={handleClose}
                                                            PaperProps={{
                                                                elevation: 0,
                                                                sx: {
                                                                    overflow: 'visible',
                                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                    mt: 1.5,
                                                                    '& .MuiAvatar-root': {
                                                                        width: 32,
                                                                        height: 32,
                                                                        ml: -0.5,
                                                                        mr: 1,
                                                                    },
                                                                    '&:before': {
                                                                        content: '""',
                                                                        display: 'block',
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        right: 14,
                                                                        width: 10,
                                                                        height: 10,
                                                                        bgcolor: 'background.paper',
                                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                                        zIndex: 0,
                                                                    },
                                                                },
                                                            }}
                                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                        >
                                                            <MenuItem onClick={handleClose}>
                                                                Chỉnh sửa
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose}>
                                                                Xóa
                                                            </MenuItem>
                                                        </Menu>
                                                    </React.Fragment>
                                                </div>
                                            </div>
                                            <div className={cx('reply')}>
                                                <div className={cx('replay-title')}>
                                                    <div className={cx('comment-box')}>
                                                        <span
                                                            onClick={handleCommentClick}
                                                        >
                                                            trả lời
                                                        </span>
                                                        {isCommenting && (
                                                            <div>
                                                                <textarea
                                                                    value={content}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter your comment..."
                                                                    rows="2"
                                                                    cols="50"
                                                                />
                                                                <br />
                                                                <button onClick={handlePostComment}>Post a comment</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}</div> : <div></div>}
                    </div>
                </div>



                {/* <div className={cx("audio")}>
                    <div className={cx("image-audio")}>
                        <img className={cx("trending-ellipse")} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")}>
                        </img>
                    </div>
                    <div className={cx("control")}>
                        <div className={cx("btn", "btn-prev")}>
                            <i class="fas fa-step-backward"></i>
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

                    <audio id="audio" ref={audioRef} src={music}></audio>

                </div> */}
            </div>

        );
    }
    else {
        return <h1>Loading Page...</h1>
    }
}
export default ViewDetailBeat;