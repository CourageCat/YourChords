
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
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
import axios from "axios";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
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
function Contact() {
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);


    // useEffect(() => {
    //     loadDetailUser()
    // }, [checkEdit])

    // useEffect(() => {
    //     loadFeedBack()
    // }, [page])

    // const loadDetailUser = async () => {
    //     await axiosInstance.get(`http://localhost:8080/api/v1/user/${id}`)
    //         .then((res) => {
    //             if (res.data.fullName !== null) {
    //                 setFullname(res.data.fullName)
    //             }
    //             if (res.data.username !== null) {
    //                 setUserName(res.data.username)
    //             }
    //             if (res.data.address !== null) {
    //                 console.log(123)
    //                 setAddress(res.data.address)
    //             }
    //             if (res.data.mail !== null) {
    //                 setMail(res.data.mail)
    //             }
    //             if (res.data.phone !== null) {
    //                 setPhone(res.data.phone)
    //             }
    //             if (res.data.gender !== null) {
    //                 setGender(res.data.gender)
    //             }
    //             if (res.data.avatar !== null) {
    //                 setAvatar(res.data.avatar)
    //             }
    //             if (res.data.prize !== null) {
    //                 setPrize(res.data.prize)
    //             }
    //             if (res.data.professional !== null) {
    //                 setProfessional(res.data.professional)
    //             }
    //             if (res.data.year !== null) {
    //                 setYear(res.data.year)
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    const handleContact = async () => {
        if (!fullName || !email || !phone || !content) {
            setOpenFailedSnackBar(true)
            setMessageFailed("All fields must not be null!")
            return
        }
        else if (!email.match("^[A-Za-z0-9+_.-]+@(gmail\\.com|gmail\\.com\\.vn|fpt\\.edu\\.vn)$")) {
            setMessageFailed("Invalid Email!")
            setOpenFailedSnackBar(true)
            setOpen(false)
            return
        }
        else if (phone.length < 10 || phone.length > 11) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Phone number length must be 10 or 11 characters!")
            return
        }
        setOpen(true)
        await axios.post("http://localhost:8080/api/v1/user/contactus", { fullName: fullName, email: email, phone: phone, content: content })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Send contact successfully")
                setOpen(false)
                setFullname("")
                setEmail("")
                setPhone("")
                setContent("")
                console.log(res.data)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Send contact failed!")
                setOpen(false)
                console.log(error)
            })
    }

    return (
        <div style={{ marginTop: 50 }}>
            <div>
                <h2 className={cx("title-myprofile")}>
                    Contact Us
                </h2>
            </div>
            <div className={cx("profile")}>
                {/* Detail musician */}

                <div className={cx("volt8A")}>
                    <form style={{ marginTop: 20, display: 'flex', marginBottom: 250 }}>
                        <div className={("profile-2")} style={{ backgroundColor: 'white', padding: 50, width: 800 }}>
                            <td style={{ paddingBottom: 30, fontSize: 23, fontWeight: '500', color: '#06c' }}> Send us message</td>
                            <div className={cx("part0")}>
                                <td>
                                    <div >
                                        <td >
                                            <label style={{ fontWeight: 500 }} className={cx("login-text")}>Full Name*</label>
                                        </td>
                                        <div className={cx("input-username0")}>
                                            <input className={cx("input-user")} type="text" placeholder="Your Name" value={fullName} onChange={(e) => setFullname(e.target.value)} />
                                        </div>
                                    </div>
                                </td>
                            </div>
                            <div className={cx("part2")}>
                                <td style={{ marginTop: 0 }}>
                                    <div style={{ fontWeight: 500 }} className={cx("email-text")}>
                                        Email*
                                    </div>
                                    <div className={cx("email-change")}>
                                        <input className={cx("input-user")} type="text" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </td>
                                <div className={cx("placeholder-ten")}>
                                    <td style={{ fontWeight: 500 }} className={cx("phone-number")}>
                                        Phone number*
                                    </td>
                                    <input className={cx("input-user")} type="text" placeholder="Phone#" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div className={cx("part3")}>
                                    <td style={{ fontWeight: 500 }}>
                                        Write your message *
                                    </td>
                                    <textarea className={cx("input-user-text")} style={{ width: 620, height: 120 }} id="ABC" name="ABC" rows="2" cols="174" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                                </div>
                            </div>
                            <div className={cx("part5")}>
                                <td className={cx("save-button")}>
                                </td>
                                <td className={cx("button-type")}>
                                    <button type="button" className={cx("button-save-details")} aria-disabled="false" onClick={() => handleContact()}>Send Message</button>
                                </td>
                            </div>
                        </div>
                        <div className={cx("right-content")}>
                            <div className={cx("right-content-total")}>
                                <div>
                                    <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: 30, fontSize: 30 }}>Contact Information</h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 25, margin: '0px 0px 48px', lineHeight: 1.5 }}>Welcome to our website</p>
                                    <div className={cx("footer-part")}>
                                        <span style={{ fontSize: 20 }} >
                                            <span style={{ paddingRight: 10 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M15 14.375C14.1712 14.375 13.3763 14.0458 12.7903 13.4597C12.2042 12.8737 11.875 12.0788 11.875 11.25C11.875 10.4212 12.2042 9.62634 12.7903 9.04029C13.3763 8.45424 14.1712 8.125 15 8.125C15.8288 8.125 16.6237 8.45424 17.2097 9.04029C17.7958 9.62634 18.125 10.4212 18.125 11.25C18.125 11.6604 18.0442 12.0667 17.8871 12.4459C17.7301 12.825 17.4999 13.1695 17.2097 13.4597C16.9195 13.7499 16.575 13.9801 16.1959 14.1371C15.8167 14.2942 15.4104 14.375 15 14.375ZM15 2.5C12.6794 2.5 10.4538 3.42187 8.81282 5.06282C7.17187 6.70376 6.25 8.92936 6.25 11.25C6.25 17.8125 15 27.5 15 27.5C15 27.5 23.75 17.8125 23.75 11.25C23.75 8.92936 22.8281 6.70376 21.1872 5.06282C19.5462 3.42187 17.3206 2.5 15 2.5Z" fill="white" fill-opacity="0.501961" />
                                                </svg>
                                            </span>
                                            Ho Chi Minh City, District 9 . VietNam
                                        </span>
                                        <span style={{ fontSize: 20 }} >
                                            <span style={{ paddingRight: 10 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M19.0592 20.1375L21.1592 18.0375C21.442 17.7582 21.7999 17.567 22.1893 17.4871C22.5787 17.4072 22.9829 17.4421 23.3529 17.5875L25.9123 18.6094C26.2862 18.7612 26.6068 19.0202 26.8337 19.3539C27.0606 19.6876 27.1836 20.0809 27.1873 20.4844V25.1719C27.1851 25.4464 27.1274 25.7176 27.0177 25.9692C26.9079 26.2208 26.7484 26.4476 26.5487 26.6359C26.349 26.8242 26.1132 26.9702 25.8556 27.065C25.598 27.1598 25.3239 27.2015 25.0498 27.1875C7.11541 26.0719 3.49666 10.8844 2.81229 5.07191C2.78052 4.78648 2.80955 4.49755 2.89746 4.22414C2.98537 3.95073 3.13018 3.69903 3.32235 3.4856C3.51453 3.27218 3.74971 3.10186 4.01244 2.98585C4.27516 2.86984 4.55947 2.81078 4.84666 2.81254H9.37479C9.77886 2.81373 10.1733 2.93579 10.5075 3.163C10.8416 3.39022 11.1001 3.7122 11.2498 4.08754L12.2717 6.64691C12.4219 7.01542 12.4602 7.42002 12.3819 7.81017C12.3035 8.20033 12.1119 8.55875 11.831 8.84066L9.73104 10.9407C9.73104 10.9407 10.9404 19.125 19.0592 20.1375Z" fill="white" fill-opacity="0.501961" />
                                                </svg>
                                            </span>
                                            +84 0909090909
                                        </span>
                                        <span style={{ fontSize: 20, display: 'flex', alignItems: 'center' }} >
                                            <span style={{ paddingRight: 10, marginTop: 10 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                                    <path d="M5.83342 29.1666C5.03133 29.1666 4.34446 28.8808 3.77279 28.3091C3.20113 27.7374 2.91578 27.051 2.91675 26.2499V8.74992C2.91675 7.94784 3.20258 7.26096 3.77425 6.6893C4.34592 6.11763 5.03231 5.83228 5.83342 5.83325H29.1667C29.9688 5.83325 30.6557 6.11909 31.2274 6.69075C31.799 7.26242 32.0844 7.94881 32.0834 8.74992V26.2499C32.0834 27.052 31.7976 27.7389 31.2259 28.3105C30.6543 28.8822 29.9679 29.1676 29.1667 29.1666H5.83342ZM17.5001 18.9583L29.1667 11.6666V8.74992L17.5001 16.0416L5.83342 8.74992V11.6666L17.5001 18.9583Z" fill="white" fill-opacity="0.501961" />
                                                </svg>
                                            </span>
                                            laplanhteam@gmail.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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

export default Contact;