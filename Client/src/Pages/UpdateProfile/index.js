
import classNames from "classnames/bind";
import styles from "./UpdateProfile.module.scss";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Tab } from "bootstrap";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import { TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.scss';
import 'react-tabs/style/react-tabs.css';
const cx = classNames.bind(styles);
const DATA = [
    {

        name: "abc",
    },
]
function MyProfile() {
    const [isChecked, setIsChecked] = useState(false);
    const [fullName, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const mail = "";
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("MALE");
    const [userImg, setUserImg] = useState()
    let id = ""
    const token = useToken()
    if (token) {
        id = jwtDecode(token).sub
    }
    const userProfile = { fullName, address, phone, gender, id }
    const formData = new FormData()

    const loadDetailUser = async () => {
        await axiosInstance.get("")
    }

    const handleEdit = async () => {
        if (!fullName || !address || !phone || !gender || !id) {
            console.log(id + fullName + address + phone + gender)
            console.log(123)
            return
        }
        formData.append('json', new Blob([JSON.stringify(userProfile)], { type: 'application/json' }));
        console.log(userImg)
        formData.append('file', userImg);


        await axiosInstance.patch("http://localhost:8080/api/v1/user/customer", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div>
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
                                <td className={cx("")}>
                                    <td>
                                        <label className={cx("text-name")}>Address</label>
                                    </td>
                                    <div className={cx("placeholder-ten")}>
                                        <input className={cx("input-username")} type="text" placeholder value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                </td>
                            </div>
                            {/* <div className={cx("part2")}>
                                <td>
                                    <div className={cx("email-text")}>
                                        Email:
                                    </div>
                                    <div className={cx("email-change")}>
                                        {mail}
                                    </div>
                                </td>

                            </div> */}
                            <div className={cx("part3")}>
                                <td className={cx("phone-number")}>
                                    Phone number
                                </td>
                                <div className={cx("placeholder-ten")}>
                                    <input className={cx("input-phonenumber")} type="text" placeholder value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className={cx("part4")} style={{ marginLeft: 65 }}>
                                <td className={cx("sex")}>
                                    Sex
                                </td>
                                <td>
                                    <div className={cx("sex-button")}>
                                        <div className={cx("stardus-radio-group")}>
                                            <div className={cx("footer")}>
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
                                                        Male
                                                    </label>
                                                </div>
                                            </div>
                                            <div className={cx("footer")}>
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
                                            </div>

                                        </div>
                                    </div>
                                </td>
                            </div>
                            <div className={cx("part5")}>
                                <td className={cx("save-button")}>
                                </td>
                                <td className={cx("button-type")}>
                                    <button type="button" className={cx("button-save-details")} aria-disabled="false" onClick={() => handleEdit()}>Update</button>
                                </td>
                            </div>

                        </table>
                    </form>
                </div>
                <div className={cx("line")} />
                <div className={cx("img-user-div")}>
                    <div className={cx("img-user-div1")}>
                        <div className={cx("img-user-div2")}>
                            <div className={cx("img-user-div3")}>
                                <img style={{objectFit: 'cover'}} className={cx("box-img")} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s" alt="" />
                            </div>
                            <div className={cx("info-user")}>
                                <td style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                    User Name
                                </td>
                                <td style={{ marginLeft: 10, fontSize: '2rem', fontWeight: '300' }}>
                                    Customer
                                </td>
                            </div>
                            <input className={cx("img-click")} style={{ marginLeft: -30 }} type="file" accept=".jpg,.jpeg,.png" src="#" onChange={(e) => setUserImg(e.target.files[0])} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




export default MyProfile;