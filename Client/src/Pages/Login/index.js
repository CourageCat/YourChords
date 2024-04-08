import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useState } from "react";
import { Alert, Box, Button, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import videoBg from '../../assets/video/video (2160p).mp4'

import axios from "axios";
import ValidationLogin from "../../Validation/ValidationLogin";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
const cx = classNames.bind(styles);

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();
  const [messageSuccess, setMessageSuccess] = useState("")
  const [messageFailed, setMessageFailed] = useState("")
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
  const [listUserLogin, setListUserLogin] = useState([])
  const user = { username, password }
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
  const handleSubmit = async () => {
    // Validation form
    if (username === "" || password === "") {
      setOpenFailedSnackBar(true)
      setMessageFailed("All fields must not be null!");
      return;
    }

    
        // if (listUserLogin[i].status === 0) {
        //   setOpenFailedSnackBar(true)
        //   setMessageFailed("Your account is banned by the admin!");
        //   return;
        // }
        
  
    // await axios.get(`http://localhost:8080/api/auth/${username}`)
    //   .then((res) => {
    //     if (res.data === -1) {
    //       setOpenFailedSnackBar(true)
    //       setMessageFailed("Your account is not activated! Please go to your mail to activate!");
    //       return;
    //     }
    //     else if (res.data === 0) {
    //       setOpenFailedSnackBar(true)
    //       setMessageFailed("Your account is banned by the admin!");
    //       return;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    
    await axios.post("http://localhost:8080/api/auth/login", user)
      .then((res) => {
        if(res.data.msg.includes("banned")){
          setOpenFailedSnackBar(true)
          setMessageFailed("Your account is banned by the admin!");
          return;
        }
        if(res.data.msg.includes("not active")){
          setOpenFailedSnackBar(true)
          setMessageFailed("Your account is not activated! Please go to your mail to activate!");
          return;
        }
        console.log(res.data.token)
        setOpenSuccessSnackBar(true)
        setMessageSuccess("Login successfully")
        localStorage.setItem("token", res.data.token);
        if (jwtDecode(res.data.token).role === "CUS") {
          navigate("/")
        } else if (jwtDecode(res.data.token).role === "MS") {
          navigate("/viewbeat")
        } else {
          navigate("/listuser")
        }

      })
      .catch((error) => {
        setOpenFailedSnackBar(true)
        setMessageFailed("Wrong Username or Password!");
        console.log(error.message)
      })
  }

  useEffect(() => {
    const loadUserLogin = async () => {
      await axios.get("http://localhost:8080/api/v1/admin")
        .then((res) => {
          setListUserLogin(res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    loadUserLogin()
  }, [])

  return (
    <div>
      <div className={cx("login-wrapper")}>
        {/* <div className={cx("main")}>
        <div className={cx("overlay")}></div>
        <video src={videoBg} autoPlay loop muted ></video>
      </div> */}
        <h1 className={cx("form-heading")}>Login</h1>
        {/* Form */}
        <div className={cx("form")}>
          {/* Username or email */}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>User Name*</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.4999 5.83325C19.047 5.83325 20.5307 6.44783 21.6247 7.5418C22.7187 8.63576 23.3333 10.1195 23.3333 11.6666C23.3333 13.2137 22.7187 14.6974 21.6247 15.7914C20.5307 16.8853 19.047 17.4999 17.4999 17.4999C15.9528 17.4999 14.4691 16.8853 13.3751 15.7914C12.2812 14.6974 11.6666 13.2137 11.6666 11.6666C11.6666 10.1195 12.2812 8.63576 13.3751 7.5418C14.4691 6.44783 15.9528 5.83325 17.4999 5.83325ZM17.4999 20.4166C23.9458 20.4166 29.1666 23.027 29.1666 26.2499V29.1666H5.83325V26.2499C5.83325 23.027 11.0541 20.4166 17.4999 20.4166Z" fill="black" />
              </svg>
              <input
                type="text"
                placeholder="Enter Username"
                className={cx("input-text")}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              {/* <Box style={{fontSize: 10}}
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 }
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{fontSize: 20}}> 
              <TextField
                label="UserName"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                inputProps={{
                  style: {
                    fontsize: "14px",
                    height: 60,
                    width: 400,
                    padding: '0 14px',
                    fontweight: 'bold'
                  },
                }}
              />
            </div>
          </Box> */}
            </div>
          </div>

          {/* Password */}
          <div style={{ marginTop: -15 }}>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>
              Password*
            </td>
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
                  fill="black"
                />
              </svg>
              <input
                type="password"
                placeholder=" Enter password"
                className={cx("input-text")}
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
              />
            </div>
          </div>

          <Button variant="contained" style={{ marginLeft: 24 }} className={cx("submit-wrapper")} onClick={handleSubmit}>
            <input
              type="submit"
              value="Sign in"
              className={cx("input-submit")}
            />
          </Button>
          <div className={cx("heading")}>
            <span className={cx("title")}>Do not have an account ?</span>
            <Link to="/register" className={cx("link")}>
              <span className={cx("title-link")}>Register here</span>
            </Link>
          </div>
        </div>
        {/* Footer */}
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

export default Login;
