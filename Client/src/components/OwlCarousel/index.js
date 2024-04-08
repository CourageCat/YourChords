import React from 'react'
import OwlCarouselComponent from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./OwlCarousel.scss"
function OwlCarousel() {
  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };
  return (
    <OwlCarouselComponent style={{zIndex:'0'}}
      id="customer-testimonoals"
      className="owl-carousel owl-theme"
      {...options}
    >
      {/* .module.scss */}
      <div className="item" >
        <img className="img" src={require("../../assets/images/Slide/unsplash_cOMpgWOxNuk.png")} alt='' />
      </div>
      <div className="item">
        <img className="img" src={require("../../assets/images/Slide/360_F_296943919_ydzSknEpuX42GIqns2VqYLzwHLlu00np.jpg")} alt='' />
      </div>
      <div className="item">
        <img className="img" src={require("../../assets/images/Slide/lottie.jpg")} alt='' />
      </div>
      <div className="item"> 
        <img className="img" src={require("../../assets/images/Slide/istockphoto-1293058709-612x612.jpg")} alt='' />
      </div>
      <div className="item">
        <img className="img" src={require("../../assets/images/Slide/Ichika-Nito-Landscape.png")} alt='' />
      </div>

      {/* .scss */}
      {/* <div className={cx("item")} >
        <img src={require("../../assets/images/profile/hinh-guitar-am-cung.jpg")} alt='' />
      </div>
      <div className={cx("item")}>
        <img src={require("../../assets/images/profile/hinh-guitar-am-cung.jpg")} alt='' />
      </div>
      <div className={cx("item")}>
        <img src={require("../../assets/images/profile/hinh-guitar-am-cung.jpg")} alt='' />
      </div>
      <div className={cx("item")}>
        <img src={require("../../assets/images/profile/hinh-guitar-am-cung.jpg")} alt='' />
      </div>
      <div className={cx("item")}>
        <img src={require("../../assets/images/profile/hinh-guitar-am-cung.jpg")} alt='' />
      </div> */}

    </OwlCarouselComponent>
  )
}

export default OwlCarousel