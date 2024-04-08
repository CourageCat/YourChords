
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./OrderApprovedDemo.module.scss";
import { Button, Checkbox } from "@mui/material";
import { useRef } from "react";
import NotFound from "@/Pages/NotFound";
import NotFoundMaterialUI from "../NotFoundMaterialUI";

const cx = classNames.bind(styles);
function OrderApprovedDemo({ id, status, role, beatName, setOpenModal, price, beatSoundDemo, setOpenCheckConfirm, setMessageConfirm, setOpenCheckReject, setMessageReject }) {
    const audioRef = useRef()
    localStorage.setItem("method", JSON.stringify("full"))
    localStorage.setItem("id", JSON.stringify(id))
    //CUS
    { console.log(role) }
    if(status === 3){
    if (role === "CUS") {
        return (
            <div>
                <h1 className={cx("form-heading")}>Order Details</h1>
                <h3 style={{ color: "green" }}>Musician has provided the demo version of the beat for you</h3>
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
                    <div style={{ marginTop: 50 }}>
                        <Button onClick={() => [setOpenCheckConfirm(true), setMessageConfirm("Are you sure you want to accept the demo version of this beat?")]} style={{ backgroundColor: "green", width: 100, height: 50, marginRight: 50 }} variant="contained">Accept</Button>
                        <Button onClick={() => [setOpenCheckReject(true), setMessageReject("Are you sure you want to cancel this order? \n (You will lose 15% of your prepaid for this order")]} style={{ backgroundColor: "red", width: 100, height: 50 }} variant="contained">Reject</Button>
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
                <h3 style={{ color: "green" }}>Waiting for Customer approve your BeatDemo...</h3>
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
        )
    }}
    else{
        return (
            <NotFoundMaterialUI/>
        )
    }
}


export default OrderApprovedDemo;
