import {
  Box,
  Button,
  Flex,
  Stack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChordsComponent,
  CommentComponent,
  LyricsComponent,
} from "@/components/SongDetail";
import BannerTitle from "@/components/Banner";
import { GlobalContext } from "@/Provider";
import axios from "axios";
import ReportForm from "@/components/ReportForm";
import ViewReport from "@/components/SongDetail/VIewReport";
import { FiMoreHorizontal } from "react-icons/fi";
import { AddIcon } from "@chakra-ui/icons";
import { BsMusicNoteList } from "react-icons/bs";
import EditForm from "@/components/PlaylistDetail/EditForm";
import AddSongAndPlaylist from "@/components/SongDetail/AddForm";
import useToken from "@/authorization/useToken";
import jwtDecode from "jwt-decode";
import axiosInstance from "@/authorization/axiosInstance";

export const SongContext = createContext();

function highlightRedWords(line) {
  return line.replace(
    /\[(.*?)\]/g,
    '<span style="color: red; cursor:pointer; font-weight: 500">[$1]</span>'
  );
}
function SongDetail() {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [newListStatus, setNewListStatus] = useState(false);
  const [modalView, setModalView] = useState(false);
  const { BACK_END_PORT } = useContext(GlobalContext);
  const [songData, setSongData] = useState({});
  const [songCommentData, setSongCommentData] = useState([]);
  const [listPlaylist, setListPlayList] = useState([]);
  const [checkDelete, setCheckDelete] = useState(false)
  const [checkUpdate, setCheckUpdate] = useState(false)
  const [checkBan, setCheckBan] = useState(false)
  const [singer, setSinger] = useState("")
  const [tone, setTone] = useState("")
  const [vocalRange, setVocalRange] = useState("")
  const toast = useToast();
  const showSuccessToast = (e) => {
    toast({
      title: "Message",
      description: e,
      status: "success",
      duration: 3000,
      position: "bottom-right", // Set the position here
      isClosable: true,
    });
  };
  const showFailedToast = (e) => {
    toast({
      title: "Message",
      description: e,
      status: "warning",
      duration: 3000,
      position: "bottom-right", // Set the position here
      isClosable: true,
    });
  };
  const navigate = useNavigate()
  const admin = JSON.parse(sessionStorage.getItem("Admin"))
  const token = useToken()
  let userId = ""
  if (token) {
    userId = jwtDecode(token).sub
  }
  const information = {
    userId: userId,
    songId: id,
  };
  const [reload, setReload] = useState(false);
  let songDescription = songData?.description;
  if (songDescription) {
    songDescription = songDescription
      .split("\n")
      .map(highlightRedWords)
      .join("\n");
  }

  const handleRating = async (score) => {
    if (!token) {
      return
    }
    axios
      .get(
        `${BACK_END_PORT}/api/v1/song/rate?userid=${userId}&songid=${id}&rating=${score}`
      )
      .then((response) => {
        if (response.data === "Rating Successfully") {
          showSuccessToast("Rating Successfully")
          setReload(true)
          setTimeout(() => {
            setReload(false)
          }, 500)
        }
      })
      .catch((error) => {
        showFailedToast("Rating Failed!")
      });
  };

  const fetchData = async () => {
    try {
      const [getSongDetail, getSongComment, getListPlaylist] =
        await Promise.all([
          axios.get(`${BACK_END_PORT}/api/v1/song/${id}`),
          axios.get(`${BACK_END_PORT}/api/v1/comment/song/${id}`),
          axios.get(`${BACK_END_PORT}/api/v1/playlist/user/${userId}`),
        ]);

      if (getSongDetail) {
        setSongData(getSongDetail.data);
        setSinger(getSongDetail.data.singer)
        setTone(getSongDetail.data.tone)
        setVocalRange(getSongDetail.data.vocalRange)
      }
      if (getSongComment) {
        setSongCommentData(getSongComment.data);
      }
      if (getListPlaylist) {
        setListPlayList(getListPlaylist.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSong = async () => {
    if(!token){
      showFailedToast("You need to login before using this function!")
      return
    }
    await axiosInstance.delete(`http://localhost:8080/api/v1/song/user/${userId}`, {
      params: { songid: songData.id }
    })
      .then((res) => {
        showSuccessToast("Delete Successfully")
        setTimeout(() => {
          navigate("/songs")
        },1000)     
      })
      .catch((error) => {
        showFailedToast("Delete Failed")
      })
  }

  const handleUpdateSong = async () => {
    if(!token){
      showFailedToast("You need to login before using this function!")
      return
    }
    await axiosInstance.patch(`http://localhost:8080/api/v1/song/user/${userId}/${songData.id}`, {
      singer: singer,
      tone: tone,
      vocalRange: vocalRange
    }
    )
      .then((res) => {
        showSuccessToast("Update Successfully")
        console.log(reload)
        setReload(true)
      })
      .catch((error) => {
        showFailedToast("Update Failed!")
        setReload(true)
        console.log(error)
      })
  }

  const handleBanSong = async() => {
    await axiosInstance.post(`http://localhost:8080/api/v1/admin/ban/song/${songData.id}`)
    .then((res) => {
      showSuccessToast("Ban Successfully")
    })
    .catch((error) => {
      showFailedToast("Ban Failed!")
    })
  }

  const iconStyle = {
    position: "absolute",
    top: "125px", // Adjust the position as needed
    right: "350px", // Adjust the position as needed
    padding: "5px",
    marginTop: 50

  }

  // const iconStyle1 = {
  //   position: "absolute",
  //   top: "125px", // Adjust the position as needed
  //   right: "500px", // Adjust the position as needed
  //   padding: "5px",

  // }

  const boxStyle = {
    position: "absolute",
    top: "110px", // Adjust the position as needed
    left: "1200px", // Adjust the position as needed
    fontSize: "40px",
    padding: "5px",
    borderRadius: "10px",
    maginRight: "5px",
    marginLeft:"200px",
    display: "flex",
    gap: "5px",
    marginTop: 50

  }

  // const containerStyle = {
  //   backgroundImage: 'url("../assets/images/Other/download (1).jpg")', 
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // };


  const addSongToPlayList = (name) => {
    if(!token){
      showFailedToast("You need to login before using this function!")
      return
    }
    const formData = {
      name: name,
      songid: id,
    };
    axios
      .post(`${BACK_END_PORT}/api/v1/playlist/user/${userId}`, formData)
      .then((response) => {
        if (response.data === "Add successfully!") {
          showSuccessToast("Add Successfully")
        }
      })
      .catch((error) => {
        showFailedToast("Add Failed!")
      });
  };

  const MenuItemHTML = listPlaylist && listPlaylist?.map((item, index) => (
    <MenuItem
      icon={<BsMusicNoteList />}
      fontSize={"14px"}
      onClick={() => {
        addSongToPlayList(item?.name);
      }}
    >
      {item?.name}
    </MenuItem>
  ));

  useEffect(() => {
    fetchData();
  }, [BACK_END_PORT]);

  useEffect(() => {
    if (reload) {
      fetchData();
    }
  }, [reload]);



  return (
    <SongContext.Provider value={{ information, setReload }}>
      <div >

        <AddSongAndPlaylist
          userId={userId}
          isOpen={newListStatus}
          onClose={() => setNewListStatus(false)}
          songId={id}
          setReload={setReload}


        />
        <ReportForm isOpen={isOpen} onClose={onClose} />
        <ViewReport isOpen={modalView} onClose={() => setModalView(false)} />
        <BannerTitle
          songData={songData}
          handleRating={handleRating}
          BACK_END_PORT={BACK_END_PORT}
          information={information}
          setReload={setReload}
          sytle={{ position: "relative" }}

        >
        </BannerTitle>

        <Box mb={10} mt={6} >
          <Flex m={"0 auto 1%"} w={"68%"} justifyContent={"flex-end"} mb={4} >
            <Box display={"flex"}>
              {((userId.includes(songData.userid))) ?
                <div style={boxStyle}>
                  <Button
                    height="40px"
                    width="100px"
                    onClick={() => setModalView(true)}
                    colorScheme="teal"
                    variant="outline"
                    color="black"
                  >
                    View report
                  </Button>
                  <Button
                    height="40px"
                    width="100px"
                    onClick={() => setCheckDelete(true)}
                    colorScheme="teal"
                    variant="outline"
                    color="black"
                  >
                    Delete
                  </Button>
                  <Button
                    height="40px"
                    width="100px"
                    onClick={() => setCheckUpdate(true)}
                    colorScheme="teal"
                    variant="outline"
                    color="black"
                  >
                    Update
                  </Button>
                </div>
                : admin ?
                  <div style={boxStyle}>
                    <Button
                      height="40px"
                      width="100px"
                      onClick={() => setModalView(true)}
                      colorScheme="teal"
                      variant="outline"
                      color="black"
                    >
                      View report
                    </Button>
                    <Button
                      height="40px"
                      width="100px"
                      onClick={() => setCheckBan(true)}
                      colorScheme="teal"
                      variant="outline"
                      color="black"
                    >
                      Ban
                    </Button>
                  </div> : <div style={boxStyle}>
                    <Button height="40px" width="100px" onClick={onOpen} colorScheme="red" variant="outline" color="black" ml={2}>
                      Report
                    </Button>
                    {/* <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<FiMoreHorizontal />}
                      variant="outline"
                      ml={2}
                      colorScheme={""}
                      style={iconStyle1}
                    />
                    <MenuList>
                      <MenuItem
                        icon={<AddIcon />}
                        fontSize={"14px"}
                        onClick={() => {
                          setNewListStatus(true);
                        }}
                      >
                        Add New Playlist
                      </MenuItem>
                      {MenuItemHTML}
                    </MenuList>
                  </Menu> */}
                  </div>
              }
              {admin === false ?
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMoreHorizontal />}
                  variant="outline"
                  ml={2}
                  colorScheme={""}
                  style={iconStyle}
                />
                <MenuList>
                  <MenuItem
                    icon={<AddIcon />}
                    fontSize={"14px"}
                    onClick={() => {
                      setNewListStatus(true);
                    }}
                  >
                    Add New Playlist
                  </MenuItem>
                  {MenuItemHTML}
                </MenuList>
              </Menu> : <div></div>}
            </Box>
          </Flex>
          <Flex justifyContent={"center"}>
            <Stack w={"60%"} mr={10}>
              <LyricsComponent
                songDescription={songDescription}
                userfullname={songData?.userfullname}
                maxH={"900px"}
                overflowY={"scroll"}
                userId={songData?.userid}

              />
              {admin === false ? 
              <CommentComponent
                mt={8}
                maxH={"780px"}
                overflowY={"scroll"}
                songCommentData={songCommentData}
              /> : <div></div>}
            </Stack>
            <ChordsComponent
              songData={songData}
              maxH={"1220px"}

              overflowY={"scroll"}
            />
            {/* style={containerStyle} */}
          </Flex>
        </Box>
      </div>
      <Modal isOpen={checkBan} onClose={() => setCheckBan(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: 20 }}>Are you sure to ban this song?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => [setCheckBan(false), handleBanSong()]}>
              Yes
            </Button>
            <Button onClick={() => setCheckBan(false)} variant='ghost'>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={checkDelete} onClose={() => setCheckDelete(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: 20 }}>Are you sure to delete this song?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => [setCheckDelete(false), handleDeleteSong()]}>
              Yes
            </Button>
            <Button onClick={() => setCheckBan(false)} variant='ghost'>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={checkUpdate} onClose={() => setCheckUpdate(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontSize: 25 }}>Update Song</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel style={{ fontSize: 20 }}>Singer</FormLabel>
              <Input style={{ fontSize: 15 }} placeholder='Singer' value={singer} onChange={(e) => setSinger(e.target.value)} />
              <FormLabel style={{ fontSize: 20 }}>Tone</FormLabel>
              <Input style={{ fontSize: 15 }} placeholder='Tone' value={tone} onChange={(e) => setTone(e.target.value)} />
              <FormLabel style={{ fontSize: 20 }}>Vocal Range</FormLabel>
              <Input style={{ fontSize: 15 }} placeholder='Vocal Range' value={vocalRange} onChange={(e) => setVocalRange(e.target.value)} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => [setCheckUpdate(false), handleUpdateSong()]}>
              Update
            </Button>
            <Button variant='ghost'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </SongContext.Provider>
  );
}

export default SongDetail;
