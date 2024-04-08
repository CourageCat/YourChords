import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./ViewCart.module.scss";
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from "@mui/material";
import { useReducer, useRef } from "react";
import CardItem from "../../components/CardItem";
import { ShopContext } from "../../context/shop-context";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import axios from "axios";

const cx = classNames.bind(styles);
function ViewCart() {
    const { cart } = useContext(ShopContext)
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const [listBeatCart, setListBeatCart] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const navigate = useNavigate()
    const token = useToken()
    const handleCheckout = async () => {
        setOpen(true)
        if (cart.length === 0) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You have not chosen anything to buy")
            setOpen(false)
            return
        }
        if (token) {
            await axiosInstance.post(`http://localhost:8080/api/v1/paypal`, { totalprice: totalAmount , description: "Payment Success" })
                .then((res) => {
                    setOpen(false)
                    window.location.href = res.data
                })
                .catch((error) => {
                    setOpen(false)
                    if (error.message.includes("Network")) {
                        navigate("/login")
                    } else if (error.message.includes("501")) {
                        console.log("Beat Bought")
                        navigate("/viewcart")
                    }
                })
        }
        else {
            navigate("/login")
        }
    }
    useEffect(() => {
        console.log(cart)
        const loadListBeatCart = async() => {
            await axiosInstance.post("http://localhost:8080/api/v1/beat/cart/view", {beat: cart})
            .then((res) => {
                setListBeatCart(res.data.beatList)
                console.log(res.data.beatList)
                setTotalAmount(res.data.totalAmount)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        loadListBeatCart()
    },[cart])
    
    return (

        <section className={cx("card-wrapper")}>
            {/* Shop cart */}
            <section className={cx("shop-card")}>
                {/* Header */}
                <header className={cx("card-header")}>
                    <h2 className={cx("cart-heading")}>Shopping Cart</h2>
                </header>
                {/* Content */}
                <div className={cx("card-names")}>
                    <div className={cx("card-product", "card-title")}>PRODUCT</div>
                    <div className={cx("card-genre", "card-title")}>GENRE</div>
                    <div className={cx("card-author", "card-title")}>AUTHOR</div>
                    <div className={cx("card-price", "card-title")}>PRICE</div>
                </div>
                {listBeatCart.length !== 0 ?
                    <div className={cx("list-card")}>
                        {listBeatCart.map((item, index) => {
                                    return (
                                        <CardItem
                                            id={item.id}
                                            name={item.beatName}
                                            author={item.user.fullName}
                                            genre={item.genres}
                                            price={item.price}
                                            beatId={item.id}
                                            setOpenSuccessSnackBar={setOpenSuccessSnackBar}
                                            setMessageSuccess={setMessageSuccess}
                                        />
                                    );
                                
                        })}
                    </div> : <div></div>}

                {/* Footer */}
                <footer className={cx("card-footer")}>
                    <Link to="/listbeat" className={cx("card-return", "card-action")}>RETURN TO SHOP</Link>
                    {/* <div className={cx("card-update", "card-action")}>UPDATE CART</div> */}
                </footer>
            </section>

            {/* Card total */}
            <section className={cx("card-total")}>
                {/* Header */}
                <header className={cx("card-header")}>
                    <h2 className={cx("card-heading")}>Card Totals</h2>
                </header>
                {/* Content */}
                <div className={cx("card-content")}>
                    {/* Item */}
                    <div className={cx("item")}>
                        <span className={cx("card-title")}>Sub-total</span>
                        ${totalAmount}
                    </div>
                    {/* Item */}
                    {/* <div className={cx("item")}>
            <span className={cx("card-title")}>Shipping</span>
            <span className={cx("card-name")}>Free</span>
          </div> */}
                    {/* Item */}
                    {/* <div className={cx("item")}>
            <span className={cx("card-title")}>Discount</span>
            <span className={cx("card-name")}>${discount.current}</span>
          </div> */}
                    {/* Item */}
                    {/* <div className={cx("item")}>
            <span className={cx("card-title")}>Tax</span>
            <span className={cx("card-name")}>${tax.current}</span>
          </div> */}
                </div>
                {/* Footer */}
                <footer className={cx("card-footer")}>
                    <div className={cx("card-title")}>
                        <span className={cx("card-name")}>Total</span>
                        <span className={cx("card-name")}>
                            ${totalAmount}
                        </span>
                    </div>

                    <Button className={cx("card-action")} onClick={() => handleCheckout()}>Proceed to Checkout</Button>
                </footer>
                <div className={cx("card-payment")}>
                    Payment Method
                </div>
                <div className={cx("card-banking")}>
                    <img className={cx("img")} src={require("../../assets/images/Other/1554401.png")}>
                    </img>
                </div>
                <div className={cx("card-banking")}>
                    <img className={cx("img")} src={require("../../assets/images/Other/1200px-PayPal_logo.svg.png")}>
                    </img>
                </div>
                <div className={cx("card-last-info")}>
                    Your Check out is Safe and Secure With PayPal
                </div>
            </section>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openSuccessSnackBar} autoHideDuration={500} onClose={() => setOpenSuccessSnackBar(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }} >
                <Alert variant="filled" onClose={() => setOpenSuccessSnackBar(false)} severity="success" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                    {messageSuccess}
                </Alert>
            </Snackbar>
            <Snackbar open={openFailedSnackBar} autoHideDuration={2000} onClose={() => setOpenFailedSnackBar(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }} style={{ marginTop: '100px' }}>
                <Alert variant="filled" onClose={() => setOpenFailedSnackBar(false)} severity="error" sx={{ width: '100%' }} style={{ fontSize: 20 }}>
                    {messageFailed}
                </Alert>
            </Snackbar>
        </section>
    );
}

export default ViewCart;
