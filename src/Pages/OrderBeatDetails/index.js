
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./OrderBeatDetails.module.scss";
import { useEffect, useState } from "react";
import { Alert, Backdrop, Box, Button, Checkbox, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import videoBg from '../../assets/video/video (2160p).mp4'
import ValidationUpload from "../../Validation/ValidationUpload";
import useToken from "../../authorization/useToken";
import jwtDecode from "jwt-decode";
import Popup from "reactjs-popup";
import axiosInstance from "../../authorization/axiosInstance";
import NotFound from "../NotFound";
import OrderProcess from "@/components/OrderProcess";
import OrderPayment from "@/components/OrderPayment";
import OrderMakeAbeat from "@/components/OrderMakeABeat";
import OrderApproved from "@/components/OrderApproved";
import OrderCompleted from "@/components/OrderCompleted";
import OrderCanceled from "@/components/OrderCanceled";
import { CheckBox } from "@mui/icons-material";
import { StepStatus } from "@chakra-ui/react";
const cx = classNames.bind(styles);
function CreateOrderBeat() {
    const { id } = useParams()
    const navigate = useNavigate()
    // const [orderID, setOrderID] = useState("");
    // const [username, setUserName] = useState("");
    const token = useToken();
    let userId = ""
    let role = ""

    let messagePolicy = "*Customer\n- Customer can update the order if only the order is on processing\n- Customer must prepay 30% of the price of the order before approving the musician to create the beat\n- If customer rejects the beat, customer will lose 30% the money that customer have paid before\n\n*Musician\n- Musician can reject the order if only the order is on processing"

    if (token) {
        userId = jwtDecode(token).sub
        role = jwtDecode(token).role
    }
    const [orderBeatDetails, setOrderBeatDetails] = useState({})
    const [beatName, setBeatName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [beatSoundDemo, setBeatSoundDemo] = useState()
    const [beatSoundFull, setBeatSoundFull] = useState()
    const [beatSoundDemoUrl, setBeatSoundDemoUrl] = useState("")
    const [beatSoundFullUrl, setBeatSoundFullUrl] = useState("")
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openPolicyModal, setOpenPolicyModal] = useState(false)
    const [openCheckPaymentDemo, setOpenCheckPaymentDemo] = useState(false)
    const [openCheckPaymentFull, setOpenCheckPaymentFull] = useState(false)
    const [checkPolicy, setCheckPolicy] = useState(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const loadOrderDetail = async () => {
            await axiosInstance.get(`http://localhost:8080/api/v1/request/beat/detail/${id}`)
                .then((res) => {
                    setOrderBeatDetails(res.data)
                    if (res.data.description) {
                        setDescription(res.data.description)
                    }
                    if (res.data.beatName) {
                        setBeatName(res.data.beatName)
                    }
                    if (res.data.beatFull) {
                        setBeatSoundFull(res.data.beatFull)
                    }
                    if (res.data.beatDemo) {
                        setBeatSoundDemo(res.data.beatDemo)
                    }
                    if (res.data.price) {
                        setPrice(res.data.price)
                    }
                })
        }
        loadOrderDetail()
    }, [id])

    const handleUpdate = async () => {
        if (!beatName || !description) {
            setOpenFailedSnackBar(true)
            setMessageFailed("All fields must not be null!")
            return
        }
        if (!checkPolicy) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You must agree with our policy before using this function!")
            return
        }
        await axiosInstance.put("http://localhost:8080/api/v1/request/beat", { id: id, beatName: beatName, description: description })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Update successfully")
                setTimeout(() => {
                    navigate("/ordertimeline")
                }, 500)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Update failed!")
                console.log(error)
            })
    }

    const acceptAnOrder = async () => {
        if (!checkPolicy) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You must agree with our policy before using this function!")
            return
        }
        else if (price <= 0) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Price must be higher than 0!")
            return
        }
        await axiosInstance.put("http://localhost:8080/api/v1/request/beat/request", { id: id, price: price })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Approve successfully")
                setTimeout(() => {
                    navigate("/ordertimeline")
                }, 500)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Approve failed!")
                console.log(error)
            })
    }

    const handleBeatSoundDemoChange = (e) => {
        const MIN_FILE_SIZE = 102400
        const MAX_FILE_SIZE = 1048576
        const selectedFile = e.target.files[0];
        const allowedTypes = ["audio/mpeg"];
        if (selectedFile?.size < MIN_FILE_SIZE || selectedFile?.size > MAX_FILE_SIZE) {
            console.log(selectedFile?.size < MIN_FILE_SIZE)
            setOpenFailedSnackBar(true)
            console.log(selectedFile?.size)
            setMessageFailed("File beatDemo size is in 100KB to 1MB!")
            return;
        }
        if (!allowedTypes.includes(selectedFile?.type)) {
            setOpenFailedSnackBar(true)
            setMessageFailed("Only audio/mpeg files are allowed!")
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

    const sendBeatToCus = async () => {
        setOpen(true)
        const formData = new FormData();
        if (!checkPolicy) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You must agree with our policy before using this function!")
            setOpen(false)
            return
        }
        else if(!beatSoundDemo || !beatSoundFull){
            setOpenFailedSnackBar(true)
            setMessageFailed("All beatSound fields must not be null!")
            setOpen(false)
            return
        }
        formData.append('json', new Blob([JSON.stringify({ id: id, msId: userId })], { type: 'application/json' }));
        formData.append('file1', beatSoundFull);
        formData.append('file2', beatSoundDemo)
        await axiosInstance.patch("http://localhost:8080/api/v1/request/beat", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Send beat successfully")
                setOpen(false)
                setTimeout(() => {
                    navigate("/ordertimeline")
                }, 500)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Send beat failed!")
                setOpen(false)
                console.log(error)
            })
    }

    const rejectAnOrder = async () => {
        await axiosInstance.put("http://localhost:8080/api/v1/request/beat/reject/request", { id: id })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Reject order successfully")
                setTimeout(() => {
                    navigate("/ordertimeline")
                }, 500)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Reject order failed!")
                console.log(error)
            })
    }

    const rejectTheBeat = async () => {
        await axiosInstance.put("http://localhost:8080/api/v1/request/beat/reject/beat", { id: id })
            .then((res) => {
                setOpenSuccessSnackBar(true)
                setMessageSuccess("Reject beat successfully")
                setTimeout(() => {
                    navigate("/ordertimeline")
                }, 500)
            })
            .catch((error) => {
                setOpenFailedSnackBar(true)
                setMessageFailed("Reject beat failed!")
                console.log(error)
            })
    }

    const paymentDemo = async () => {
        setOpenCheckPaymentDemo(false)
        setOpen(true)
        if (!checkPolicy) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You must agree with our policy before using this function!")
            setOpen(false)
            return
        }
        await axiosInstance.post(`http://localhost:8080/api/v1/paypal/order`, { totalprice: (price * 30 / 100), description: "Payment Success" })
            .then((res) => {
                setOpen(false)
                window.location.href = res.data
            })
            .catch((error) => {
                setOpen(false)
                if (error.message.includes("Network")) {
                    navigate("/login")
                }
            })
    }

    const paymentFull = async () => {
        setOpenCheckPaymentFull(false)
        setOpen(true)
        if (!checkPolicy) {
            setOpenFailedSnackBar(true)
            setMessageFailed("You must agree with our policy before using this function!")
            setOpen(false)
            return
        }
        await axiosInstance.post(`http://localhost:8080/api/v1/paypal/order`, { totalprice: (price * 70 / 100), description: "Payment Success" })
            .then((res) => {
                setOpen(false)
                window.location.href = res.data
            })
            .catch((error) => {
                setOpen(false)
                if (error.message.includes("Network")) {
                    navigate("/login")
                }
            })
    }

    if (token && (jwtDecode(token).role === "CUS" || jwtDecode(token).role === "MS")) {
        return (
            <div className={cx("login-wrapper")}>
                {orderBeatDetails ?
                    <div>
                        {orderBeatDetails.status === 0 ?
                            <OrderProcess id={id} status={orderBeatDetails.status} role={role} description={description} beatName={beatName} setBeatName={setBeatName} setOpenModal={setOpenModal} price={price} setPrice={setPrice} handleUpdate={handleUpdate} acceptAnOrder={acceptAnOrder} rejectAnOrder={rejectAnOrder} checkPolicy={checkPolicy} setCheckPolicy={setCheckPolicy} setOpenPolicyModal={setOpenPolicyModal} />
                            : orderBeatDetails.status === 1 ?
                                <OrderPayment id={id} status={orderBeatDetails.status} role={role} beatName={beatName} setOpenModal={setOpenModal} price={price} setOpenCheckPaymentDemo={setOpenCheckPaymentDemo} rejectAnOrder={rejectAnOrder} checkPolicy={checkPolicy} setCheckPolicy={setCheckPolicy} setOpenPolicyModal={setOpenPolicyModal} />
                                : orderBeatDetails.status === 2 ?
                                    <OrderMakeAbeat id={id} status={orderBeatDetails.status} role={role} beatName={beatName} setOpenModal={setOpenModal} price={price} beatSoundDemoUrl={beatSoundDemoUrl} beatSoundFullUrl={beatSoundFullUrl} handleBeatSoundFullChange={handleBeatSoundFullChange} handleBeatSoundDemoChange={handleBeatSoundDemoChange} sendBeatToCus={sendBeatToCus} checkPolicy={checkPolicy} setCheckPolicy={setCheckPolicy} setOpenPolicyModal={setOpenPolicyModal} />
                                    : orderBeatDetails.status === 3 ?
                                        <OrderApproved id={id} status={orderBeatDetails.status} role={role} beatName={beatName} setOpenModal={setOpenModal} price={price} beatSoundDemo={beatSoundDemo} setOpenCheckPaymentFull={setOpenCheckPaymentFull} rejectTheBeat={rejectTheBeat} checkPolicy={checkPolicy} setCheckPolicy={setCheckPolicy} setOpenPolicyModal={setOpenPolicyModal} />
                                        : orderBeatDetails.status === -1 ?
                                            <OrderCompleted id={id} status={orderBeatDetails.status} role={role} beatName={beatName} setOpenModal={setOpenModal} price={price} beatSoundFull={beatSoundFull} />
                                            : (orderBeatDetails.status === -2 || orderBeatDetails.status === -3) ?
                                                <OrderCanceled id={id} status={orderBeatDetails.status} role={role} beatName={beatName} setOpenModal={setOpenModal} price={price} />
                                                : <div></div>
                        }
                    </div>
















                    : <div></div>}
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
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "3rem", marginLeft: 120, color: 'red' }}>Description</td>
                        </div>
                        {(role === "CUS" && orderBeatDetails.status === 0) ?
                            <div>
                                <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 150, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12 }} value={description} onChange={(e) => setDescription(e.target.value)} />
                                <td className={cx("button-type")}>
                                    <button type="button" className={cx("button-send")} aria-disabled="false" onClick={() => [setOpenModal(false), setOpenSuccessSnackBar(true), setMessageSuccess("Update description successfully")]}>Update</button>
                                </td>
                            </div>
                            :
                            <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 150, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12 }} value={description} onChange={(e) => setDescription(e.target.value)} readOnly />}


                    </div>
                </Modal>
                <Modal
                    open={openCheckPaymentDemo}
                    onClose={() => setOpenCheckPaymentDemo(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 500 }}>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "3rem", marginLeft: 120, color: 'red' }}>Description</td>
                        </div>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "2rem", color: 'black' }}>You need to pay 30% for the price of the order to approve the order</td>
                        </div>
                        <div style={{color:"white"}}>123</div>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "2rem", color: 'black' }}>Do you want to continue for paying?</td>
                        </div>
                        <div style={{ marginTop: 50 }}>
                            <Button onClick={() => paymentDemo()} style={{ backgroundColor: "green", width: 100, height: 50, marginRight:50, marginLeft:100 }} variant="contained">Continue paying</Button>
                            <Button onClick={() => setOpenCheckPaymentDemo(false)} style={{ backgroundColor: "red", width: 100, height: 50 }} variant="contained">Reject paying</Button>
                        </div>


                    </div>
                </Modal>
                <Modal
                    open={openCheckPaymentFull}
                    onClose={() => setOpenCheckPaymentFull(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 500 }}>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "3rem", marginLeft: 120, color: 'red' }}>Description</td>
                        </div>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "2rem", color: 'black' }}>You need to pay 70% for the remaining of the price of the order to complete the order and get your beat</td>
                        </div>
                        <div style={{color:"white"}}>123</div>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "2rem", color: 'black' }}>Do you want to continue for paying?</td>
                        </div>
                        <div style={{ marginTop: 50 }}>
                            <Button onClick={() => paymentFull()} style={{ backgroundColor: "green", width: 100, height: 50, marginRight:50, marginLeft:100 }} variant="contained">Continue paying</Button>
                            <Button onClick={() => setOpenCheckPaymentFull(false)} style={{ backgroundColor: "red", width: 100, height: 50 }} variant="contained">Reject paying</Button>
                        </div>


                    </div>
                </Modal>
                <Modal
                    open={openPolicyModal}
                    onClose={() => setOpenPolicyModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={cx("text-all")} style={{ padding: 10, marginTop: 300, marginLeft: 750, background: "white", width: 450 }}>
                        <div style={{ display: 'grid' }}>
                            <td style={{ fontWeight: 'bold', fontSize: "3rem", marginLeft: 120, color: 'red' }}>Description</td>
                        </div>
                        <textarea className={cx("text-des")} style={{ resize: 'none', width: '385px', border: 1, height: 500, marginLeft: 24, marginTop: 20, marginBottom: 20, padding: 20, outline: '1px solid #E5E4E4', borderRadius: 12, fontSize: 20 }} value={messagePolicy} onChange={(e) => setDescription(e.target.value)} readOnly />
                    </div>
                </Modal>
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
        return (
            <NotFound />
        )
    }
}

export default CreateOrderBeat;
