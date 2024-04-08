import classNames from "classnames/bind";
import styles from "./ChordsDetails.module.scss";
import { Alert, Box, Button, FormControl, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Chords from "../../components/Chords";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPause, faPlay, faPlayCircle, faRedo, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import GUITAR from "../../assets/ImageForChords/Guitar";
import PIANO from "../../assets/ImageForChords/Piano";
import UKULELE from "../../assets/ImageForChords/Ukulele";
import Popup from "reactjs-popup";
import axios from "axios";
import axiosInstance from "../../authorization/axiosInstance";
import useToken from "@/authorization/useToken";
import jwtDecode from "jwt-decode";
import Pagination from "@/components/Pagination";
import ListSplitter from "@/components/ListSplitter";

const cx = classNames.bind(styles);

const KEY = ["All", "C", "D", "E", "F", "G", "A", "B", "A#", "C#", "D#", "F#", "G#"];
const SUFFIX = ["All", "major", "minor", "7", "m7", "maj7"];
const INSTRUMENT = ["Ukulele", "Guitar", "Piano"];


// const DATA = [
//     {
//         type: "Guitar",
//         value: GUITAR,
//     },
//     {
//         type: "Piano",
//         value: PIANO,
//     },
//     {
//         type: "Ukulele",
//         value: UKULELE,
//     },
//     {
//         type: "All",
//         value: [GUITAR, [
//             {
//                 type: "Ukulele",
//                 img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Ukulele1_HiRes.jpg",
//             }
//         ],]
//     }
// ]


function ChordsDetails() {

    // const [list, setList] = useState(DATA);

    const [DATA, setDATA] = useState([]);
    const [key, setKey] = useState(KEY[0]);
    const [suffix, setSuffix] = useState(SUFFIX[0]);
    const [instrument, setInstrument] = useState(INSTRUMENT[1]);
    const [listChord, setListChord] = useState([]);
    const [listCollectionChord, setListCollectionChord] = useState([])
    const [collectionName, setCollectionName] = useState("")
    const [collectionDescription, setCollectionDescription] = useState("")
    const [id, setId] = useState("")
    const vertical = "bottom"
    const horizontal = "top"
    const [messageSuccess, setMessageSuccess] = useState("")
    const [messageFailed, setMessageFailed] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false);
    const [openFailedSnackBar, setOpenFailedSnackBar] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenSuccessSnackBar = () => setOpenSuccessSnackBar(true);
    const handleCloseSuccessSnackBar = () => setOpenSuccessSnackBar(false);
    const handleOpenFailedSnackBar = () => setOpenFailedSnackBar(true);
    const handleCloseFailedSnackBar = () => setOpenFailedSnackBar(false);
    const [pageKey, setPageKey] = useState(1)
    const [pageSuffix, setPageSuffix] = useState(1)
    const [pageInstrument, setPageInstrument] = useState(1)
    const [pages, setPages] = useState(1)
    const [checkKey, setCheckKey] = useState(false)
    const [checkSuffix, setCheckSuffix] = useState(false)
    const [checkInstrument, setCheckInstrument] = useState(true)
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
    const token = useToken()
    const navigate = useNavigate()
    let userId = ""
    if (token) {
        userId = jwtDecode(token).sub
    }
    const contentStyle = { background: 'white', width: 330, borderRadius: 12, background: 'gray', color: 'white', marginBot: 100 };

    const handleKeyChange = (e) => {
        setKey(e.target.value);
        setCheckKey(true)
        setCheckSuffix(false)
        setCheckInstrument(false)
    }

    const handleSuffixChange = (e) => {
        setSuffix(e.target.value);
        setCheckKey(false)
        setCheckSuffix(true)
        setCheckInstrument(false)
    }

    const handleInstrumentChange = (e) => {
        setInstrument(e.target.value);
        setCheckKey(false)
        setCheckSuffix(false)
        setCheckInstrument(true)
    }

    const loadChordCollection = async () => {
        await axiosInstance.get(`http://localhost:8080/api/v1/chordcollection/user/${userId}`)
            .then((res) => {
                setListCollectionChord(res.data)
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const addAndCreateChordToCollection = async () => {
        setMessageSuccess("")
        if (!token) {
            navigate("/login")
            return
        }
        console.log("Id" + id)
        if (!collectionName) {
            setOpenFailedSnackBar(true)
            setMessageFailed("All fields must not be null!")
            return;
        }
        await axiosInstance.post("http://localhost:8080/api/v1/chordcollection/addchord", { userId: userId, flag: "Create new collection", name: collectionName, description: collectionDescription, chordId: [id] })
            .then((res) => {
                setMessageSuccess("Create chord collection successfully")
                setOpenModal(false)
                setOpenSuccessSnackBar(true)
                setCollectionName("")
                setCollectionDescription("")
            })
            .catch((error) => {
                setMessageFailed("Collection Name has been used!")
                setOpenFailedSnackBar(true)
            })
    }

    const addChordToCollection = async (name, id) => {
        if (!token) {
            navigate("/login")
            return
        }
        await axiosInstance.post("http://localhost:8080/api/v1/chordcollection/addchord", { userId: userId, flag: "", name: name, chordId: [id] })
            .then((res) => {
                setMessageSuccess("Add chord successfully")
                setOpenSuccessSnackBar(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadChordCollection()
    }, [messageSuccess])

    useEffect(() => {
        async function fetchData() {
            let data = await axiosInstance.get(`http://localhost:8080/chord/searchChord/${instrument}`);
            setDATA(data.data);
            console.log("Test: " + data.data)
            // let list = data.data.filter((item) => item.key === key && item.suffix === suffix);
            // setListChord(list);
            // const newGroup = ListSplitter({ data: data.data, groupSize: 8 })
            // for (let i = 0; i < newGroup.length; i++) {
            //     if (pageInstrument === i + 1) {
            //         setListChord(newGroup[i])
            //     }
            // }
            // setPages(newGroup.length);
            if (key !== 'All' && suffix !== "All") {
                let list = data.data.filter((item) => item.key === key && item.suffix === suffix);
                const newGroup = ListSplitter({ data: list, groupSize: 8 })
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageKey === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            } else {
                if (key === "All" && suffix !== "All") {
                    let list = data.data.filter((item) => item.suffix === suffix);
                    const newGroup = ListSplitter({ data: list, groupSize: 8 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (pageKey === i + 1) {
                            setListChord(newGroup[i])
                        }
                    }
                    setPages(newGroup.length)
                } else if (key !== "All" && suffix === "All") {
                    let list = data.data.filter((item) => item.key === key);
                    const newGroup = ListSplitter({ data: list, groupSize: 8 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (pageKey === i + 1) {
                            setListChord(newGroup[i])
                        }
                    }
                    setPages(newGroup.length)
                }
                else if (key === "All" && suffix === "All") {
                    let list = data.data.filter((item) => item.key === key && item.suffix === suffix);
                    const newGroup = ListSplitter({ data: data.data, groupSize: 8 })
                    for (let i = 0; i < newGroup.length; i++) {
                        if (pageInstrument === i + 1) {
                            setListChord(newGroup[i])
                        }
                    }
                    setPages(newGroup.length);
                }
            }
        }

        fetchData();
    }, [instrument, pageInstrument])


    useEffect(() => {
        if (key !== 'All' && suffix !== "All") {
            let list = DATA.filter((item) => item.key === key && item.suffix === suffix);
            const newGroup = ListSplitter({ data: list, groupSize: 8 })
            for (let i = 0; i < newGroup.length; i++) {
                if (pageKey === i + 1) {
                    setListChord(newGroup[i])
                }
            }
            setPages(newGroup.length)
        } else {
            if (key === "All" && suffix !== "All") {
                let list = DATA.filter((item) => item.suffix === suffix);
                const newGroup = ListSplitter({ data: list, groupSize: 8 })
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageKey === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            } else if (key !== "All" && suffix === "All") {
                let list = DATA.filter((item) => item.key === key);
                const newGroup = ListSplitter({ data: list, groupSize: 8 })
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageKey === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            }
            else if (key === "All" && suffix === "All") {
                const newGroup = ListSplitter({ data: DATA, groupSize: 8 })
                console.log("Test: " + newGroup)
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageKey === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            }
        }
    }, [key, pageKey])

    useEffect(() => {
        if (key !== 'All' && suffix !== "All") {
            let list = DATA.filter((item) => item.key === key && item.suffix === suffix);
            const newGroup = ListSplitter({ data: list, groupSize: 8 })
            for (let i = 0; i < newGroup.length; i++) {
                if (pageSuffix === i + 1) {
                    setListChord(newGroup[i])
                }
            }
            setPages(newGroup.length)
        } else {
            if (key !== "All" && suffix === "All") { //Sufix == All
                let list = DATA.filter((item) => item.key === key);
                const newGroup = ListSplitter({ data: list, groupSize: 8 })
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageSuffix === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            } else if (key === "All" && suffix !== "All") {
                let list = DATA.filter((item) => item.suffix === suffix);
                const newGroup = ListSplitter({ data: list, groupSize: 8 })
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageSuffix === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            }
            else if (key === "All" && suffix === "All") { //key === All and suffix === All
                const newGroup = ListSplitter({ data: DATA, groupSize: 8 })
                for (let i = 0; i < newGroup.length; i++) {
                    if (pageSuffix === i + 1) {
                        setListChord(newGroup[i])
                    }
                }
                setPages(newGroup.length)
            }
        }
    }, [suffix, pageSuffix])

    console.log(DATA);

    return (
        <div className={cx("list-header")}>
            <div className={cx("title-back")}>
                <h1 className={cx("title")}> CHORDS VARIATIONS</h1>

                <div className={cx("back")}></div>
            </div>
            <div>
                <nav className={cx("choice-header")} id="sidebar">
                    {/* <div class="sidebar-header">
                        <h3>Chord collection</h3>
                    </div> */}
                    <div class="collection-box">
                        <h4>Key</h4>
                        <select id="chord-collection-keys" style={{ height: 30, witdh: 80, outline: '2px solid grey' }} class="chord-collection-select" onChange={handleKeyChange} defaultValue={key}>
                            {KEY.map((item, index) => {
                                return <option className={cx("key-option")} key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <div class="collection-box">
                        <h4>Suffix</h4>
                        <select id="chord-collection-suffixes" style={{ height: 30, witdh: 80, outline: '2px solid grey' }} class="chord-collection-select" onChange={handleSuffixChange} defaultValue={suffix}>
                            {SUFFIX.map((item, index) => {
                                return <option className={cx("key-option")} key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>
                    <div class="collection-box">
                        <h4>Instrument</h4>
                        <select id="chord-collection-suffixes" style={{ height: 30, witdh: 80, outline: '2px solid grey' }} class="chord-collection-select" onChange={handleInstrumentChange} defaultValue={instrument}>
                            {INSTRUMENT.map((item, index) => {
                                return <option className={cx("key-option")} style={{ textTransform: 'uppercase' }} key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>

                </nav>
                <div className={cx("line")}>
                </div>
            </div>

            <div className={cx("list-chords")} style={{ height: 'auto', marginLeft: 80 }}>
                {listChord.map((item) => {
                    return (<div>
                        <img className={cx("detail-img")} style={{ width: 220, height: 220 }} key={item.type} src={item.image} alt={item.chordName} />
                        <p className={cx("img__description")} style={{ paddingTop: 60, fontWeight: "bold" }}>{item.chordName} {item.description}<p style={{ marginTop: -20, fontWeight: "normal" }}>{item.type}</p><Popup trigger={<button className={cx("button-popup")} style={{ padding: 3, cursor: "pointer" }}> Add to collection </button>} {...{ contentStyle }} position="right center" >
                            <div className={cx("text-all")} >

                                <div style={{ marginTop: 50, marginBottom: 40 }}>
                                    {token ?
                                        <a style={{ background: 'none', marginLeft: 58, fontSize: 18, cursor: "pointer" }} className={cx("button-popup-add")} onClick={() => [setOpenModal(true), setId(item.id)]}> Create New Collection</a>
                                        : <a style={{ background: 'none', marginLeft: 58, fontSize: 18, cursor: "pointer" }} className={cx("button-popup-add")} onClick={() => [setOpenFailedSnackBar(true), setMessageFailed("You need to login before using this function!")]}> Add To Collection</a>}
                                    {listCollectionChord.length !== 0 && listCollectionChord.map((collectionChord) => {
                                        return (
                                            <div className={cx("link-text")} style={{ display: 'flex', fontSize: 18, fontWeight: 400, gap: 20, justifyContent: 'center', marginRight: 38, marginTop: 30 }} onClick={() => addChordToCollection(collectionChord.name, item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M21 15V6M12 12H3M16 6H3M12 18H3M18.5 18C19.163 18 19.7989 17.7366 20.2678 17.2678C20.7366 16.7989 21 16.163 21 15.5C21 14.837 20.7366 14.2011 20.2678 13.7322C19.7989 13.2634 19.163 13 18.5 13C17.837 13 17.2011 13.2634 16.7322 13.7322C16.2634 14.2011 16 14.837 16 15.5C16 16.163 16.2634 16.7989 16.7322 17.2678C17.2011 17.7366 17.837 18 18.5 18Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <a style={{ cursor: "pointer" }}>{collectionChord.name}</a>
                                            </div>)
                                    })}
                                </div>
                            </div>
                        </Popup>
                        </p>

                    </div>)
                })}
                {checkKey === true ?
                    <div>
                        {pages !== 1 ?
                            <div className={cx("pagination")}>
                                <Pagination pages={pages} page={pageKey} setPage={setPageKey} />
                            </div>
                            : <div></div>}
                    </div> : <div></div>}
                {checkSuffix === true ?
                    <div>
                        {pages !== 1 ?
                            <div className={cx("pagination")}>
                                <Pagination pages={pages} page={pageSuffix} setPage={setPageSuffix} />
                            </div>
                            : <div></div>}
                    </div> : <div></div>}
                {checkInstrument === true ?
                    <div>
                        {console.log(pages)}
                        {pages !== 1 ?
                            <div className={cx("pagination")}>
                                <Pagination pages={pages} page={pageInstrument} setPage={setPageInstrument} />
                            </div>
                            : <div></div>}
                    </div> : <div></div>}
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{ fontSize: 25 }} id="modal-modal-title" variant="h6" component="h2">
                        Create New Collection
                    </Typography>
                    <Typography style={{ fontSize: 20 }} id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormControl style={{ textAlign: "center" }}>
                            <TextField inputProps={{ style: { fontSize: 20 } }} InputLabelProps={{ style: { fontSize: 20 } }} id="standard-basic" label="Collection Name" variant="standard" value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />
                            <TextField inputProps={{ style: { fontSize: 20 } }} InputLabelProps={{ style: { fontSize: 20 } }} id="standard-basic" label="Collection Description" variant="standard" value={collectionDescription} onChange={(e) => setCollectionDescription(e.target.value)} />
                            <Button style={{ marginTop: 50, marginRight: 60, marginLeft: 40 }} variant="contained" onClick={() => addAndCreateChordToCollection()}>Create</Button>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
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

export default ChordsDetails;
