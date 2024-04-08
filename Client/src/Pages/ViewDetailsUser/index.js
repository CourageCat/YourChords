
import classNames from "classnames/bind";
import styles from "./ViewDetailsUser.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { Button } from "bootstrap";
import { red } from "@mui/material/colors";
import Popup from "reactjs-popup";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import { Alert, Modal, Snackbar } from "@mui/material";
const cx = classNames.bind(styles);
const DATA = [
    {

        name: "abc",
    },
]
function ViewDetailsUser() {
    const { id } = useParams()
    const [search, setSearch] = useState("");
    const [ten, setTen] = useState("");
    const [user, setUser] = useState();
    const [report, setReport] = useState("")
    const [checkReport, setCheckReport] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    const token = useToken()
    let userId = ""
    if (token) {
        userId = jwtDecode(token).sub
    }
    const contentStyle = { background: 'white', width: 460, height: 370, borderRadius: 20 };

    useEffect(() => {
        loadDetailsUser()
    }, [])
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch1 = (e) => {
        setTen(e.target.value);
    }
    const handleReport = async () => {
        if (!token) {
            navigate("/login")
            return
        }
        if(report === ""){
            setOpenFailedSnackBar(true)
            setMessageFailed("Report's content must not be null!")
            return
        }
        await axiosInstance.post("http://localhost:8080/api/v1/report/user", { userId: userId, userReported: id, content: report })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Report successfully")
                setCheckReport("Report successfully")
                setOpenModal(false)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Report failed!")
                setCheckReport("Report failed!")
                setOpenModal(false)
            })
    }

    const loadDetailsUser = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/user/${id}`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div>
                <h2 className={cx("title-myprofile")}>
                    User Profile
                </h2>
            </div>
            {user ?
                <div className={cx("profile")}>
                    <div className={cx("volt8A")}>
                        <form style={{ marginTop: 20 }}>
                            <table className={classNames("profile-2")}>
                                <div className={cx("part0")}>
                                    <td>
                                        <div className={cx("text-username0")}>
                                            <td >
                                                <label style={{ fontWeight: 500 }} className={cx("login-text")}>Full Name</label>
                                            </td>
                                            <div>
                                                <input className={cx("input-username0")} type="text" value={user.fullName} placeholder readOnly />
                                            </div>
                                        </div>
                                    </td>
                                </div>
                                <div className={cx("part1")}>
                                    <td>
                                        <div className={cx("text-username0")}>
                                            <td >
                                                <label style={{ fontWeight: 500 }} className={cx("login-text")}>Address</label>
                                            </td>
                                            <div>
                                                <input className={cx("input-username0")} type="text" value={user.adress} placeholder readOnly />
                                            </div>
                                        </div>
                                    </td>
                                </div>
                                {!(userId == user.id) ?
                                    <div className={cx("part5")}>
                                        {token ?
                                            <button type="button" className={cx("button-save-details")} aria-disabled="false" onClick={() => setOpenModal(true)} >Report</button>  
                                            :
                                            <button type="button" className={cx("button-save-details")} aria-disabled="false" onClick={() => [setOpenFailedSnackBar(true), setMessageFailed("You need to login before using this function!")]} >Report</button>
                                        }
                                    </div>
                                    : <div></div>}
                            </table>
                        </form>
                    </div>
                    <div className={cx("line")} />
                    <div className={cx("img-user-div")}>
                        <div className={cx("img-user-div1")}>
                            <div className={cx("img-user-div2")}>
                                <div className={cx("img-user-div3")}>
                                    {user.avatar !== null ?
                                        <img className={cx("box-img")} src={user.avatar} />
                                        : <img className={cx("box-img")} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s"} />}
                                </div>
                                {/* <input className={cx("img-click")} type="file" accept=".jpg,.jpeg,.png" /> */}
                                <div className={cx("info-user")}>
                                    <td style={{ marginLeft: 10, fontWeight: 300, fontSize: 30, fontFamily: 'fredoka one' }}>
                                        {user.username}
                                    </td>
                                    <td style={{ marginLeft: 10, fontSize: 15 }}>
                                        Customer
                                    </td>
                                </div>
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
                </div> : <div></div>}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                    <div style={{ display: 'grid' }}>
                        <td style={{ fontWeight: 'bold', fontSize: "3rem", marginLeft: 150, color: 'red' }}>Report</td>
                    </div>
                    <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 150, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12 }} onChange={(e) => setReport(e.target.value)} />
                    <td className={cx("button-type")}>
                        <button type="button" className={cx("button-send")} aria-disabled="false" onClick={() => handleReport()}>Send</button>
                    </td>

                </div>
            </Modal>
        </div>
    );
}

export default ViewDetailsUser;