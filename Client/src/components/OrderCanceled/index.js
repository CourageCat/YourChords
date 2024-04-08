
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./OrderCanceled.module.scss";
import { Button } from "@mui/material";
import NotFound from "@/Pages/NotFound";
import NotFoundMaterialUI from "../NotFoundMaterialUI";

const cx = classNames.bind(styles);
function OrderCanceled({id, status, role, beatName, setOpenModal, price}) {
    //CUS
    {console.log(role)}
    if(status === -2 || status === -3){
    if (role === "CUS") {
        return (
            <div>
                <h1 className={cx("form-heading")}>Order Details</h1>
                {status === -2 ?
                <h3 style={{color:"green"}}>Canceled By Customer (Beat)</h3>
                : price == 0 ?
                <h3 style={{color:"green"}}>Canceled By Musician (Order)</h3>
                : <h3 style={{color:"green"}}>Canceled By Customer (Order)</h3>}
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
                    {status === -2 ? 
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
                    : <div></div>}
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
                {status === -2 ?
                <h3 style={{color:"green"}}>Canceled By Customer (Beat)</h3>
                : price == 0 ?
                <h3 style={{color:"green"}}>Canceled By Musician (Order)</h3>
                : <h3 style={{color:"green"}}>Canceled By Customer (Order)</h3>}
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
                    {status === -2 ? 
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
                    : <div></div>}
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


export default OrderCanceled;
