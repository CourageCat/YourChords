
import classNames from "classnames/bind";
import styles from "./MyProfile.module.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Tab } from "bootstrap";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import { TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import 'react-tabs/style/react-tabs.css';
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
    const [checkEdit, setCheckEdit] = useState("")
    const [username, setUserName] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    let id = ""
    const token = useToken()
    if (token) {
        id = jwtDecode(token).sub
    }


    useEffect(() => {
        loadDetailUser()
    }, [checkEdit])

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
        if (!fullName || !address || !phone || !gender || !id) {
            setOpenFailedSnackBar(true)
            setMessageFailed("All fields must not be null!")
            return
        } else if (phone.length < 10 || phone.length > 11) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Phone number length must be 10 or 11 characters!")
        }
        const userProfile = { fullName, address, phone, gender, id };
        const formData = new FormData();
        formData.append('json', new Blob([JSON.stringify(userProfile)], { type: 'application/json' }));
        console.log(userImg)
        formData.append('file', userImg);


        await axiosInstance.patch("http://localhost:8080/api/v1/user/customer", formData, {
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
                setMessageFailed("Edit Failed!")
                console.log(error)
                setCheckEdit(false)
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
                <div className={cx("volt8A")}>
                    <form style={{ marginTop: 20 }}>
                        <table className={classNames("profile-2")}>
                            <div className={cx("part0")}>
                                <td>
                                    <div className={cx("text-username0")}>
                                        <td >
                                            <label className={cx("login-text")}>Full Name</label>
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
                                    <div className={cx("email-text")}>
                                        Email:
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
                                <td className={cx("sex")}>
                                    Sex
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
                {/* <div className={cx("line")} /> */}
                <div className={cx("img-user-div")}>
                    <div className={cx("img-user-div1")}>
                        <div className={cx("img-user-div2")}>
                            <div className={cx("img-user-div3")}>
                                {console.log(avatar)}
                                {avatar !== "" ?
                                    <img className={cx("box-img")} alt="" src={avatar} />
                                    : <img className={cx("box-img")} alt="" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s"} />}
                            </div>
                            <div className={cx("info-user")}>
                                <td style={{ fontSize: 35 }}>
                                    {username}
                                </td>
                                <td style={{ fontSize: 20, display: 'flex', justifyContent: 'center' }}>
                                    Customer
                                </td>
                            </div>
                            <label className={cx("file")}>
                                <input className={cx("img-click")} style={{ marginLeft: 155, marginTop: -5 }} type="file" accept=".jpg,.jpeg,.png" onChange={(e) => handleUserImgChange(e)} />
                                <span className={cx("file-custom")}></span>
                            </label>
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
        </div>
    );
}

export default MyProfile;