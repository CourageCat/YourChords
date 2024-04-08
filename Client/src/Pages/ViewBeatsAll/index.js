
import classNames from "classnames/bind";
import styles from "./ViewBeatsAll.module.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { Button } from "bootstrap";
import SideBar from "../../components/SideBar";
import ListSongAll from "../ListSongAll";
import ListBeatAll from "../listBeatAll";
import { useContext } from "react";
import { ShopContext } from "@/context/shop-context";
const cx = classNames.bind(styles);
const DATA = [
    {

        name: "abc",
    },
]
function ViewBeatsAll() {
    const {search} = useContext(ShopContext)
    const [choosen, setChoosen] = useState("Beat")
    return (
        <div className={cx("all")}>
            <div className={cx("three-button")}>
                <div className={cx("button-chords")}>
                    <div className={cx("line")}>
                    </div>
                        <button variant="contained" className={cx("button")} onClick={() => setChoosen("Beat")}>
                            <div className={cx("text")}>Beat</div>
                        </button>
                        <button variant="contained" className={cx("button")} onClick={() => setChoosen("Songs")}>
                            <div className={cx("text")}>Chords of Songs</div>
                        </button>
                    <div className={cx("line")}>
                    </div>
                </div>
                {console.log(search)}
            </div>
            {choosen == "Beat" ?
                <ListBeatAll search={search} />
                :
                <ListSongAll search={search} />
            }
        </div>
    );
}

export default ViewBeatsAll;