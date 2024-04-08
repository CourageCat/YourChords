import classNames from "classnames/bind";
import styles from "./MyBeatsBox.module.scss";
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

function MyBeatsBox({ id, beatName, price, creatAt, beatSoundDemo, beatSoundFull }) {
    const dateReleasing = new Date(creatAt)
        const month = dateReleasing.getUTCMonth() + 1
        const day = dateReleasing.getUTCDate()
        const year = dateReleasing.getUTCFullYear()
    const token = useToken()
    const audioRef = useRef()
    return (<div className={cx("list-box")}>
        <div className={cx("card-item")}>
            <img className={cx("box-img")} src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} alt="anh" />
        </div>
        <div className={cx("content")}>
            {/* Content left */}
            <div className={cx("content-left")}>
                <h2 style={{marginBottom:10, fontSize:25}} className={cx("name-beat")}> {beatName} </h2>
                <div style={{marginBottom:50}} className={cx("content-bottom")}>
                    <span style={{fontSize:20}} className={cx("type-beat")}>Ordered at: {day + "/" + month + "/" + year}</span> <br />
                </div>
                <div className={cx("footer")}>
                    <span style={{fontSize:20}} className={cx("price")}>Price: ${price}</span>
                </div>
                <div style={{fontSize:20}}>BeatSoundDemo</div>
                <audio className={cx("audio")} id="audio" ref={audioRef} controls src={beatSoundDemo}></audio>
                <div style={{fontSize:20}}>BeatSoundFull</div>
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
export default MyBeatsBox;