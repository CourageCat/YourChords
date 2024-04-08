import classNames from "classnames/bind";
import styles from "./listBeatPurchasedBox.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlay, faPause, faCheckCircle, faUsersViewfinder, faEye, faStar, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Button, colors } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import useToken from "../../authorization/useToken";
import axiosInstance from "../../authorization/axiosInstance";


const cx = classNames.bind(styles);

function ListBeatPurchasedBox({ id, name, genre, price, view, like, onClick, rating, vocalRange, fullName }) {
    const token = useToken()
    const audioRef = useRef()
    const [play, setPlay] = useState(false)
    const [beatSoundFull, setBeatSoundFull] = useState("")
    useEffect(() => {
        loadSoundFull()
    })
    const loadSoundFull = async () => {
        await axiosInstance(`http://localhost:8080/api/v1/beat/user/full/${id}`)
            .then((res) => {
                setBeatSoundFull(res.data.beatSound)
            })
    }
    return (<div className={cx("list-box")} onClick={onClick}>
        <div className={cx("card-item")}>
            <img className={cx("box-img")} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} alt="anh" />
        </div>
        <div className={cx("content")}>
            {/* Content left */}
            <div className={cx("content-left")}>
                <h2 className={cx("name-beat")}> <Link style={{ color: 'white', fontSize: '2rem' }} to={`/viewdetailbeatpurchased/${id}`}>{name}</Link> <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} /></h2>
                <div className={cx("content-bottom")}>
                    <span className={cx("type-beat")}>{fullName}</span> <br />
                    <span className={cx("type-beat")}>{vocalRange}</span>
                    <div style={{ display: 'grid', justifyContent: 'flex-end', marginLeft: 60, rowGap: 10 }}>
                        <span style={{ textWrap: 'nowrap' }} className={cx("like")}>
                            <span style={{color:"black"}}>123</span>
                        </span>
                        <span className={cx("rating")}>
                            <span style={{color:"black"}}>123</span>
                        </span>
                    </div>
                </div>
                <div className={cx("footer")}>
                    <span className={cx("price")}>${price}</span>
                    <div className={cx("number-sell")}>
                        <span className={cx("box")}></span>
                        <FontAwesomeIcon icon={faEye} />
                        <span className={cx("number")}>{view}</span>
                    </div>
                </div>
                <audio className={cx("audio")} id="audio" ref={audioRef} controls src={beatSoundFull}>
                </audio>
            </div>
            {/* Content right  */}

        </div>
        {/* <div className={cx("control")}>
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

        </div> */}
    </div>);
}
export default ListBeatPurchasedBox;