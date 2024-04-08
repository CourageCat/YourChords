import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Button } from "@mui/material";
import OwlCarousel from "../../components/OwlCarousel";
import videoBg from '../../assets/video/video (2160p).mp4'
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const cx = classNames.bind(styles);
function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {

    } else if (jwtDecode(token).role === "MS") {
      navigate("/viewBeat")
    } else if (jwtDecode(token).role === "AD") {
      navigate("/listUser")
    } else {

    }
  }, [])
  const token = useToken()


  return (
    <div className={cx("home-wrapper")}>
      {/* Intro */}
      <div className={cx("intro")}>
        <div className={cx("title-slogan")}>
          <h1 className={cx("title")}>PRACTICE YOUR CHORDS</h1>
          <span className={cx("slogan")}>
            Take your chord practice to the next level with our structured chord
            exercises.
          </span>
        </div>
        <div className={cx("main")}>
          <div className={cx("overlay")}></div>
          <video src={videoBg} autoPlay loop muted ></video>
        </div>
        <div className={cx("slide-show")}>
          <div className={cx("action")}>
            <Link to="/chordsdetails">
              <Button variant="contained" className={cx("start")}>
                <div className={cx("title")}>
                  Start Praticing
                </div>
              </Button>
            </Link>
          </div>
          <div className={cx("images")}>
            <OwlCarousel />
          </div>
        </div>
      </div>

      {/* Body Trending */}
      <div className={cx("body")}>
        <div className={cx("title")}>
          <div className={(cx("title-header"))}>
            <div className={cx("text")}>
              TRENDING
            </div>
            <div className={cx("line")}></div>
          </div>
          <div className={cx("trending-parts")}>
            {/* Trending detail */}
            <Link style={{color:"black"}} to={"/viewdetailbeat/34"}><div className={cx("trending-details")}>
              <div className={cx("trending-top")}>
                <div className={cx("trending-top-left")}>
                  <div>
                    <img className={cx("trending-details-img")} src={require("../../assets/images/Trending/Rectangle 33.png")}>
                    </img>
                    <div style={{ textwrapper: "nowrap"}} className={cx("trending-subcribe")}>
                      View Detail
                    </div>
                  </div>
                  <div className={cx("image-trending-ellipse")}>
                    <div className={cx("header-trending")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                        <path d="M10 0C8.68678 0 7.38642 0.296172 6.17317 0.871607C4.95991 1.44704 3.85752 2.29047 2.92893 3.35373C1.05357 5.50109 0 8.41353 0 11.4504C0 14.4872 1.05357 17.3996 2.92893 19.547C3.85752 20.6103 4.95991 21.4537 6.17317 22.0291C7.38642 22.6045 8.68678 22.9007 10 22.9007C12.6522 22.9007 15.1957 21.6943 17.0711 19.547C18.9464 17.3996 20 14.4872 20 11.4504C20 9.94668 19.7413 8.45772 19.2388 7.0685C18.7362 5.67927 17.9997 4.417 17.0711 3.35373C16.1425 2.29047 15.0401 1.44704 13.8268 0.871607C12.6136 0.296172 11.3132 0 10 0ZM14.2 16.2595L9 12.5954V5.72518H10.5V11.6794L15 14.771L14.2 16.2595Z" fill="#4ECB71" />
                      </svg>
                      <div className={cx("text-header-trending")}>
                        Ballad
                      </div>
                      <div className={cx("text-header-trending")}>
                        Vocal Range
                      </div>
                    </div>
                    <div className={cx("chord-img-trending")}>
                      <div className={cx("text-trending")}>
                        <span className={cx("text-ellipse3")}>
                          Beat
                        </span>

                        <div className={cx("trending-text")}>
                          <img className={cx("trending-ellipse")} src={require("../../assets/images/Trending/beautiful-girl-sitting-down-playing-the-piano.webp")}>
                          </img>
                          <div className={cx("text-role")}>
                            <div className={cx("text-ellipse1")}>
                              Dont coi
                            </div>
                            <div className={cx("text-ellipse2")}>
                              Musician
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>

              <div className={cx("trending-footer")}>
                <div className={cx("icon-trending-4")}>
                  <div className={cx("icon-trending2")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                      <path d="M2 10H5C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H15C14.4696 19 13.9609 18.7893 13.5858 18.4142C13.2107 18.0391 13 17.5304 13 17V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H18C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10Z" fill="#4ECB71" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                      <path d="M15.1875 0C13.2516 0 11.5566 0.8325 10.5 2.23969C9.44344 0.8325 7.74844 0 5.8125 0C4.27146 0.00173694 2.79404 0.614681 1.70436 1.70436C0.614681 2.79404 0.00173694 4.27146 0 5.8125C0 12.375 9.73031 17.6869 10.1447 17.9062C10.2539 17.965 10.376 17.9958 10.5 17.9958C10.624 17.9958 10.7461 17.965 10.8553 17.9062C11.2697 17.6869 21 12.375 21 5.8125C20.9983 4.27146 20.3853 2.79404 19.2956 1.70436C18.206 0.614681 16.7285 0.00173694 15.1875 0ZM10.5 16.3875C8.78813 15.39 1.5 10.8459 1.5 5.8125C1.50149 4.66921 1.95632 3.57317 2.76475 2.76475C3.57317 1.95632 4.66921 1.50149 5.8125 1.5C7.63594 1.5 9.16687 2.47125 9.80625 4.03125C9.86275 4.16881 9.95888 4.28646 10.0824 4.36926C10.2059 4.45207 10.3513 4.49627 10.5 4.49627C10.6487 4.49627 10.7941 4.45207 10.9176 4.36926C11.0411 4.28646 11.1372 4.16881 11.1937 4.03125C11.8331 2.46844 13.3641 1.5 15.1875 1.5C16.3308 1.50149 17.4268 1.95632 18.2353 2.76475C19.0437 3.57317 19.4985 4.66921 19.5 5.8125C19.5 10.8384 12.21 15.3891 10.5 16.3875Z" fill="#4ECB71" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z" stroke="#4ECB71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z" fill="#4ECB71" />
                    </svg>
                  </div>
                  <div className={cx("icon-views-trending")}>
                    <div>100k</div>
                    <div>2k5</div>
                    <div>924k</div>
                    <div>50k</div>
                  </div>
                </div>
              </div>
            </div></Link>

            {/* Trending detail */}
            <Link style={{color:"black"}} to={"/viewdetailbeat/37"}><div className={cx("trending-details")}>
              <div className={cx("trending-top")}>
                <div className={cx("trending-top-left")}>
                  <div>
                    <img className={cx("trending-details-img")} src={require("../../assets/images/Trending/hinh-guitar-am-cung.jpg")}>
                    </img>
                    <div className={cx("trending-subcribe")}>
                      View Detail
                    </div>
                  </div>
                  <div className={cx("image-trending-ellipse")}>
                    <div className={cx("header-trending")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                        <path d="M10 0C8.68678 0 7.38642 0.296172 6.17317 0.871607C4.95991 1.44704 3.85752 2.29047 2.92893 3.35373C1.05357 5.50109 0 8.41353 0 11.4504C0 14.4872 1.05357 17.3996 2.92893 19.547C3.85752 20.6103 4.95991 21.4537 6.17317 22.0291C7.38642 22.6045 8.68678 22.9007 10 22.9007C12.6522 22.9007 15.1957 21.6943 17.0711 19.547C18.9464 17.3996 20 14.4872 20 11.4504C20 9.94668 19.7413 8.45772 19.2388 7.0685C18.7362 5.67927 17.9997 4.417 17.0711 3.35373C16.1425 2.29047 15.0401 1.44704 13.8268 0.871607C12.6136 0.296172 11.3132 0 10 0ZM14.2 16.2595L9 12.5954V5.72518H10.5V11.6794L15 14.771L14.2 16.2595Z" fill="#4ECB71" />
                      </svg>
                      <div className={cx("text-header-trending")}>
                        Rock
                      </div>
                      <div className={cx("text-header-trending")}>
                        Vocal Range
                      </div>
                    </div>
                    <div className={cx("chord-img-trending")}>
                      <div className={cx("text-trending")}>
                        <span className={cx("text-ellipse3")}>
                          Beat
                        </span>

                        <div className={cx("trending-text")}>
                          <img className={cx("trending-ellipse")} src={require("../../assets/images/Trending/ly-do-cac-chang-trai-nen-biet-choi-dan-guitar-1.jpeg")}>
                          </img>
                          <div className={cx("text-role")}>
                            <div className={cx("text-ellipse1")}>
                              Dont give up
                            </div>
                            <div className={cx("text-ellipse2")}>
                              Musician
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>


              </div>

              <div className={cx("trending-footer")}>
                <div className={cx("icon-trending-4")}>
                  <div className={cx("icon-trending2")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                      <path d="M2 10H5C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H15C14.4696 19 13.9609 18.7893 13.5858 18.4142C13.2107 18.0391 13 17.5304 13 17V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H18C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10Z" fill="#4ECB71" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                      <path d="M15.1875 0C13.2516 0 11.5566 0.8325 10.5 2.23969C9.44344 0.8325 7.74844 0 5.8125 0C4.27146 0.00173694 2.79404 0.614681 1.70436 1.70436C0.614681 2.79404 0.00173694 4.27146 0 5.8125C0 12.375 9.73031 17.6869 10.1447 17.9062C10.2539 17.965 10.376 17.9958 10.5 17.9958C10.624 17.9958 10.7461 17.965 10.8553 17.9062C11.2697 17.6869 21 12.375 21 5.8125C20.9983 4.27146 20.3853 2.79404 19.2956 1.70436C18.206 0.614681 16.7285 0.00173694 15.1875 0ZM10.5 16.3875C8.78813 15.39 1.5 10.8459 1.5 5.8125C1.50149 4.66921 1.95632 3.57317 2.76475 2.76475C3.57317 1.95632 4.66921 1.50149 5.8125 1.5C7.63594 1.5 9.16687 2.47125 9.80625 4.03125C9.86275 4.16881 9.95888 4.28646 10.0824 4.36926C10.2059 4.45207 10.3513 4.49627 10.5 4.49627C10.6487 4.49627 10.7941 4.45207 10.9176 4.36926C11.0411 4.28646 11.1372 4.16881 11.1937 4.03125C11.8331 2.46844 13.3641 1.5 15.1875 1.5C16.3308 1.50149 17.4268 1.95632 18.2353 2.76475C19.0437 3.57317 19.4985 4.66921 19.5 5.8125C19.5 10.8384 12.21 15.3891 10.5 16.3875Z" fill="#4ECB71" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z" stroke="#4ECB71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z" fill="#4ECB71" />
                    </svg>
                  </div>
                  <div className={cx("icon-views-trending")}>
                    <div>100k</div>
                    <div>2k5</div>
                    <div>924k</div>
                    <div>50k</div>
                  </div>
                </div>
              </div>
            </div></Link>




          </div>

        </div>
        {/* Body Chords */}
        <div className={cx("title")}>
          <div className={(cx("title-header"))}>
            <div className={cx("text")}>
              CHORDS
            </div>
            <div className={cx("line")}>
            </div>
          </div>

          <div className={cx("title-categories")}>
            <Link to={"/chordsdetails"}><div className={cx("categories-items")}>

              <img className={cx("img")} src={require("../../assets/images/Chords/Rectangle 23.png")} alt="Guitar">
              </img>

              <div className={cx("content-1")}>
                Guitar
              </div>
              <div className={cx("content-2")}>
                50 Episode
              </div>

            </div></Link>

            <Link to={"/chordsdetails"}><div className={cx("categories-items")}>
              <img className={cx("img")} src={require("../../assets/images/Chords/Rectangle 18.png")} alt="Piano">
              </img>
              <div className={cx("content-1")}>
                Piano
              </div>
              <div className={cx("content-2")}>
                50 Episode
              </div>
            </div></Link>

            <Link to={"/chordsdetails"}><div className={cx("categories-items")}>
              <img className={cx("img")} src={require("../../assets/images/Chords/Rectangle 19.png")} alt="Ukulele">
              </img>
              <div className={cx("content-1")}>
                Ukulele
              </div>
              <div className={cx("content-2")}>
                50 Episode
              </div>
            </div></Link>

          </div>
        </div>
        <div className={cx("title")} style={{marginBottom: 220}}>
          <div className={(cx("title-header"))}>
            <div className={cx("text")}>
              CHORDS OF SONGS
            </div>
            <div className={cx("line")}>
            </div>
          </div>
          {/* Chords of Songs detail */}
          <div className={cx("chords-part")}>
          <Link style={{color:"black"}} to={"/songs"}><div className={cx("chords-details")}>
              <img className={cx("chords-details-img")} src={require("../../assets/images/ChordsOfSongs/bao-lau-len-day-dan-piano-5.jpg")}>
              </img>
              <div className={cx("content-3")}>
                Piano Sound
              </div>

              <div className={cx("icon-chords")}>
                <img className={cx("trending-ellipse-songs")} src={require("../../assets/images/ChordsOfSongs/nganh-piano.webp")}>
                </img>
                <div className={cx("text-role-2")}>
                  <div style={{fontSize: '2.5rem'}} className={cx("text-ellipse1")}>
                    ABC
                  </div>
                  <div className={cx("text-ellipse2")}>
                    Musician
                  </div>
                </div>
                <div className={cx("heart-list-icon")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_655_36)">
                      <path d="M15 0C6.71572 0 0 6.71572 0 15C0 23.2843 6.71572 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71572 23.2843 0 15 0ZM18.3197 8.58757C20.1021 8.55972 21.714 9.52872 22.4781 11.1807C23.185 13.3646 22.5935 15.5863 21.3469 17.2607C20.5241 18.3961 19.5407 19.3752 18.5353 20.2308C17.6104 21.0918 15.5401 22.7956 14.9915 22.8429C14.5065 22.7502 13.9621 22.201 13.5771 21.9187C11.4138 20.2742 9.08545 18.2752 7.90465 16.0885C6.91463 13.9893 6.91283 11.3919 8.45365 9.7825C10.4516 7.9813 13.4634 8.33385 14.9915 10.2156C15.4018 9.68325 15.9066 9.26398 16.5055 8.95895C17.1125 8.7167 17.7256 8.59688 18.3197 8.58757Z" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="clip0_655_36">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M21.25 23.875L24.375 25.75L23.5 22.25L26.25 19.875L22.625 19.625L21.25 16.25L19.875 19.5L16.25 19.875L19 22.25L18.125 25.75L21.25 23.875ZM3.75 17.5H13.75V20H3.75V17.5ZM3.75 7.5H18.75V10H3.75V7.5ZM3.75 12.5H18.75V15H3.75V12.5Z" fill="black" />
                  </svg>
                </div>

              </div>
              <div className={cx("content-4")}>
                The guitar sound is characterized by its versatile and melodic tones
              </div>
              <div className={cx("icon-chords2")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path d="M2 10H5C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H15C14.4696 19 13.9609 18.7893 13.5858 18.4142C13.2107 18.0391 13 17.5304 13 17V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H18C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10Z" fill="#4ECB71" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                  <path d="M15.1875 0C13.2516 0 11.5566 0.8325 10.5 2.23969C9.44344 0.8325 7.74844 0 5.8125 0C4.27146 0.00173694 2.79404 0.614681 1.70436 1.70436C0.614681 2.79404 0.00173694 4.27146 0 5.8125C0 12.375 9.73031 17.6869 10.1447 17.9062C10.2539 17.965 10.376 17.9958 10.5 17.9958C10.624 17.9958 10.7461 17.965 10.8553 17.9062C11.2697 17.6869 21 12.375 21 5.8125C20.9983 4.27146 20.3853 2.79404 19.2956 1.70436C18.206 0.614681 16.7285 0.00173694 15.1875 0ZM10.5 16.3875C8.78813 15.39 1.5 10.8459 1.5 5.8125C1.50149 4.66921 1.95632 3.57317 2.76475 2.76475C3.57317 1.95632 4.66921 1.50149 5.8125 1.5C7.63594 1.5 9.16687 2.47125 9.80625 4.03125C9.86275 4.16881 9.95888 4.28646 10.0824 4.36926C10.2059 4.45207 10.3513 4.49627 10.5 4.49627C10.6487 4.49627 10.7941 4.45207 10.9176 4.36926C11.0411 4.28646 11.1372 4.16881 11.1937 4.03125C11.8331 2.46844 13.3641 1.5 15.1875 1.5C16.3308 1.50149 17.4268 1.95632 18.2353 2.76475C19.0437 3.57317 19.4985 4.66921 19.5 5.8125C19.5 10.8384 12.21 15.3891 10.5 16.3875Z" fill="#4ECB71" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z" stroke="#4ECB71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={cx("icon-views")}>
                <div>100k</div>
                <div>2k5</div>
                <div>924k</div>

              </div>
            </div></Link>

            <Link style={{color:"black"}} to={"/songs"}><div className={cx("chords-details")}>
              <img className={cx("chords-details-img")} src={require("../../assets/images/ChordsOfSongs/gia-dan-ukulele-size-24.jpg")}>
              </img>
              <div className={cx("content-3")}>
                Drum Sound
              </div>
              <div className={cx("icon-chords")}>
                <img className={cx("trending-ellipse-songs")} src={require("../../assets/images//ChordsOfSongs/top-8-thuong-hieu-ukulele-tot-nhat-nam-2019-cho-nguoi-moi-bat-dau.jpg")}>
                </img>
                <div className={cx("text-role-2")}>
                  <div style={{fontSize: '2.5rem'}} className={cx("text-ellipse1")}>
                    ABC
                  </div>
                  <div className={cx("text-ellipse2")}>
                    Musician
                  </div>
                </div>
                <div className={cx("heart-list-icon")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_655_36)">
                      <path d="M15 0C6.71572 0 0 6.71572 0 15C0 23.2843 6.71572 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71572 23.2843 0 15 0ZM18.3197 8.58757C20.1021 8.55972 21.714 9.52872 22.4781 11.1807C23.185 13.3646 22.5935 15.5863 21.3469 17.2607C20.5241 18.3961 19.5407 19.3752 18.5353 20.2308C17.6104 21.0918 15.5401 22.7956 14.9915 22.8429C14.5065 22.7502 13.9621 22.201 13.5771 21.9187C11.4138 20.2742 9.08545 18.2752 7.90465 16.0885C6.91463 13.9893 6.91283 11.3919 8.45365 9.7825C10.4516 7.9813 13.4634 8.33385 14.9915 10.2156C15.4018 9.68325 15.9066 9.26398 16.5055 8.95895C17.1125 8.7167 17.7256 8.59688 18.3197 8.58757Z" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="clip0_655_36">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M21.25 23.875L24.375 25.75L23.5 22.25L26.25 19.875L22.625 19.625L21.25 16.25L19.875 19.5L16.25 19.875L19 22.25L18.125 25.75L21.25 23.875ZM3.75 17.5H13.75V20H3.75V17.5ZM3.75 7.5H18.75V10H3.75V7.5ZM3.75 12.5H18.75V15H3.75V12.5Z" fill="black" />
                  </svg>
                </div>

              </div>
              <div className={cx("content-4")}>
                The drum sound is a rhythmic and percussive resonance
              </div>
              <div className={cx("icon-chords2")}>

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path d="M2 10H5C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H15C14.4696 19 13.9609 18.7893 13.5858 18.4142C13.2107 18.0391 13 17.5304 13 17V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H18C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10Z" fill="#4ECB71" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                  <path d="M15.1875 0C13.2516 0 11.5566 0.8325 10.5 2.23969C9.44344 0.8325 7.74844 0 5.8125 0C4.27146 0.00173694 2.79404 0.614681 1.70436 1.70436C0.614681 2.79404 0.00173694 4.27146 0 5.8125C0 12.375 9.73031 17.6869 10.1447 17.9062C10.2539 17.965 10.376 17.9958 10.5 17.9958C10.624 17.9958 10.7461 17.965 10.8553 17.9062C11.2697 17.6869 21 12.375 21 5.8125C20.9983 4.27146 20.3853 2.79404 19.2956 1.70436C18.206 0.614681 16.7285 0.00173694 15.1875 0ZM10.5 16.3875C8.78813 15.39 1.5 10.8459 1.5 5.8125C1.50149 4.66921 1.95632 3.57317 2.76475 2.76475C3.57317 1.95632 4.66921 1.50149 5.8125 1.5C7.63594 1.5 9.16687 2.47125 9.80625 4.03125C9.86275 4.16881 9.95888 4.28646 10.0824 4.36926C10.2059 4.45207 10.3513 4.49627 10.5 4.49627C10.6487 4.49627 10.7941 4.45207 10.9176 4.36926C11.0411 4.28646 11.1372 4.16881 11.1937 4.03125C11.8331 2.46844 13.3641 1.5 15.1875 1.5C16.3308 1.50149 17.4268 1.95632 18.2353 2.76475C19.0437 3.57317 19.4985 4.66921 19.5 5.8125C19.5 10.8384 12.21 15.3891 10.5 16.3875Z" fill="#4ECB71" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z" stroke="#4ECB71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={cx("icon-views")}>
                <div>100k</div>
                <div>2k5</div>
                <div>924k</div>
              </div>
            </div></Link>

            <Link style={{color:"black"}} to={"/songs"}><div className={cx("chords-details")}>
              <img className={cx("chords-details-img")} src={require("../../assets/images/ChordsOfSongs/Rectangle 36.png")}>
              </img>
              <div className={cx("content-3")}>
                Guitar Sound
              </div>
              <div className={cx("icon-chords")}>
                <img className={cx("trending-ellipse-songs")} src={require("../../assets/images/ChordsOfSongs/hq720.jpg")}>
                </img>
                <div className={cx("text-role-2")}>
                  <div style={{fontSize: '2.5rem'}} className={cx("text-ellipse1")}>
                    ABC
                  </div>
                  <div className={cx("text-ellipse2")}>
                    Musician
                  </div>
                </div>
                <div className={cx("heart-list-icon")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <g clip-path="url(#clip0_655_36)">
                      <path d="M15 0C6.71572 0 0 6.71572 0 15C0 23.2843 6.71572 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71572 23.2843 0 15 0ZM18.3197 8.58757C20.1021 8.55972 21.714 9.52872 22.4781 11.1807C23.185 13.3646 22.5935 15.5863 21.3469 17.2607C20.5241 18.3961 19.5407 19.3752 18.5353 20.2308C17.6104 21.0918 15.5401 22.7956 14.9915 22.8429C14.5065 22.7502 13.9621 22.201 13.5771 21.9187C11.4138 20.2742 9.08545 18.2752 7.90465 16.0885C6.91463 13.9893 6.91283 11.3919 8.45365 9.7825C10.4516 7.9813 13.4634 8.33385 14.9915 10.2156C15.4018 9.68325 15.9066 9.26398 16.5055 8.95895C17.1125 8.7167 17.7256 8.59688 18.3197 8.58757Z" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="clip0_655_36">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M21.25 23.875L24.375 25.75L23.5 22.25L26.25 19.875L22.625 19.625L21.25 16.25L19.875 19.5L16.25 19.875L19 22.25L18.125 25.75L21.25 23.875ZM3.75 17.5H13.75V20H3.75V17.5ZM3.75 7.5H18.75V10H3.75V7.5ZM3.75 12.5H18.75V15H3.75V12.5Z" fill="black" />
                  </svg>
                </div>

              </div>
              <div className={cx("content-4")}>
                The guitar sound is characterized by its versatile and melodic tones
              </div>
              <div className={cx("icon-chords2")}>

                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path d="M2 10H5C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H15C14.4696 19 13.9609 18.7893 13.5858 18.4142C13.2107 18.0391 13 17.5304 13 17V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H18C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10Z" fill="#4ECB71" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                  <path d="M15.1875 0C13.2516 0 11.5566 0.8325 10.5 2.23969C9.44344 0.8325 7.74844 0 5.8125 0C4.27146 0.00173694 2.79404 0.614681 1.70436 1.70436C0.614681 2.79404 0.00173694 4.27146 0 5.8125C0 12.375 9.73031 17.6869 10.1447 17.9062C10.2539 17.965 10.376 17.9958 10.5 17.9958C10.624 17.9958 10.7461 17.965 10.8553 17.9062C11.2697 17.6869 21 12.375 21 5.8125C20.9983 4.27146 20.3853 2.79404 19.2956 1.70436C18.206 0.614681 16.7285 0.00173694 15.1875 0ZM10.5 16.3875C8.78813 15.39 1.5 10.8459 1.5 5.8125C1.50149 4.66921 1.95632 3.57317 2.76475 2.76475C3.57317 1.95632 4.66921 1.50149 5.8125 1.5C7.63594 1.5 9.16687 2.47125 9.80625 4.03125C9.86275 4.16881 9.95888 4.28646 10.0824 4.36926C10.2059 4.45207 10.3513 4.49627 10.5 4.49627C10.6487 4.49627 10.7941 4.45207 10.9176 4.36926C11.0411 4.28646 11.1372 4.16881 11.1937 4.03125C11.8331 2.46844 13.3641 1.5 15.1875 1.5C16.3308 1.50149 17.4268 1.95632 18.2353 2.76475C19.0437 3.57317 19.4985 4.66921 19.5 5.8125C19.5 10.8384 12.21 15.3891 10.5 16.3875Z" fill="#4ECB71" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 19C11.78 19 13.5201 18.4722 15.0001 17.4832C16.4802 16.4943 17.6337 15.0887 18.3149 13.4442C18.9961 11.7996 19.1743 9.99002 18.8271 8.24419C18.4798 6.49836 17.6226 4.89472 16.364 3.63604C15.1053 2.37737 13.5016 1.5202 11.7558 1.17294C10.01 0.82567 8.20038 1.0039 6.55585 1.68509C4.91131 2.36628 3.50571 3.51983 2.51677 4.99987C1.52784 6.47991 1 8.21997 1 10C1 11.488 1.36 12.891 2 14.127L1 19L5.873 18C7.109 18.64 8.513 19 10 19Z" stroke="#4ECB71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className={cx("icon-views")}>
                <div>100k</div>
                <div>2k5</div>
                <div>924k</div>
              </div>

            </div></Link>

          </div>
        </div>
      </div>
      {/* Footer */}
      <div className={cx("footer")}>
        <div className={(cx("footer-left"))}>

        </div>
        <div className={(cx("footer-center"))}>

        </div>
        <div className={(cx("footer-right"))}>

        </div>
      </div>
    </div>
  )
}

export default Home;