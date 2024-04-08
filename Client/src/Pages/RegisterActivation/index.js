import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from "../RegisterActivation/RegisterActivation.module.scss"
import Button from '@mui/material/Button';
import axios from 'axios';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Countdown from 'react-countdown';


const cx = classNames.bind(style)
function RegisterActivation() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activetoken = searchParams.get('activetoken')
  const navigate = useNavigate()
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return login();
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };
  const activateMessage = useParams();
  const login = () =>{
    navigate("/")
  }
  const handleActivation = async () => {
    await axios.get("http://localhost:8080/api/v1/user/active", {
      params: {
        activetoken: activetoken
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() =>{
    handleActivation()
  },[])

  return (
    <div>
      <div className={cx("icon")}>
        <svg width="150" height="150" viewBox="0 0 261 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_5)">
            <path d="M135.754 219.999C204.925 219.999 261 172.75 261 114.465C261 56.1807 204.925 8.93164 135.754 8.93164C66.5824 8.93164 10.5078 56.1807 10.5078 114.465C10.5078 172.75 66.5824 219.999 135.754 219.999Z" fill="url(#paint0_linear_1_5)" />
            <path d="M202.787 81.4234L189.429 70.1635C187.597 68.6178 185.369 67.8455 182.75 67.8455C180.13 67.8455 177.902 68.6178 176.07 70.1635L111.634 124.561L82.7554 100.135C80.9217 98.5897 78.6949 97.8174 76.0762 97.8174C73.4564 97.8174 71.2296 98.5897 69.3959 100.135L56.0375 111.395C54.2038 112.941 53.2875 114.818 53.2875 117.026C53.2875 119.234 54.2038 121.112 56.0375 122.656L91.595 152.628L104.955 163.888C106.787 165.434 109.014 166.206 111.634 166.206C114.252 166.206 116.479 165.433 118.313 163.888L131.672 152.628L202.787 92.6843C204.62 91.1387 205.538 89.2617 205.538 87.0534C205.539 84.8461 204.62 82.9691 202.787 81.4234Z" fill="white" fill-opacity="0.850806" />
          </g>
          <defs>
            <linearGradient id="paint0_linear_1_5" x1="130.588" y1="215.031" x2="130.588" y2="11.5005" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0BAC83" />
              <stop offset="1" stop-color="#10DA96" />
            </linearGradient>
            <clipPath id="clip0_1_5">
              <rect width="261" height="220" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className={cx("text")}>
        Registration Successfully
      </div>
      <div className={cx("text")}>
        Redirect to Home Page...
      </div>
      <div className={cx("countdown")}>
      <Countdown date={Date.now() + 3000} renderer={renderer} />
      </div>
    </div>
  );
}

export default RegisterActivation;
