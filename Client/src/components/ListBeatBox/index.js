import classNames from "classnames/bind";
import styles from "./ListBeatBox.module.scss";
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

function ListBeatBox({ id, name, genre, price, view, like, onClick, handleLike, rating, vocalRange, fullName, setMessageFailed, setOpenFailedSnackBar, addToCart }) {
    const token = useToken()
    const audioRef = useRef()
    const [beatSoundDemo, setBeatSoundDemo] = useState("")
    useEffect(() => {
        loadSoundDemo()
    })
    const loadSoundDemo = async () => {
        await axiosInstance(`http://localhost:8080/api/v1/beat/user/demo/${id}`)
            .then((res) => {
                setBeatSoundDemo(res.data.beatSound)
            })
    }
    return (<div className={cx("list-box")} onClick={onClick}>
        <div className={cx("card-item")}>
            <img className={cx("box-img")} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} alt="anh" />
        </div>
        <div className={cx("content")}>
            {/* Content left */}
            <div className={cx("content-left")}>
                <h3 className={cx("name-beat")}> <Link style={{ color: 'white' }} to={`/viewdetailbeat/${id}`}>{name}</Link> <FontAwesomeIcon className={cx("check")} icon={faCheckCircle} /></h3>
                <span style={{ marginTop: 12, fontWeight: 500, fontSize: 18 }} className={cx("type-beat")}>{fullName}</span><br />
                <span style={{ marginTop: 12 }} className={cx("type-beat")}>{vocalRange}</span>
                <div style={{ marginTop: 12 }} className={cx("footer")}>
                    <span className={cx("price")}>${price}</span>
                </div>
                <audio className={cx("audio")} id="audio" ref={audioRef} controls src={beatSoundDemo}>
                </audio>
            </div>
            {/* Content right  */}
            <div className={cx("content-right")}>
                {token ?
                    <Button className={cx("action")} onClick={() => addToCart(id)}><FontAwesomeIcon icon={faCartShopping} className={cx("shop")} /></Button>
                    : <Button className={cx("action")} onClick={() => [setOpenFailedSnackBar(true), setMessageFailed("You need to login before using this function!")] }><FontAwesomeIcon icon={faCartShopping} className={cx("shop")} /></Button>
                }
                <span style={{ width: 30, height: 30,textWrap: 'nowrap' }} className={cx("like")}>
                    <FontAwesomeIcon icon={faHeart}/>
                    <span className={cx("number")} style={{marginLeft: 2}}>{like}</span>
                </span>
                <span className={cx("rating")}>
                    <FontAwesomeIcon icon={faStar} />
                    <span className={cx("number")} >{rating}</span>
                </span>
            </div>
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
export default ListBeatBox