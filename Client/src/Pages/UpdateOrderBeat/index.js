
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UpdateOrderBeat.module.scss";
import { useEffect, useState } from "react";
import { Alert, Backdrop, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import videoBg from '../../assets/video/video (2160p).mp4'
import ValidationUpload from "../../Validation/ValidationUpload";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import axiosInstance from "../../authorization/axiosInstance";
import NotFound from "../NotFound";
const cx = classNames.bind(styles);
function UpdateOrderBeat() {
    const { id } = useParams()
    const navigate = useNavigate()
    // const [orderID, setOrderID] = useState("");
    // const [username, setUserName] = useState("");
    const token = useToken();
    let userId = null
    if (token) {
        userId = jwtDecode(token).sub
    }
    const [beatName, setBeatName] = useState("");
    const [description, setDescription] = useState("");
    const [msId, setMsId] = useState("");
    const [listMusician, setListMusician] = useState([])
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    console.log(msId)


    useEffect(() => {
        const loadMusician = async () => {
            await axios.get("http://localhost:8080/api/v1/beat/musician/full")
                .then((res) => {
                    setListMusician(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        loadMusician()
    }, [])

    const handleCreate = async () => {
        await axiosInstance.post("http://localhost:8080/api/v1/request/beat/new",{userRequest:userId, msId: msId, beatName: beatName, description: description})
        .then((res) => {
            setOpenSuccessSnackBar(true)
            setMessageSuccess("Create successfully")
            setTimeout(() => {
                navigate("/ordertimeline")
            },500)
        })
        .catch((error) => {
            setOpenFailedSnackBar(true)
            setMessageFailed("Create failed!")
            console.log(error)
        })
    }

    if (token && (jwtDecode(token).role === "CUS" || jwtDecode(token).role === "MS")) {
        if (listMusician.length !== 0) {
            return (
                <div className={cx("login-wrapper")}>
                    <h1 className={cx("form-heading")}>Create new order</h1>
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
                                    onChange={(e) => setBeatName(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Choosing musician */}
                        <div>
                            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Musician Name</td>
                            <FormControl variant="filled" style={{ width: 295 }}>
                                <InputLabel style={{ fontSize: 20 }} id="demo-simple-select-label">Musician Name</InputLabel>
                                <Select
                                    style={{ fontSize: 20 }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={msId}
                                    label="Musician Name"
                                    onChange={(e) => setMsId(e.target.value)}
                                >
                                    {listMusician.map((item) => {
                                        return (
                                            <MenuItem style={{ fontSize: 20 }} value={item.id}>{item.fullName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        {/* Description */}
                        <div style={{ marginRight: 200 }}>
                            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', fontFamily: 'fredoka one' }}>Description</td>
                            <Button style={{ width: 100, height: 50, fontSize: 10 }} variant="outlined" onClick={() => setOpenModal(true)} >View</Button>
                        </div>
                        {/* {error.beatname && (
          <p style={{ color: "red", marginTop: 10, paddingLeft: 5 }}>
            {error.beatname}
          </p>
        )} */}

                        <Button variant="contained" className={cx("input-update", "submit")} onClick={handleCreate} >
                            <input style={{ borderRadius: 30 }}
                                type="submit"
                                value="Create"
                                className={cx("input-text-update", "input-submit")}
                            />
                        </Button>
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
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                            <div style={{ display: 'grid' }}>
                                <td style={{ fontWeight: 'bold', fontSize: "3rem", marginLeft: 120, color: 'red' }}>Description</td>
                            </div>
                            <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 150, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12 }} value={description} onChange={(e) => setDescription(e.target.value)} />
                            <td className={cx("button-type")}>
                                <button type="button" className={cx("button-send")} aria-disabled="false" onClick={() => setOpenModal(false)}>Approved</button>
                            </td>

                        </div>
                    </Modal>
                </div >
            );
        }
        else {
            return <div></div>
        }
    }
    else {
        return (
            <NotFound />
        )
    }
}

export default UpdateOrderBeat;
