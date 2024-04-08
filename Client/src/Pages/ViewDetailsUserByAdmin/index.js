
import classNames from "classnames/bind";
import styles from "./ViewDetailsUserByAdmin.module.scss";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { Button } from "bootstrap";
import { red } from "@mui/material/colors";
import Popup from "reactjs-popup";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from "../../authorization/axiosInstance";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Alert, Modal, Snackbar } from "@mui/material";
import useToken from "@/authorization/useToken";
import jwtDecode from "jwt-decode";
const cx = classNames.bind(styles);
const DATA = [
    {

        name: "abc",
    },
]
function ViewDetailsUserByAdmin() {
    //back drop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const { id } = useParams()
    const [user, setUser] = useState();
    const [contentBan, setContentBan] = useState("")
    const [contentWarn, setContentWarn] = useState("")
    const [checkBan, setCheckBan] = useState("")
    const [listReport, setListReport] = useState()
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const [openBanModal, setOpenBanModal] = useState(false);
    const [openUnbanModal, setOpenUnbanModal] = useState(false);
    const [openWarnModal, setOpenWarnModal] = useState(false);
    const [beatRejected, setBeatRejected] = useState(0);
    const contentStyle = { background: 'white', width: 460, height: 370, borderRadius: 20 };

    useEffect(() => {
        loadDetailsUser()
    }, [checkBan])

    useEffect(() => {
        loadReport()
    }, [])

    useEffect(() => {
        const loadRejectMusicianBeat = async () => {
            await axiosInstance.post(`http://localhost:8080/api/v1/admin/musician/policy/${id}`)
            .then((res) => {
                setBeatRejected(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        loadRejectMusicianBeat()
    }, [])
    const loadDetailsUser = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/admin/${id}`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleBanUser = async () => {
        if (contentBan === "") {
            setOpenFailedSnackBar(true)
            setMessageFailed("Ban's content must not be null!")
            return;
        }
        setOpen(true)
        setOpenBanModal(false)
        await axiosInstance.post("http://localhost:8080/api/v1/admin/user/ban", { id: id, content: contentBan })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Ban User Successfully")
                setCheckBan("Ban User Successfully")
                setOpen(false)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Ban Failed!")
                setOpen(false)
                console.log(error)
            })
    }

    const handleWarnUser = async () => {
        if (contentWarn === "") {
            setOpenFailedSnackBar(true)
            setMessageFailed("Warn's content must not be null!")
            return;
        }
        setOpen(true)
        setOpenWarnModal(false)
        await axiosInstance.post("http://localhost:8080/api/v1/admin/user/warn", { id: id, content: contentWarn })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Warn User Successfully")
                setOpen(false)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Warn Failed!")
                setOpen(false)
                console.log(error)
            })
    }

    const handleUnbanUser = async () => {
        setOpen(true)
        setOpenUnbanModal(false)
        await axiosInstance.post("http://localhost:8080/api/v1/admin/user/unban", { id: id })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Unban User Successfully")
                setOpen(false)
                setCheckBan("Unban User Successfully")
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Unban Failed!")
                setOpen(false)
                console.log(error)
            })
    }

    const loadReport = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/report/user/${id}`)
            .then((res) => {
                setListReport(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div style={{ marginBottom: 300 }}>
            <div>
                <h2 className={cx("title-myprofile")}>
                    My Profile
                </h2>
            </div>
            {user ?
                <div className={cx("profile")}>
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
                                    <td style={{ fontWeight: 500, fontFamily: 'fredoka one' }}>
                                        {user.username}
                                    </td>
                                    {user.role === "MS" ?
                                        <td style={{ marginLeft: 0, fontWeight: 300 }}>
                                            Musician
                                        </td> : <td style={{ marginLeft: 0 }}>
                                            Customer
                                        </td>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <Tabs style={{ marginTop: -50 }}>
                        <TabList>
                            <Tab ><b>Profile</b></Tab>
                            <Tab ><b>Report</b></Tab>
                        </TabList>
                        {/* Detail musician */}
                        <TabPanel>
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
                                        <div className={cx("part2")}>
                                            <td>
                                                <div style={{ fontWeight: 500 }} className={cx("email-text")}>
                                                    Email
                                                </div>
                                                <div className={cx("email-change")}>
                                                    {user.mail}
                                                </div>
                                            </td>

                                        </div>
                                        <div className={cx("part3")}>
                                            <td>
                                                <div className={cx("text-username0")}>
                                                    <td >
                                                        <label style={{ fontWeight: 500 }} className={cx("login-text")}>Phone Number</label>
                                                    </td>
                                                    <div>
                                                        <input className={cx("input-username0")} type="text" value={user.phoneNumber} placeholder readOnly />
                                                    </div>
                                                </div>
                                            </td>
                                        </div>
                                        {beatRejected != 0 ?
                                        <div style={{marginRight:100}} className={cx("part2")}>
                                            <td>
                                                <div style={{ fontWeight: 500 }} className={cx("email-text")}>
                                                    Number of beats rejected:
                                                </div>
                                                <div style={{fontSize:20,marginLeft:10}}>
                                                    {beatRejected}
                                                </div>
                                            </td>

                                        </div>
                                        : <div></div>}
                                        <div className={cx("part5")}>
                                            {user.status === 1 ?
                                                <button type="button" className={cx("button-save-details")} aria-disabled="false" onClick={() => setOpenBanModal(true)} >Ban</button>
                                                :
                                                <button type="button" className={cx("button-save-details2")} aria-disabled="false" onClick={() => setOpenUnbanModal(true)} >Unban</button>
                                            }
                                            {beatRejected != 0 ?
                                            <button type="button" className={cx("button-save-details3")} aria-disabled="false" onClick={() => setOpenWarnModal(true)} >Warn</button>
                                            : <div></div>}
                                        </div>


                                    </table>
                                </form>
                            </div>
                        </TabPanel>
                        {/* Feedback */}
                        <TabPanel>
                            <div className={cx("volt8A")}>
                                <div style={{ color: 'red', fontWeight: 'bold', fontSize: '3.2rem', display: 'flex', justifyContent: 'center' }} className={cx("title-feedback")}>List Reported</div>
                                {listReport ?
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 500, marginLeft: 70, marginTop: 20 }} className={cx("title-feedback")}> User has reported:</div>
                                        <form style={{ marginTop: 20 }}>
                                            <table className={classNames("profile-2")}>
                                                <div className={cx("part0")}>
                                                    <td>
                                                        {listReport.map((report, index) => {
                                                            return (
                                                                <div className={cx("text-username0")}>
                                                                    <td>
                                                                        <label style={{ fontFamily: 'sono', fontSize: 20, fontWeight: 500 }}>{index + 1}. </label>
                                                                        <label style={{ fontFamily: 'Sono', fontWeight: 500 }} className={cx("login-text")}>{report.user.fullName}</label>
                                                                    </td>
                                                                    <div>
                                                                        <input className={cx("input-username0")} type="text" placeholder value={report.content} />
                                                                    </div>
                                                                </div>)
                                                        })}

                                                    </td>
                                                </div>
                                            </table>
                                        </form>
                                    </div>
                                    : <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>There are no report</div>}
                            </div>
                        </TabPanel>
                    </Tabs>
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
                    <Modal
                        open={openBanModal}
                        onClose={() => setOpenBanModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                            <div style={{ display: 'grid' }}>
                                <td style={{ fontWeight: 'bold', fontSize: "2.2rem", marginLeft: 120, color: 'red' }}>Reason For Ban</td>
                                <td style={{ paddingTop: 15, paddingLeft: 30 }}>
                                </td>
                            </div>
                            <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 150, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12 }} onChange={(e) => setContentBan(e.target.value)} />
                            <td className={cx("button-type")}>
                                <button type="button" className={cx("button-send")} aria-disabled="false" onClick={() => { handleBanUser() }} >Send</button>
                            </td>

                        </div>
                    </Modal>
                    <Modal
                        open={openUnbanModal}
                        onClose={() => setOpenUnbanModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                            <div style={{ display: 'grid' }}>
                                <td style={{ fontWeight: 'bold', fontSize: "2.9rem", marginLeft: 0, color: 'red', textAlign: 'center', marginTop: 40 }}>Notice!</td>
                                <td style={{ fontWeight: '500', fontSize: "2.5rem", marginLeft: 0, color: 'black', textAlign: 'center', marginTop: 60 }}>Are you sure you want to unban this user?</td>
                            </div>
                            <td className={cx("button-type")}>
                                <button type="button" className={cx("button-send-2")} aria-disabled="false" onClick={() => { handleUnbanUser() }} >Accept</button>
                            </td>

                        </div>
                    </Modal>
                    <Modal
                        open={openWarnModal}
                        onClose={() => setOpenWarnModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                            <div style={{ display: 'grid' }}>
                                <td style={{ fontWeight: 'bold', fontSize: "2.2rem", marginLeft: 120, color: 'red' }}>Reason For Warn</td>
                                <td style={{ paddingTop: 15, paddingLeft: 30 }}>
                                </td>
                            </div>
                            <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 150, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12 }} onChange={(e) => setContentWarn(e.target.value)} />
                            <td className={cx("button-type")}>
                                <button type="button" className={cx("button-send")} aria-disabled="false" onClick={() => { handleWarnUser() }} >Send</button>
                            </td>

                        </div>
                    </Modal>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                </div> : <div></div>}
        </div>
    );
}

export default ViewDetailsUserByAdmin;