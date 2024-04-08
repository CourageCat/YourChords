
import classNames from "classnames/bind";
import styles from "./MusicianProfile.module.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "bootstrap";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import 'react-tabs/style/react-tabs.css';
import Pagination from "../../components/Pagination";
import { Alert, Snackbar } from "@mui/material";
const cx = classNames.bind(styles);
const DATA = [
    {

        name: "abc",
    },
]

const SEX = [
    {
        title: "Male",
        value: "MALE",
    }, {
        title: "Female",
        value: "FEMALE",
    }
]
function MyProfile() {
    const [isChecked, setIsChecked] = useState(false);
    const [fullName, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(SEX[0].value);
    const [userImg, setUserImg] = useState()
    const [avatar, setAvatar] = useState("")
    const [prize, setPrize] = useState("")
    const [professional, setProfessional] = useState("")
    const [year, setYear] = useState("")
    const [checkEdit, setCheckEdit] = useState("")
    const [username, setUserName] = useState("")
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [feedBacks, setFeedBacks] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const [checkChooseFile, setCheckChooseFile] = useState(false);

    let id = ""
    const token = useToken()
    if (token) {
        id = jwtDecode(token).sub
    }


    useEffect(() => {
        loadDetailUser()
    }, [checkEdit])

    useEffect(() => {
        loadFeedBack()
    }, [page])

    const loadDetailUser = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/user/${id}`)
            .then((res) => {
                if (res.data.fullName !== null) {
                    setFullname(res.data.fullName)
                }
                if (res.data.username !== null) {
                    setUserName(res.data.username)
                }
                if (res.data.address !== null) {
                    console.log(123)
                    setAddress(res.data.address)
                }
                if (res.data.mail !== null) {
                    setMail(res.data.mail)
                }
                if (res.data.phone !== null) {
                    setPhone(res.data.phone)
                }
                if (res.data.gender !== null) {
                    setGender(res.data.gender)
                }
                if (res.data.avatar !== null) {
                    setAvatar(res.data.avatar)
                }
                if (res.data.prize !== null) {
                    setPrize(res.data.prize)
                }
                if (res.data.professional !== null) {
                    setProfessional(res.data.professional)
                }
                if (res.data.year !== null) {
                    setYear(res.data.year)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleUserImgChange = (e) => {
        const selectedFile = e.target.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
        if (!allowedTypes.includes(selectedFile?.type)) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Only (image/png or image/jpeg or image/jpg) files are allowed!")
            return;
        }
        setOpenSuccessSnackBar(true)
        setMessageSuccess("Selected file successfully")
        setUserImg(selectedFile)
    }

    const handleEdit = async () => {
        if (!fullName || !address || !phone || !gender || !id || !prize || !professional || !year) {
            setOpenFailedSnackBar(true)
            setMessageFailed("All fields must not be null!")
            return
        } else if (phone.length < 10 || phone.length > 11) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Phone number length must be 10 or 11 characters!")
        } else if (year < 0 || year > 100) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Year must higher than 0!")
        }
        const userProfile = { fullName, address, phone, gender, id, prize, professional, year };
        const formData = new FormData();
        formData.append('json', new Blob([JSON.stringify(userProfile)], { type: 'application/json' }));
        console.log(userImg)
        formData.append('file', userImg);


        await axiosInstance.patch("http://localhost:8080/api/v1/user/musician", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Edit Successfully")
                setCheckEdit(true)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Edit failed")
                console.log(error)
                setCheckEdit(false)
            })
    }

    const loadFeedBack = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/beat/feedback/${id}/${page}`)
            .then((res) => {
                setFeedBacks(res.data.dtoList)
                setPages(res.data.max)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div style={{ marginTop: 50 }}>
            <div>
                <h2 className={cx("title-myprofile")}>
                    My Profile
                </h2>
            </div>
            <div className={cx("profile")}>
                <div className={cx("img-user-div")}>
                    <div className={cx("img-user-div1")}>
                        <div className={cx("img-user-div2")}>
                            <div className={cx("img-user-div3")}>
                                {avatar !== "" ?
                                    <img className={cx("box-img")} alt="" src={avatar} />
                                    : <img className={cx("box-img")} alt="" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s"} />}
                            </div>
                            <div className={cx("info-user")}>
                                <td style={{ fontSize: 27, fontWeight: 500, display: 'flex', justifyContent: 'center' }}>
                                    {username}
                                </td>
                                <td style={{ fontSize: 18, fontWeight: 400, display: 'flex', justifyContent: 'center' }}>
                                    Musician
                                </td>
                            </div>
                            <label style={{ marginLeft: 120 }} className={cx("file")}>
                                <input className={cx("img-click")} style={{ marginLeft: 155, marginTop: -5 }} type="file" accept=".jpg,.jpeg,.png" onChange={(e) => handleUserImgChange(e)} />
                                <span className={cx("file-custom")}></span>
                            </label>
                        </div>
                    </div>
                </div>
                <Tabs style={{ marginTop: -50 }}>
                    <TabList>
                        <Tab ><b>Profile</b></Tab>
                        <Tab ><b>Feedback</b></Tab>
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
                                                    <input className={cx("input-username0")} type="text" placeholder value={fullName} onChange={(e) => setFullname(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>
                                    </div>
                                    <div className={cx("part1")}>
                                        <td>
                                            <div className={cx("text-username0")}>
                                                <td>
                                                    <label className={cx("login-text")}>Address</label>
                                                </td>
                                                <div >
                                                    <input className={cx("input-username0")} type="text" placeholder value={address} onChange={(e) => setAddress(e.target.value)} />
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
                                                {mail}
                                            </div>
                                        </td>

                                    </div>
                                    <div className={cx("part3")}>
                                        <td>
                                            <div className={cx("text-username0")}>
                                                <td>
                                                    <label className={cx("login-text")}>Phone number</label>
                                                </td>
                                                <div >
                                                    <input className={cx("input-username0")} type="text" placeholder value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>
                                    </div>
                                    <div className={cx("part4")} style={{ marginLeft: 65 }}>
                                        <td style={{ fontWeight: 500 }} className={cx("sex")}>
                                            Gender
                                        </td>
                                        <td>
                                            <div className={cx("sex-button")}>
                                                <div className={cx("stardus-radio-group")}>
                                                    <div className={cx("footer")}>
                                                        {
                                                            SEX.map((item) => {
                                                                return <div className={cx("footer-left")}>
                                                                    <input
                                                                        type="radio"
                                                                        id="remember"
                                                                        name="rememeber"
                                                                        value="check"
                                                                        checked={item.value === gender}
                                                                        onChange={() => setGender(item.value)}
                                                                        className={cx("input-check")}
                                                                    />
                                                                    <label htmlFor="remember" className={cx("text")}>
                                                                        {item.title}
                                                                    </label>
                                                                </div>
                                                            })
                                                        }

                                                    </div>
                                                    {/* <div className={cx("footer")}>
                                                    <div className={cx("footer-left")}>
                                                        <input
                                                            type="radio"
                                                            id="remember"
                                                            name="rememeber"
                                                            value="check"
                                                            checked={isChecked}
                                                            onChange={() => setIsChecked(!isChecked)}
                                                            className={cx("input-check")}
                                                        />
                                                        <label htmlFor="remember" className={cx("text")}>
                                                            Female
                                                        </label>
                                                    </div>
                                                </div> */}

                                                </div>
                                            </div>
                                        </td>
                                    </div>

                                    <div className={cx("more-info")} style={{ marginTop: 50, fontSize: 18, fontWeight: "bolder" }}>*More Information</div>
                                    <div className={cx("part3")}>
                                        <td>
                                            <div className={cx("text-username0")}>
                                                <td>
                                                    <label className={cx("login-text")}>Prize</label>
                                                </td>
                                                <div >
                                                    <input className={cx("input-username0")} type="text" placeholder value={prize} onChange={(e) => setPrize(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>
                                    </div>
                                    <div className={cx("part3")}>
                                        <td>
                                            <div className={cx("text-username0")}>
                                                <td>
                                                    <label className={cx("login-text")}>Professional</label>
                                                </td>
                                                <div >
                                                    <input className={cx("input-username0")} type="text" placeholder value={professional} onChange={(e) => setProfessional(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>
                                    </div>
                                    <div className={cx("part3")}>
                                        <td>
                                            <div className={cx("text-username0")}>
                                                <td>
                                                    <label className={cx("login-text")}>Year of Operation</label>
                                                </td>
                                                <div >
                                                    <input className={cx("input-username0")} type="number" placeholder value={year} onChange={(e) => setYear(e.target.value)} />
                                                </div>
                                            </div>
                                        </td>
                                    </div>
                                    <div className={cx("part5")}>
                                        <td className={cx("save-button")}>
                                        </td>
                                        <td className={cx("button-type")}>
                                            <button type="button" className={cx("button-save-details")} aria-disabled="false" onClick={() => handleEdit()}>Edit</button>
                                        </td>
                                    </div>
                                </table>
                            </form>
                        </div>
                    </TabPanel>
                    {/* Feedback */}
                    <TabPanel style={{ marginBottom: "400px" }}>
                        <div className={cx("volt8A")}>
                            <div style={{ color: '#06c', fontWeight: 'bold' }} className={cx("title-feedback")}> Beat Review</div>
                            {console.log(feedBacks)}
                            {feedBacks.length !== 0 ?

                                <form style={{ marginTop: 20 }}>
                                    {feedBacks.map((feedback, index) => {
                                        return (
                                            <table className={classNames("profile-2")}>
                                                <div className={cx("part0")}>
                                                    <td>
                                                        <div className={cx("text-username0")}>
                                                            <td>
                                                                <label style={{ fontFamily: 'sono', fontSize: 20, fontWeight: 500 }}>{index + 1}. </label>
                                                                <label style={{ fontFamily: 'sono', fontWeight: 500, marginLeft: -2 }} className={cx("login-text")}>{feedback.user.fullName}</label>
                                                                <label style={{ fontFamily: 'sono', fontSize: 20, marginLeft: 10 }}>-</label>
                                                                <label style={{ marginLeft: 10, fontFamily: 'Sono', fontWeight: 400 }} className={cx("login-text")}>{feedback.beat.beatName}</label>
                                                            </td>
                                                            <div>
                                                                <input className={cx("input-username1")} type="text" placeholder value={feedback.content} readOnly />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </div>
                                            </table>)
                                    })}
                                    {pages !== 1 ?
                                        <div className={cx("pagination")}>
                                            <Pagination pages={pages} page={page} setPage={setPage} />
                                        </div>
                                        : <div></div>}
                                </form>
                                : <div> There are no feedbacks </div>}
                        </div>
                    </TabPanel>
                </Tabs>

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
        </div>
    );
}

export default MyProfile;