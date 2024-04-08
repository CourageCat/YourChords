
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { useState } from "react";
import { Alert, Backdrop, Box, Button, CircularProgress, Modal, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import videoBg from '../../assets/video/video (2160p).mp4'


const cx = classNames.bind(styles);

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("CUS");
  const [registrationMessage, setRegistrationMessage] = useState(null)
  const user = { userName, password, email, fullName, role }
  const [open, setOpen] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("")
  const [messageFailed, setMessageFailed] = useState("")
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: 25,
  };

  const handleSubmit = async (e) => {
    setOpen(true)
    setRegistrationMessage()
    console.log(userName, password, email, fullName, role);
    if (!userName || !password || !email || !fullName || !role) {
      setMessageFailed("All fields must not be null!")
      setOpenFailedSnackBar(true)
      setOpen(false)
      return
    }
    if (userName.length < 6) {
      setMessageFailed("Username must be at least 6 characters!")
      setOpenFailedSnackBar(true)
      setOpen(false)
      return
    }
    if (!email.match("^[A-Za-z0-9+_.-]+@(gmail\\.com|gmail\\.com\\.vn|fpt\\.edu\\.vn)$")) {
      setMessageFailed("Invalid Email!")
      setOpenFailedSnackBar(true)
      setOpen(false)
      return
    }
    if (password.length < 6) {
      setMessageFailed("Password must be equal or highter than 6 characters!")
      setOpenFailedSnackBar(true)
      setOpen(false)
      return
    }
    await axios.post("http://localhost:8080/api/auth/register", user)
      .then((res) => {
        console.log(userName, password, email, fullName, role);
        setUserName("")
        setEmail("")
        setFullName("")
        setPassWord("")
        setCheckPassword("")
        setOpen(false)
        setMessageSuccess("Register Successfully.")
        setOpenSuccessSnackBar(true)
        navigate('/mailactivation');

        // Replace '/login' with the actual login route
      })
      .catch((error) => {
        if (error.response.data) {
          setMessageFailed("Username or Email has been used!")
          setOpenFailedSnackBar(true)
          setOpen(false)
          return
        }

      })

  }
  return (
    <div>
      <div className={cx("login-wrapper")}>
        {/* <div className={cx("main")}>
        <div className={cx("overlay")}></div>
        <video src={videoBg} autoPlay loop muted ></video>
      </div> */}
        <h1 className={cx("form-heading")}>Register</h1>
        {/* Form */}
        <div className={cx("form")}>
          {/* Username*/}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>User Name*</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.4999 5.83325C19.047 5.83325 20.5307 6.44783 21.6247 7.5418C22.7187 8.63576 23.3333 10.1195 23.3333 11.6666C23.3333 13.2137 22.7187 14.6974 21.6247 15.7914C20.5307 16.8853 19.047 17.4999 17.4999 17.4999C15.9528 17.4999 14.4691 16.8853 13.3751 15.7914C12.2812 14.6974 11.6666 13.2137 11.6666 11.6666C11.6666 10.1195 12.2812 8.63576 13.3751 7.5418C14.4691 6.44783 15.9528 5.83325 17.4999 5.83325ZM17.4999 20.4166C23.9458 20.4166 29.1666 23.027 29.1666 26.2499V29.1666H5.83325V26.2499C5.83325 23.027 11.0541 20.4166 17.4999 20.4166Z" fill="black" />
              </svg>
              <input
                type="text"
                placeholder="Username"
                className={cx("input-text")}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          {/*Email */}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Email*</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.4999 5.83325C19.047 5.83325 20.5307 6.44783 21.6247 7.5418C22.7187 8.63576 23.3333 10.1195 23.3333 11.6666C23.3333 13.2137 22.7187 14.6974 21.6247 15.7914C20.5307 16.8853 19.047 17.4999 17.4999 17.4999C15.9528 17.4999 14.4691 16.8853 13.3751 15.7914C12.2812 14.6974 11.6666 13.2137 11.6666 11.6666C11.6666 10.1195 12.2812 8.63576 13.3751 7.5418C14.4691 6.44783 15.9528 5.83325 17.4999 5.83325ZM17.4999 20.4166C23.9458 20.4166 29.1666 23.027 29.1666 26.2499V29.1666H5.83325V26.2499C5.83325 23.027 11.0541 20.4166 17.4999 20.4166Z" fill="black" />
              </svg>
              <input
                type="Email"
                placeholder="Email"
                className={cx("input-text")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* FullName*/}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Full Name*</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.4999 5.83325C19.047 5.83325 20.5307 6.44783 21.6247 7.5418C22.7187 8.63576 23.3333 10.1195 23.3333 11.6666C23.3333 13.2137 22.7187 14.6974 21.6247 15.7914C20.5307 16.8853 19.047 17.4999 17.4999 17.4999C15.9528 17.4999 14.4691 16.8853 13.3751 15.7914C12.2812 14.6974 11.6666 13.2137 11.6666 11.6666C11.6666 10.1195 12.2812 8.63576 13.3751 7.5418C14.4691 6.44783 15.9528 5.83325 17.4999 5.83325ZM17.4999 20.4166C23.9458 20.4166 29.1666 23.027 29.1666 26.2499V29.1666H5.83325V26.2499C5.83325 23.027 11.0541 20.4166 17.4999 20.4166Z" fill="black" />
              </svg>
              <input
                type="text"
                placeholder="Fullname"
                className={cx("input-text")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          {/* Role */}
          <div style={{ marginLeft: 30 }}>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Role*</td>
            <div className={cx("input-select")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.4999 5.83325C19.047 5.83325 20.5307 6.44783 21.6247 7.5418C22.7187 8.63576 23.3333 10.1195 23.3333 11.6666C23.3333 13.2137 22.7187 14.6974 21.6247 15.7914C20.5307 16.8853 19.047 17.4999 17.4999 17.4999C15.9528 17.4999 14.4691 16.8853 13.3751 15.7914C12.2812 14.6974 11.6666 13.2137 11.6666 11.6666C11.6666 10.1195 12.2812 8.63576 13.3751 7.5418C14.4691 6.44783 15.9528 5.83325 17.4999 5.83325ZM17.4999 20.4166C23.9458 20.4166 29.1666 23.027 29.1666 26.2499V29.1666H5.83325V26.2499C5.83325 23.027 11.0541 20.4166 17.4999 20.4166Z" fill="black" />
              </svg>
              {/* <select
            className={cx("input-text")}
            onChange={e => setRole(e.target.value)}
            defaultValue={role}
          >
            <option className={cx("role-item")} value="status">Role</option>
            <option value="0">Customer</option>
            <option value="1">Musician</option>
          </select> */}
              <select
                className={cx("input-text-choose")}
                onChange={(e) => setRole(e.target.value)}
                defaultValue={role}
              >
                <option value="Customer">Customer</option>
                <option value="Musician">Musician</option>
              </select>
            </div>
          </div>
          {/* Password */}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Password*</td>
            <div className={cx("input")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 45 45"
                fill="none"
              >
                <path
                  d="M22.5 31.875C21.5054 31.875 20.5516 31.4799 19.8484 30.7766C19.1451 30.0734 18.75 29.1196 18.75 28.125C18.75 26.0438 20.4187 24.375 22.5 24.375C23.4946 24.375 24.4484 24.7701 25.1516 25.4734C25.8549 26.1766 26.25 27.1304 26.25 28.125C26.25 29.1196 25.8549 30.0734 25.1516 30.7766C24.4484 31.4799 23.4946 31.875 22.5 31.875ZM33.75 37.5V18.75H11.25V37.5H33.75ZM33.75 15C34.7446 15 35.6984 15.3951 36.4016 16.0984C37.1049 16.8016 37.5 17.7554 37.5 18.75V37.5C37.5 38.4946 37.1049 39.4484 36.4016 40.1516C35.6984 40.8549 34.7446 41.25 33.75 41.25H11.25C10.2554 41.25 9.30161 40.8549 8.59835 40.1516C7.89509 39.4484 7.5 38.4946 7.5 37.5V18.75C7.5 16.6687 9.16875 15 11.25 15H13.125V11.25C13.125 8.7636 14.1127 6.37903 15.8709 4.62087C17.629 2.86272 20.0136 1.875 22.5 1.875C23.7311 1.875 24.9502 2.11749 26.0877 2.58863C27.2251 3.05977 28.2586 3.75032 29.1291 4.62087C29.9997 5.49142 30.6902 6.52492 31.1614 7.66234C31.6325 8.79977 31.875 10.0189 31.875 11.25V15H33.75ZM22.5 5.625C21.0082 5.625 19.5774 6.21763 18.5225 7.27252C17.4676 8.32742 16.875 9.75816 16.875 11.25V15H28.125V11.25C28.125 9.75816 27.5324 8.32742 26.4775 7.27252C25.4226 6.21763 23.9918 5.625 22.5 5.625Z"
                  fill="black "
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                className={cx("input-text")}
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
          </div>
          {/* Confirm Password*/}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Confirm Password*</td>
            <div className={cx("input")}>
              <svg className={cx("icon-input")}
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 45 45"
                fill="none"
              >
                <path
                  d="M22.5 31.875C21.5054 31.875 20.5516 31.4799 19.8484 30.7766C19.1451 30.0734 18.75 29.1196 18.75 28.125C18.75 26.0438 20.4187 24.375 22.5 24.375C23.4946 24.375 24.4484 24.7701 25.1516 25.4734C25.8549 26.1766 26.25 27.1304 26.25 28.125C26.25 29.1196 25.8549 30.0734 25.1516 30.7766C24.4484 31.4799 23.4946 31.875 22.5 31.875ZM33.75 37.5V18.75H11.25V37.5H33.75ZM33.75 15C34.7446 15 35.6984 15.3951 36.4016 16.0984C37.1049 16.8016 37.5 17.7554 37.5 18.75V37.5C37.5 38.4946 37.1049 39.4484 36.4016 40.1516C35.6984 40.8549 34.7446 41.25 33.75 41.25H11.25C10.2554 41.25 9.30161 40.8549 8.59835 40.1516C7.89509 39.4484 7.5 38.4946 7.5 37.5V18.75C7.5 16.6687 9.16875 15 11.25 15H13.125V11.25C13.125 8.7636 14.1127 6.37903 15.8709 4.62087C17.629 2.86272 20.0136 1.875 22.5 1.875C23.7311 1.875 24.9502 2.11749 26.0877 2.58863C27.2251 3.05977 28.2586 3.75032 29.1291 4.62087C29.9997 5.49142 30.6902 6.52492 31.1614 7.66234C31.6325 8.79977 31.875 10.0189 31.875 11.25V15H33.75ZM22.5 5.625C21.0082 5.625 19.5774 6.21763 18.5225 7.27252C17.4676 8.32742 16.875 9.75816 16.875 11.25V15H28.125V11.25C28.125 9.75816 27.5324 8.32742 26.4775 7.27252C25.4226 6.21763 23.9918 5.625 22.5 5.625Z"
                  fill="black "
                />
              </svg>
              <input
                type="password"
                placeholder="Confirm password"
                className={cx("input-text")}
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
            </div>
          </div>

          <Button variant="contained" className={cx("input-regis", "submit")} onClick={() => [handleSubmit()]}>
            <input
              type="submit"
              value="Sign up"
              className={cx("input-text-register", "input-submit")}
            />
          </Button>
          <div className={cx("heading")}>
            <span className={cx("title")}>Have an account ?</span>
            <Link to="/login" className={cx("link")}>
              <span className={cx("title-link")} style={{ fontFamily: 'fredoka one' }}>Login here!!!</span>
            </Link>
          </div>
        </div>
        {/* Footer */}
      </div>
      <Snackbar open={openSuccessSnackBar} autoHideDuration={2000} onClose={() => setOpenSuccessSnackBar(true)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }} >
        <Alert variant="filled" onClose={() => setOpenSuccessSnackBar(false)} severity="success" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
          {messageSuccess}
        </Alert>
      </Snackbar>
      <Snackbar open={openFailedSnackBar} autoHideDuration={2000} onClose={() => setOpenFailedSnackBar(true)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }}>
        <Alert variant="filled" onClose={() => setOpenFailedSnackBar(false)} severity="error" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
          {messageFailed}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );

}

export default Register;
