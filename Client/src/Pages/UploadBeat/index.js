
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./UploadBeat.module.scss";
import { useEffect, useState } from "react";
import { Alert, Backdrop, Box, Button, ButtonBase, CircularProgress, Modal, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import videoBg from '../../assets/video/video (2160p).mp4'
import ValidationUpload from "../../Validation/ValidationUpload";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import axiosInstance from "../../authorization/axiosInstance";
const cx = classNames.bind(styles);
function UploadBeat() {

  const [beatName, setBeatName] = useState("");
  const [price, setPrice] = useState("");
  // const [orderID, setOrderID] = useState("");
  // const [username, setUserName] = useState("");
  const token = useToken();
  let username = null
  if (token) {
    username = jwtDecode(token).username
  }
  const [inputGenres, setInputGenres] = useState("");
  let genres = []
  const [description, setDescription] = useState("");
  const [uploadMessage, setUploadMessage] = useState("")
  const [beatSoundDemo, setBeatSoundDemo] = useState("")
  const [beatSoundFull, setBeatSoundFull] = useState("")
  const [vocalRange, setVocalRange] = useState(null)
  const [listGenres, setListGenres] = useState(null)
  const [beatSoundDemoUrl, setBeatSoundDemoUrl] = useState("")
  const [beatSoundFullUrl, setBeatSoundFullUrl] = useState("")
  const [open, setOpen] = useState(false)
  const [messageSuccess, setMessageSuccess] = useState("")
  const [messageFailed, setMessageFailed] = useState("")
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
  const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
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
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const beat = { beatName, price, username, genres, description, vocalRange }
  const navigate = useNavigate();
  const formData = new FormData();

  useEffect(() => {
    loadGenres()
  }, [])

  const handleBeatSoundDemoChange = (e) => {
    const MIN_FILE_SIZE = 102400
    const MAX_FILE_SIZE = 1048576
    const selectedFile = e.target.files[0];
    const allowedTypes = ["audio/mpeg"];
    if (!allowedTypes.includes(selectedFile?.type)) {
      setOpenFailedSnackBar(true)
      setMessageFailed("Only audio/mpeg files are allowed!")
      return;
    }
    if (selectedFile?.size < MIN_FILE_SIZE || selectedFile?.size > MAX_FILE_SIZE) {
      console.log(selectedFile?.size < MIN_FILE_SIZE)
      setOpenFailedSnackBar(true)
      console.log(selectedFile?.size)
      setMessageFailed("File beatDemo size is in 100KB to 1MB!")
      return;
    }
    setOpenSuccessSnackBar(true)
    setMessageSuccess("Selected file successfully")
    setBeatSoundDemo(selectedFile)
    setBeatSoundDemoUrl(selectedFile?.name)
  }

  const handleBeatSoundFullChange = (e) => {
    const MIN_FILE_SIZE = 1048576
    const MAX_FILE_SIZE = 10485760
    const selectedFile = e.target.files[0];
    const allowedTypes = ["audio/mpeg"];
    if (selectedFile?.size < MIN_FILE_SIZE || selectedFile?.size > MAX_FILE_SIZE) {
      setOpenFailedSnackBar(true)
      console.log(selectedFile.size)
      setMessageFailed("File beatFull size is in 1MB to 10MB!")
      return;
    }
    if (!allowedTypes.includes(selectedFile?.type)) {
      setOpenFailedSnackBar(true)
      setMessageFailed("Only audio/mpeg files are allowed!")
      return;
    }
    setOpenSuccessSnackBar(true)
    setMessageSuccess("Selected file successfully")
    setBeatSoundFull(selectedFile)
    setBeatSoundFullUrl(selectedFile?.name)
  }


  const handleUpload = async () => {
    setOpen(true)
    console.log(inputGenres)
    for (let i = 0; i < inputGenres.length; i++) {
      genres.push(inputGenres[i])
    }
    console.log(genres)
    if (!token) {
      navigate("/login")
    }
    if (!beatName || !price || !username || !beatSoundDemo || !beatSoundFull || genres.length === 0 || !vocalRange || !description) {
      setOpen(false)
      setOpenFailedSnackBar(true)
      setMessageFailed("All fields must not be null!")
      return;
    } else if (price < 0) {
      setOpen(false)
      setOpenFailedSnackBar(true)
      setMessageFailed("Price must be higher than 0!")
      return;
    }

    formData.append('json', new Blob([JSON.stringify(beat)], { type: 'application/json' }));
    formData.append('file1', beatSoundFull);
    formData.append('file2', beatSoundDemo)
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    await axiosInstance.post("http://localhost:8080/api/v1/beat", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        setOpen(false)
        setOpenSuccessSnackBar(true)
        setMessageSuccess("Upload successfully")
        setTimeout(() => {
          navigate('/viewbeat');
        }, 500)

      })
      .catch((error) => {
        setOpen(false)
        setOpenFailedSnackBar(true)
        setMessageFailed("Upload Failed")
      })
  }
  const loadGenres = async () => {
    await axiosInstance.get("http://localhost:8080/api/v1/genre")
      .then((res) => {
        setListGenres(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  if (listGenres !== null) {
    return (
      <div className={cx("login-wrapper")}>
        {/* <div className={cx("main")}>
          <div className={cx("overlay")}></div>
          <video src={videoBg} autoPlay loop muted ></video>
        </div> */}
        <h1 className={cx("form-heading")}>Upload Beat</h1>
        {/* Form */}
        <div className={cx("form")}>
          {/* BeatName */}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Beat Name</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M17.4999 5.83325C19.047 5.83325 20.5307 6.44783 21.6247 7.5418C22.7187 8.63576 23.3333 10.1195 23.3333 11.6666C23.3333 13.2137 22.7187 14.6974 21.6247 15.7914C20.5307 16.8853 19.047 17.4999 17.4999 17.4999C15.9528 17.4999 14.4691 16.8853 13.3751 15.7914C12.2812 14.6974 11.6666 13.2137 11.6666 11.6666C11.6666 10.1195 12.2812 8.63576 13.3751 7.5418C14.4691 6.44783 15.9528 5.83325 17.4999 5.83325ZM17.4999 20.4166C23.9458 20.4166 29.1666 23.027 29.1666 26.2499V29.1666H5.83325V26.2499C5.83325 23.027 11.0541 20.4166 17.4999 20.4166Z" fill="black" />
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
          {/*Price */}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Price</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <g clipPath="url(#clip0_928_135)">
                  <path d="M33.7501 0H25.4167C24.8409 0 24.1051 0.41125 23.7109 0.951563L22.6026 2.41719C22.5248 2.52031 22.4814 2.65977 22.4819 2.80489C22.4822 2.87675 22.4932 2.94783 22.5144 3.01408C22.5356 3.08034 22.5666 3.14046 22.6055 3.19102C22.6444 3.24157 22.6905 3.28158 22.7412 3.30875C22.7919 3.33592 22.8461 3.34972 22.9009 3.34937C23.0114 3.34865 23.1173 3.29031 23.1951 3.18719L24.3067 1.715C24.5442 1.39016 25.0734 1.09375 25.4167 1.09375H33.7501C33.8606 1.09375 33.9666 1.15137 34.0447 1.25393C34.1228 1.35648 34.1667 1.49558 34.1667 1.64062V12.6317C34.1667 13.0812 33.9409 13.7758 33.6884 14.0941L21.9542 29.3759C21.8709 29.4761 21.7617 29.5309 21.6488 29.5293C21.5358 29.5277 21.4275 29.4697 21.3459 29.3672L19.1392 26.4698C19.0607 26.3702 18.9554 26.3151 18.8462 26.3164C18.7369 26.3176 18.6324 26.3751 18.5551 26.4765C18.4779 26.5779 18.4341 26.7151 18.4331 26.8585C18.4322 27.0018 18.4742 27.14 18.5501 27.2431L20.7567 30.1405C20.9936 30.4461 21.3117 30.6189 21.6439 30.6224C21.976 30.6258 22.2962 30.4597 22.5367 30.1591L34.2717 14.8761C34.6867 14.3533 35.0001 13.3875 35.0001 12.6317V1.64062C35.0001 0.736094 34.4392 0 33.7501 0Z" fill="black" />
                  <path d="M32.5319 5.46875C32.5319 4.26234 31.7844 3.28125 30.8653 3.28125C29.9461 3.28125 29.1986 4.26234 29.1986 5.46875C29.1986 6.67516 29.9461 7.65625 30.8653 7.65625C31.7844 7.65625 32.5319 6.67516 32.5319 5.46875ZM30.0319 5.46875C30.0318 5.25212 30.0806 5.04029 30.1722 4.86008C30.2638 4.67986 30.394 4.53936 30.5465 4.45636C30.699 4.37336 30.8667 4.35159 31.0286 4.3938C31.1905 4.43601 31.3392 4.5403 31.4559 4.69349C31.5727 4.84667 31.6521 5.04185 31.6843 5.25433C31.7164 5.46681 31.6998 5.68704 31.6366 5.88714C31.5734 6.08724 31.4663 6.25822 31.329 6.37844C31.1917 6.49866 31.0303 6.56272 30.8653 6.5625C30.4053 6.5625 30.0319 6.07141 30.0319 5.46875ZM13.7186 4.375C13.1428 4.375 12.4069 4.78625 12.0119 5.32656L0.3511 20.7823C0.123304 21.0974 -0.00222695 21.5164 0.00103872 21.9507C0.00430439 22.3851 0.136111 22.8007 0.3686 23.1098L9.0586 34.5155C9.2961 34.8283 9.61443 35 9.95527 35C10.2853 35 10.5969 34.837 10.8378 34.5341L22.5719 19.2522C22.9878 18.7294 23.3019 17.7636 23.3019 17.0067V6.01562C23.3019 5.11109 22.7411 4.375 22.0519 4.375H13.7186ZM22.5003 6.01562V17.0067C22.5003 17.4573 22.2428 18.1508 21.9903 18.4691L10.2561 33.7509C10.172 33.8484 10.0633 33.9015 9.95107 33.8999C9.83885 33.8983 9.73107 33.8421 9.6486 33.7422L0.957766 22.3377C0.879829 22.2323 0.835344 22.0919 0.833332 21.9451C0.83132 21.7982 0.871932 21.6559 0.946933 21.5469L12.6086 6.09C12.8461 5.76516 13.3753 5.46875 13.7186 5.46875H22.0519C22.2811 5.46875 22.5003 5.71375 22.5003 6.01562Z" fill="black" />
                  <path d="M19.1667 7.65625C18.2475 7.65625 17.5 8.63734 17.5 9.84375C17.5 11.0502 18.2475 12.0312 19.1667 12.0312C20.0858 12.0312 20.8333 11.0502 20.8333 9.84375C20.8333 8.63734 20.0858 7.65625 19.1667 7.65625ZM19.1667 10.9375C18.9521 10.9249 18.7495 10.8042 18.6011 10.6004C18.4526 10.3967 18.3698 10.1257 18.3698 9.84375C18.3698 9.56185 18.4526 9.29081 18.6011 9.08707C18.7495 8.88334 18.9521 8.7626 19.1667 8.75C19.3812 8.7626 19.5838 8.88334 19.7323 9.08707C19.8807 9.29081 19.9636 9.56185 19.9636 9.84375C19.9636 10.1257 19.8807 10.3967 19.7323 10.6004C19.5838 10.8042 19.3812 10.9249 19.1667 10.9375Z" fill="black" />
                </g>
                <defs>
                  <clipPath id="clip0_928_135">
                    <rect width="35" height="35" fill="black" />
                  </clipPath>
                </defs>
              </svg>
              <input
                type="number"
                placeholder="Price"
                className={cx("input-text")}
                value={price}
                onChange={(e) => setPrice(e.target.value)}

              />
            </div>
          </div>
          {/* {Genre} */}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Genres</td>

            <div className={cx("input")}>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
              >
                <path d="M14.5834 26.25C15.7986 26.25 16.8316 25.8246 17.6823 24.9739C18.533 24.1232 18.9584 23.0902 18.9584 21.875V11.6666H23.3334V8.74996H16.7709V18.0833C16.4306 17.8888 16.0781 17.743 15.7136 17.6458C15.349 17.5486 14.9722 17.5 14.5834 17.5C13.3681 17.5 12.3351 17.9253 11.4844 18.776C10.6337 19.6267 10.2084 20.6597 10.2084 21.875C10.2084 23.0902 10.6337 24.1232 11.4844 24.9739C12.3351 25.8246 13.3681 26.25 14.5834 26.25ZM17.5 32.0833C15.4827 32.0833 13.5868 31.7002 11.8125 30.9341C10.0382 30.168 8.49481 29.1292 7.18231 27.8177C5.86981 26.5052 4.83099 24.9618 4.06585 23.1875C3.30071 21.4132 2.91766 19.5173 2.91669 17.5C2.91669 15.4826 3.29974 13.5868 4.06585 11.8125C4.83197 10.0382 5.87078 8.49475 7.18231 7.18225C8.49481 5.86975 10.0382 4.83093 11.8125 4.06579C13.5868 3.30065 15.4827 2.9176 17.5 2.91663C19.5174 2.91663 21.4132 3.29968 23.1875 4.06579C24.9618 4.8319 26.5052 5.87072 27.8177 7.18225C29.1302 8.49475 30.1695 10.0382 30.9356 11.8125C31.7018 13.5868 32.0843 15.4826 32.0834 17.5C32.0834 19.5173 31.7003 21.4132 30.9342 23.1875C30.1681 24.9618 29.1293 26.5052 27.8177 27.8177C26.5052 29.1302 24.9618 30.1695 23.1875 30.9356C21.4132 31.7017 19.5174 32.0843 17.5 32.0833ZM17.5 29.1666C20.757 29.1666 23.5156 28.0364 25.7761 25.776C28.0365 23.5156 29.1667 20.7569 29.1667 17.5C29.1667 14.243 28.0365 11.4843 25.7761 9.22392C23.5156 6.9635 20.757 5.83329 17.5 5.83329C14.2431 5.83329 11.4844 6.9635 9.22398 9.22392C6.96356 11.4843 5.83335 14.243 5.83335 17.5C5.83335 20.7569 6.96356 23.5156 9.22398 25.776C11.4844 28.0364 14.2431 29.1666 17.5 29.1666Z" fill="black" />
              </svg>

              <div>

                <Popup trigger={<input
                  type="Text"
                  placeholder="Select beat genre"
                  className={cx("input-text")}
                  value={inputGenres}
                  onChange={(e) => setInputGenres(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  readOnly
                />}

                  position="right center"

                >
                  {(close) => (

                    <>
                      {listGenres.map((item) => {
                        return <div
                          key={item.id}
                          style={{
                            padding: '8px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                            backgroundColor: '#3498db',
                            border: '1px solid #fff',
                            borderRadius: '5px',
                          }}
                          onClick={() => {
                            setInputGenres((prevGenres) => {
                              if (prevGenres.includes(item.name)) {
                                return prevGenres.filter((genre) => genre !== item.name);
                              } else {
                                return [...prevGenres, item.name];
                              }
                            });
                            close();
                          }}
                        >
                          {item.name}
                        </div>
                      })}
                    </>
                  )}
                </Popup>
              </div>
            </div>
            {inputGenres.length !== 0 ?
              <Button variant={"contained"} style={{ marginTop: 20, marginRight: 200, backgroundColor: "#1976D2" }} onClick={() => setInputGenres([])}>Clear all</Button>
              : <></>}
          </div>

          {/*Description*/}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Description</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M11.6663 26.2498H23.333V23.3332H11.6663V26.2498ZM11.6663 20.4165H23.333V17.4998H11.6663V20.4165ZM8.74968 32.0832C7.94759 32.0832 7.26072 31.7973 6.68905 31.2257C6.11739 30.654 5.83204 29.9676 5.83301 29.1665V5.83317C5.83301 5.03109 6.11884 4.34421 6.69051 3.77255C7.26218 3.20088 7.94857 2.91553 8.74968 2.91651H20.4163L29.1663 11.6665V29.1665C29.1663 29.9686 28.8805 30.6555 28.3088 31.2271C27.7372 31.7988 27.0508 32.0841 26.2497 32.0832H8.74968ZM18.958 13.1248H26.2497L18.958 5.83317V13.1248Z" fill="black" />
              </svg>
              <input
                type="Text"
                placeholder="Description"
                className={cx("input-text")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/*Tone*/}
          <div>
            <td style={{ fontSize: '1.6rem', fontWeight: 'bold', marginLeft: '28px', fontFamily: 'fredoka one' }}>Tone*</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <g clipPath="url(#clip0_928_135)">
                  <path d="M33.7501 0H25.4167C24.8409 0 24.1051 0.41125 23.7109 0.951563L22.6026 2.41719C22.5248 2.52031 22.4814 2.65977 22.4819 2.80489C22.4822 2.87675 22.4932 2.94783 22.5144 3.01408C22.5356 3.08034 22.5666 3.14046 22.6055 3.19102C22.6444 3.24157 22.6905 3.28158 22.7412 3.30875C22.7919 3.33592 22.8461 3.34972 22.9009 3.34937C23.0114 3.34865 23.1173 3.29031 23.1951 3.18719L24.3067 1.715C24.5442 1.39016 25.0734 1.09375 25.4167 1.09375H33.7501C33.8606 1.09375 33.9666 1.15137 34.0447 1.25393C34.1228 1.35648 34.1667 1.49558 34.1667 1.64062V12.6317C34.1667 13.0812 33.9409 13.7758 33.6884 14.0941L21.9542 29.3759C21.8709 29.4761 21.7617 29.5309 21.6488 29.5293C21.5358 29.5277 21.4275 29.4697 21.3459 29.3672L19.1392 26.4698C19.0607 26.3702 18.9554 26.3151 18.8462 26.3164C18.7369 26.3176 18.6324 26.3751 18.5551 26.4765C18.4779 26.5779 18.4341 26.7151 18.4331 26.8585C18.4322 27.0018 18.4742 27.14 18.5501 27.2431L20.7567 30.1405C20.9936 30.4461 21.3117 30.6189 21.6439 30.6224C21.976 30.6258 22.2962 30.4597 22.5367 30.1591L34.2717 14.8761C34.6867 14.3533 35.0001 13.3875 35.0001 12.6317V1.64062C35.0001 0.736094 34.4392 0 33.7501 0Z" fill="white" />
                  <path d="M32.5319 5.46875C32.5319 4.26234 31.7844 3.28125 30.8653 3.28125C29.9461 3.28125 29.1986 4.26234 29.1986 5.46875C29.1986 6.67516 29.9461 7.65625 30.8653 7.65625C31.7844 7.65625 32.5319 6.67516 32.5319 5.46875ZM30.0319 5.46875C30.0318 5.25212 30.0806 5.04029 30.1722 4.86008C30.2638 4.67986 30.394 4.53936 30.5465 4.45636C30.699 4.37336 30.8667 4.35159 31.0286 4.3938C31.1905 4.43601 31.3392 4.5403 31.4559 4.69349C31.5727 4.84667 31.6521 5.04185 31.6843 5.25433C31.7164 5.46681 31.6998 5.68704 31.6366 5.88714C31.5734 6.08724 31.4663 6.25822 31.329 6.37844C31.1917 6.49866 31.0303 6.56272 30.8653 6.5625C30.4053 6.5625 30.0319 6.07141 30.0319 5.46875ZM13.7186 4.375C13.1428 4.375 12.4069 4.78625 12.0119 5.32656L0.3511 20.7823C0.123304 21.0974 -0.00222695 21.5164 0.00103872 21.9507C0.00430439 22.3851 0.136111 22.8007 0.3686 23.1098L9.0586 34.5155C9.2961 34.8283 9.61443 35 9.95527 35C10.2853 35 10.5969 34.837 10.8378 34.5341L22.5719 19.2522C22.9878 18.7294 23.3019 17.7636 23.3019 17.0067V6.01562C23.3019 5.11109 22.7411 4.375 22.0519 4.375H13.7186ZM22.5003 6.01562V17.0067C22.5003 17.4573 22.2428 18.1508 21.9903 18.4691L10.2561 33.7509C10.172 33.8484 10.0633 33.9015 9.95107 33.8999C9.83885 33.8983 9.73107 33.8421 9.6486 33.7422L0.957766 22.3377C0.879829 22.2323 0.835344 22.0919 0.833332 21.9451C0.83132 21.7982 0.871932 21.6559 0.946933 21.5469L12.6086 6.09C12.8461 5.76516 13.3753 5.46875 13.7186 5.46875H22.0519C22.2811 5.46875 22.5003 5.71375 22.5003 6.01562Z" fill="white" />
                  <path d="M19.1667 7.65625C18.2475 7.65625 17.5 8.63734 17.5 9.84375C17.5 11.0502 18.2475 12.0312 19.1667 12.0312C20.0858 12.0312 20.8333 11.0502 20.8333 9.84375C20.8333 8.63734 20.0858 7.65625 19.1667 7.65625ZM19.1667 10.9375C18.9521 10.9249 18.7495 10.8042 18.6011 10.6004C18.4526 10.3967 18.3698 10.1257 18.3698 9.84375C18.3698 9.56185 18.4526 9.29081 18.6011 9.08707C18.7495 8.88334 18.9521 8.7626 19.1667 8.75C19.3812 8.7626 19.5838 8.88334 19.7323 9.08707C19.8807 9.29081 19.9636 9.56185 19.9636 9.84375C19.9636 10.1257 19.8807 10.3967 19.7323 10.6004C19.5838 10.8042 19.3812 10.9249 19.1667 10.9375Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_928_135">
                    <rect width="35" height="35" fill="black" />
                  </clipPath>
                </defs>
              </svg>
              <input
                type="Text"
                placeholder="Tone"
                className={cx("input-text")}
                value={vocalRange}
                onChange={(e) => setVocalRange(e.target.value)}
              />
            </div>
          </div>

          {/* BeatSoundDemo*/}
          <div className={cx('choosefile')}>
            <td style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '30px', fontFamily: 'fredoka one' }}>ChooseFileDemo</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M1.25 17.6999H6.725C6.95553 17.6972 7.18121 17.6333 7.3789 17.5147C7.57659 17.3961 7.73918 17.227 7.85 17.0249L12.35 8.02488C12.4609 7.8008 12.6377 7.61602 12.8567 7.49536C13.0757 7.3747 13.3263 7.32393 13.575 7.34988C13.8227 7.36662 14.0591 7.45976 14.2516 7.61647C14.4441 7.77318 14.5833 7.98575 14.65 8.22488L20.225 26.7749C20.2982 27.0265 20.4485 27.2488 20.6549 27.4103C20.8613 27.5718 21.1132 27.6643 21.375 27.6749C21.6204 27.6667 21.8579 27.5865 22.0579 27.4443C22.258 27.302 22.4118 27.104 22.5 26.8749L25.925 18.4999C26.0193 18.2649 26.1814 18.0634 26.3907 17.9209C26.5999 17.7785 26.8469 17.7015 27.1 17.6999H33.75" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div>DemoBeat: </div>
              <div className={cx("file")}>
                <label>
                  <input
                    type="file"
                    placeholder="BeatSound"
                    className={cx("input-text", "img-click")}
                    onChange={(e) => handleBeatSoundDemoChange(e)}
                  />
                  <span className={cx("file-custom")}>{beatSoundDemoUrl}</span>
                </label>
              </div>
            </div>
          </div>

          {/* BeatSoundFull*/}
          <div className={cx('choosefile')}>
            <td style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: '30px', fontFamily: 'fredoka one' }}>ChooseFileFullBeat</td>
            <div className={cx("input")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M1.25 17.6999H6.725C6.95553 17.6972 7.18121 17.6333 7.3789 17.5147C7.57659 17.3961 7.73918 17.227 7.85 17.0249L12.35 8.02488C12.4609 7.8008 12.6377 7.61602 12.8567 7.49536C13.0757 7.3747 13.3263 7.32393 13.575 7.34988C13.8227 7.36662 14.0591 7.45976 14.2516 7.61647C14.4441 7.77318 14.5833 7.98575 14.65 8.22488L20.225 26.7749C20.2982 27.0265 20.4485 27.2488 20.6549 27.4103C20.8613 27.5718 21.1132 27.6643 21.375 27.6749C21.6204 27.6667 21.8579 27.5865 22.0579 27.4443C22.258 27.302 22.4118 27.104 22.5 26.8749L25.925 18.4999C26.0193 18.2649 26.1814 18.0634 26.3907 17.9209C26.5999 17.7785 26.8469 17.7015 27.1 17.6999H33.75" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div>FullBeat: </div>
              <div className={cx("file")}>
                <label>
                  <input
                    type="file"
                    placeholder="BeatSound"
                    className={cx("input-text", "img-click")}
                    onChange={(e) => handleBeatSoundFullChange(e)}
                  />
                  <span className={cx("file-custom")}>{beatSoundFullUrl}</span>
                </label>
              </div>
            </div>
          </div>

          <Button variant="contained" className={cx("input-upload", "submit")} onClick={() => [handleUpload()]} >
            <input
              type="submit"
              value="Upload"
              className={cx("input-text-upload", "input-submit")}
            />
          </Button>
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
        {/* Footer */}
        {/* <div className={cx("footer")}>
        <div className={cx("footer-left")}>
          <input
            type="checkbox"
            id="remember"
            name="rememeber"
            value="check"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className={cx("input-check")}
          />
          <label htmlFor="remember" className={cx("text")}>
            Remember me
          </label>
        </div>
        <div className={cx("footer-right", "text")}>Forgot password ?</div>
      </div> */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div >
    );
  }
  else {
    return <div></div>
  }
}
export default UploadBeat;
