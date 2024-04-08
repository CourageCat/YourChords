import { GlobalContext } from "@/Provider";
import useToken from "@/authorization/useToken";
import Pagination from "@/components/Pagination2";
import EditForm from "@/components/PlaylistDetail/EditForm";
import SongItem from "@/components/SongItem/MyPlaylistSongDetail";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  CardBody,
  Flex,
  Heading,
  Text,
  Card,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import NotFoundChakraUI from "@/components/NotFoundChakraUI";

function MyPLayListDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { playListName } = useParams();
  const { BACK_END_PORT } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dynamicPlaylist, setDynamicPlaylist] = useState([]);
  const [playListDetail, setPlayListDetail] = useState({});
  const [reload, setReload] = useState(false);
  const token = useToken();
  let userId = ""
  if(token){
    userId = jwtDecode(token).sub
  }
  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    playListDetail?.songs?.length
      ? playListDetail?.songs?.length / itemsPerPage
      : 0
  );

  const handlePageChange = (page, list = []) => {
    let newList = [];
    for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
      if (list[i]) {
        newList.push(list[i]);
      }
    }
    setCurrentPage(page);
    setDynamicPlaylist(newList);
  };

  const fetchData = async () => {
    try {
      const getPlayListDetail = await axios.get(
        `${BACK_END_PORT}/api/v1/playlist/user/${userId}/${playListName}/detail`
      );

      if (getPlayListDetail) {
        setPlayListDetail(getPlayListDetail.data);
        handlePageChange(1, getPlayListDetail.data?.songs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const SongItemsHTML = playListDetail?.songs?.map((item, index) => (
    <SongItem
      key={index}
      data={item}
      index={index + 1}
      playListName={playListName}
      BACK_END_PORT={BACK_END_PORT}
      user_id={userId}
      setPlayListDetail={setPlayListDetail}
      playListDetail={playListDetail}
      reload={reload}
      setReload={setReload}
    />
  ));

  const PaginationHTML = (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <Text style={{fontSize: "2.5rem"}}>
        Showing {dynamicPlaylist?.length} out of {playListDetail?.songs?.length}{" "}
        entires
      </Text>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        list={playListDetail?.songs}
      />
    </Flex>
  );

  useEffect(() => {
    fetchData();
  }, [BACK_END_PORT, playListName]);

  useEffect(() => {
    if (reload) {
      fetchData();
    }
  }, [reload]);
if(playListDetail){
  return (
    <Box style={{marginTop:-100, marginBottom:500}}>
      <Box style={{marginTop:100}} w={"60%"} m={"3% auto"} p={"0"}>
        <EditForm 
          userId={userId}
          isOpen={isOpen}
          onClose={onClose}
          playListName={playListName}
          setReload={setReload}
        />
        <Flex alignItems={"flex-end"}>
          <Box style={{marginTop:250}}>
            <Text style={{fontSize: "5rem", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "-750px"}}>Collection</Text>
            <Heading style={{fontSize: "4rem"}}>{playListName}</Heading>
          </Box>
          <IconButton icon={<EditIcon />} ml={5} fontSize={25} marginBottom={3} onClick={onOpen} />
        </Flex>
        {playListDetail?.songs?.length ? (
          <>
            {SongItemsHTML}
            {PaginationHTML}
          </>
        ) : (
          <Card mt={12}>
            <CardBody>
              <Heading>List song is empty</Heading>
            </CardBody>
          </Card>
        )}
      </Box>
      <div style={{marginBottom:500, color:"white"}}>...</div>
    </Box>
  );}
  else{
    return (
      <NotFoundChakraUI/>
    )
  }
}

export default MyPLayListDetail;
