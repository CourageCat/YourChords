
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./OrderMakeABeat.module.scss";
import { Button, Checkbox } from "@mui/material";
import NotFound from "@/Pages/NotFound";
import NotFoundMaterialUI from "../NotFoundMaterialUI";
import { useRef } from "react";

const cx = classNames.bind(styles);
function OrderMakeAbeat({ id, status, role, beatName, setOpenModal, price, beatSoundDemo, beatSoundFullUrl, handleBeatSoundFullChange, setOpenCheckConfirm, setMessageConfirm }) {
    //CUS
    const audioRef = useRef()
    { console.log(role) }
    if(status === 4){
    if (role === "CUS") {
        return (
            <div>
                <h1 className={cx("form-heading")}>Order Details</h1>
                <h3 style={{ color: "green" }}>Waiting for musician to make the full version of the beat...</h3>
                {/* Form */}
                <div className={cx("form")}>
                    {/* BeatName */}
                    <div>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Beat Name</td>
                        <div className={cx("input")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 45 45"
                                fill="none"
                            >
                                <path
                                    d="M33.75 35.625V33.2812C33.75 29.3981 30.1519 26.25 25.7137 26.25H19.2863C14.8481 26.25 11.25 29.3981 11.25 33.2812V35.625M28.125 15C28.125 16.4918 27.5324 17.9226 26.4775 18.9775C25.4226 20.0324 23.9918 20.625 22.5 20.625C21.0082 20.625 19.5774 20.0324 18.5225 18.9775C17.4676 17.9226 16.875 16.4918 16.875 15C16.875 13.5082 17.4676 12.0774 18.5225 11.0225C19.5774 9.96763 21.0082 9.375 22.5 9.375C23.9918 9.375 25.4226 9.96763 26.4775 11.0225C27.5324 12.0774 28.125 13.5082 28.125 15Z"
                                    stroke="white"
                                // stroke-width="2"
                                // stroke-linecap="round"
                                // stroke-linejoin="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="BeatName"
                                className={cx("input-text")}
                                value={beatName}
                                readOnly
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div style={{ marginRight: 200 }}>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'fredoka one' }}>Description</td>
                        <Button style={{ width: 100, height: 50, fontSize: 10 }} variant="outlined" onClick={() => setOpenModal(true)} >View</Button>
                    </div>
                    {/* Price */}
                    <div>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Price Prepaid by Customer ($)</td>
                        <div className={cx("input")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 45 45"
                                fill="none"
                            >
                                <path
                                    d="M33.75 35.625V33.2812C33.75 29.3981 30.1519 26.25 25.7137 26.25H19.2863C14.8481 26.25 11.25 29.3981 11.25 33.2812V35.625M28.125 15C28.125 16.4918 27.5324 17.9226 26.4775 18.9775C25.4226 20.0324 23.9918 20.625 22.5 20.625C21.0082 20.625 19.5774 20.0324 18.5225 18.9775C17.4676 17.9226 16.875 16.4918 16.875 15C16.875 13.5082 17.4676 12.0774 18.5225 11.0225C19.5774 9.96763 21.0082 9.375 22.5 9.375C23.9918 9.375 25.4226 9.96763 26.4775 11.0225C27.5324 12.0774 28.125 13.5082 28.125 15Z"
                                    stroke="white"
                                />
                            </svg>
                            <input
                                type="number"
                                placeholder="Price"
                                className={cx("input-text")}
                                value={price * 15 / 100}
                                readOnly
                            />
                        </div>
                    </div>
                    {/* Beat Sound Demo */}
                    <div>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Beat Sound Demo</td>
                        <audio className={cx("audio")} id="audio" ref={audioRef} controls src={beatSoundDemo}>
                        </audio>
                    </div>
                    {/* {error.beatname && (
          <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
            {error.beatname}
          </p>
        )} */}
                </div>
            </div >
        );
    }
    //MS
    else {
        return (
            <div>
                <h1 className={cx("form-heading")}>Order Details</h1>
                <h3 style={{ color: "green" }}>Provide the full version of your beat to customer...</h3>
                {/* Form */}
                <div className={cx("form")}>
                    {/* BeatName */}
                    <div>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Beat Name</td>
                        <div className={cx("input")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 45 45"
                                fill="none"
                            >
                                <path
                                    d="M33.75 35.625V33.2812C33.75 29.3981 30.1519 26.25 25.7137 26.25H19.2863C14.8481 26.25 11.25 29.3981 11.25 33.2812V35.625M28.125 15C28.125 16.4918 27.5324 17.9226 26.4775 18.9775C25.4226 20.0324 23.9918 20.625 22.5 20.625C21.0082 20.625 19.5774 20.0324 18.5225 18.9775C17.4676 17.9226 16.875 16.4918 16.875 15C16.875 13.5082 17.4676 12.0774 18.5225 11.0225C19.5774 9.96763 21.0082 9.375 22.5 9.375C23.9918 9.375 25.4226 9.96763 26.4775 11.0225C27.5324 12.0774 28.125 13.5082 28.125 15Z"
                                    stroke="white"
                                // stroke-width="2"
                                // stroke-linecap="round"
                                // stroke-linejoin="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="BeatName"
                                className={cx("input-text")}
                                value={beatName}
                                readOnly
                            />
                        </div>
                    </div>
                    {/* Description */}
                    <div style={{ marginRight: 200 }}>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'fredoka one' }}>Description</td>
                        <Button style={{ width: 100, height: 50, fontSize: 10 }} variant="outlined" onClick={() => setOpenModal(true)} >View</Button>
                    </div>
                    {/* Price */}
                    <div>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Price Prepaid by Customer ($)</td>
                        <div className={cx("input")}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 45 45"
                                fill="none"
                            >
                                <path
                                    d="M33.75 35.625V33.2812C33.75 29.3981 30.1519 26.25 25.7137 26.25H19.2863C14.8481 26.25 11.25 29.3981 11.25 33.2812V35.625M28.125 15C28.125 16.4918 27.5324 17.9226 26.4775 18.9775C25.4226 20.0324 23.9918 20.625 22.5 20.625C21.0082 20.625 19.5774 20.0324 18.5225 18.9775C17.4676 17.9226 16.875 16.4918 16.875 15C16.875 13.5082 17.4676 12.0774 18.5225 11.0225C19.5774 9.96763 21.0082 9.375 22.5 9.375C23.9918 9.375 25.4226 9.96763 26.4775 11.0225C27.5324 12.0774 28.125 13.5082 28.125 15Z"
                                    stroke="white"
                                />
                            </svg>
                            <input
                                type="number"
                                placeholder="Price"
                                className={cx("input-text")}
                                value={price * 15 / 100}
                                readOnly
                            />
                        </div>
                    </div>
                    {/* Beat Sound Demo */}
                    <div>
                        <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Beat Sound Demo</td>
                        <audio className={cx("audio")} id="audio" ref={audioRef} controls src={beatSoundDemo}>
                        </audio>
                    </div>
                    {/* BeatSoundDemo
                    <div className={cx('choosefile')}>
                        <td style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '30px', fontFamily: 'fredoka one' }}>ChooseFileDemo</td>
                        <div className={cx("input")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                <path d="M1.25 17.6999H6.725C6.95553 17.6972 7.18121 17.6333 7.3789 17.5147C7.57659 17.3961 7.73918 17.227 7.85 17.0249L12.35 8.02488C12.4609 7.8008 12.6377 7.61602 12.8567 7.49536C13.0757 7.3747 13.3263 7.32393 13.575 7.34988C13.8227 7.36662 14.0591 7.45976 14.2516 7.61647C14.4441 7.77318 14.5833 7.98575 14.65 8.22488L20.225 26.7749C20.2982 27.0265 20.4485 27.2488 20.6549 27.4103C20.8613 27.5718 21.1132 27.6643 21.375 27.6749C21.6204 27.6667 21.8579 27.5865 22.0579 27.4443C22.258 27.302 22.4118 27.104 22.5 26.8749L25.925 18.4999C26.0193 18.2649 26.1814 18.0634 26.3907 17.9209C26.5999 17.7785 26.8469 17.7015 27.1 17.6999H33.75" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div>DemoBeat: </div>
                            <div className={cx("file")}>
                                <label>
                                    <input
                                        type="file"
                                        placeholder="BeatSound"
                                        className={cx("input-text", "img-click")}
                                        onChange={(e) => handleBeatSoundDemoChange(e)}
                                    />
                                    <span style={{fontSize:15}} className={cx("file-custom")}>{beatSoundDemoUrl}</span>
                                </label>
                            </div>
                        </div>
                    </div> */}

                    {/* BeatSoundFull*/}
                    <div className={cx('choosefile')}>
                        <td style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '30px', fontFamily: 'fredoka one' }}>ChooseFileFullBeat</td>
                        <div className={cx("input")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                <path d="M1.25 17.6999H6.725C6.95553 17.6972 7.18121 17.6333 7.3789 17.5147C7.57659 17.3961 7.73918 17.227 7.85 17.0249L12.35 8.02488C12.4609 7.8008 12.6377 7.61602 12.8567 7.49536C13.0757 7.3747 13.3263 7.32393 13.575 7.34988C13.8227 7.36662 14.0591 7.45976 14.2516 7.61647C14.4441 7.77318 14.5833 7.98575 14.65 8.22488L20.225 26.7749C20.2982 27.0265 20.4485 27.2488 20.6549 27.4103C20.8613 27.5718 21.1132 27.6643 21.375 27.6749C21.6204 27.6667 21.8579 27.5865 22.0579 27.4443C22.258 27.302 22.4118 27.104 22.5 26.8749L25.925 18.4999C26.0193 18.2649 26.1814 18.0634 26.3907 17.9209C26.5999 17.7785 26.8469 17.7015 27.1 17.6999H33.75" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div>FullBeat: </div>
                            <div className={cx("file")}>
                                <label>
                                    <input
                                        type="file"
                                        placeholder="BeatSound"
                                        className={cx("input-text", "img-click")}
                                        onChange={(e) => handleBeatSoundFullChange(e)}
                                    />
                                    <span style={{fontSize:15}} className={cx("file-custom")}>{beatSoundFullUrl}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* {error.beatname && (
          <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
            {error.beatname}
          </p>
        )} */}

                    <Button variant="contained" className={cx("input-update", "submit")} onClick={() => [setOpenCheckConfirm(true), setMessageConfirm("Are you sure you want to send this beat to Customer?")]} >
                        <input style={{ borderRadius: 30 }}
                            type="submit"
                            value="Send"
                            className={cx("input-text-update", "input-submit")}
                        />
                    </Button>
                </div>
            </div >
        )
    }}
    else{
        return (
            <NotFoundMaterialUI/>
        )
    }
}


export default OrderMakeAbeat;
