import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
import { ShopContext } from "../../context/shop-context";
import { useContext } from "react";
const cx = classNames.bind(styles);

function CartItem({
  id,
  name,
  author,
  genre,
  price,
  setOpenSuccessSnackBar,
  setMessageSuccess,
}) {
  const { removeFromCart } = useContext(ShopContext)
  return (
    <div className={cx("card-wrapper")}>
      {/* Card product */}
      <div className={cx("card-product")}>
        <svg
          onClick={() => [removeFromCart(id), setOpenSuccessSnackBar(true), setMessageSuccess("Remove successfully")]}
          className={cx("remove")}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="#929FA5"
          // stroke-width="1.5"
          // stroke-miterlimit="10"
          />
          <path
            d="M15 9L9 15"
            stroke="#929FA5"
          // stroke-width="1.5"
          // stroke-linecap="round"
          // stroke-linejoin="round"
          />
          <path
            d="M15 15L9 9"
            stroke="#929FA5"
          // stroke-width="1.5"
          // stroke-linecap="round"
          // stroke-linejoin="round"
          />
        </svg>
        <img src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} className={cx("card-img")} alt="anh dep" />
        <h2 className={cx("card-name")}>{name}</h2>

      </div>
      <div className={cx("card-genre")}>
        {
          genre.map((item) => {
            return <div> {item.name}</div>
          })

        }
      </div>

      <div className={cx("card-author")}>{author}</div>
      <div className={cx("card-price")}>${price}</div>
    </div>
     
  );
}

export default CartItem;
