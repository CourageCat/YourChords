import classNames from "classnames/bind";
import styles from "./Chords.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faThumbsUp } from "@fortawesome/free-regular-svg-icons";


const cx = classNames.bind(styles);

function  Chords({ name, type, price, member, play, setPlay }) {
    return (<div className={cx("list-box")}>
        <div className={cx("card-item")}>
            <img className={cx("box-img")} src={require("../../assets/images/ChordsDetails/Screenshot 2023-10-12 071615.png")} alt="anh" />
            
        </div>
    </div>
    );
}
export default Chords;