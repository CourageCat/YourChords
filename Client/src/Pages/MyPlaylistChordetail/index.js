import { GlobalContext } from "@/Provider";
import Pagination from "@/components/Pagination2";
import {
  Box,
  CardBody,
  Flex,
  Heading,
  Text,
  Card,
  SimpleGrid,
  CardHeader,
  Divider,
  CardFooter,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MusicCardItem from "@/components/MusicCard";
import { ChordsComponent } from "@/components/SongDetail";
import TabChordList from "@/components/ChorDetail";
import NotFound from "../NotFound";
import NotFoundChakraUI from "@/components/NotFoundChakraUI";

function MyPlayListChordDetail() {
  const { id } = useParams();
  const { BACK_END_PORT } = useContext(GlobalContext);
  const user_name = "mytien";

  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [playListDetail, setPlayListDetail] = useState({});
  const [dynamicPlaylist, setDynamicPlaylist] = useState([]);
  const itemsPerPage = 6;
  const [tabSelected, setTabSelected] = useState("Guitar")
  const toast = useToast();
  const showSuccessToast = (e) => {
    toast({
      title: "Message",
      description: e,
      status: "success",
      duration: 2000,
      position: "top-right", // Set the position here
      isClosable: true,
    });
  };
  const showFailedToast = (e) => {
    toast({
      title: "Message",
      description: e,
      status: "warning",
      duration: 2000,
      position: "top-right", // Set the position here
      isClosable: true,
    });
  };
  const totalPages = Math.ceil(
    playListDetail?.chords?.length
      ? playListDetail?.chords?.filter(item=>item?.type === tabSelected).length / itemsPerPage
      : 0
  );

  const handlePageChange = (page, list = []) => {
    let newList = [];
    for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
      if (list.filter(item=>item?.type === tabSelected)[i]) {
        newList.push(list.filter(item=>item?.type === tabSelected)[i]);
      }
    }
    setCurrentPage(page);
    setDynamicPlaylist(newList);
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(
        `${BACK_END_PORT}/api/v1/chordcollection/remove`,
        {
          username: user_name,
          name: playListDetail?.name,
          chordId: [id],
        }
      );

      if (response.data === "Remove successfully") {
        showSuccessToast("Remove successfully")
        setReload(true);
        setTimeout(() => {
          setReload(false);
        }, 500);
      }
    } catch (error) {
      showFailedToast("Remove failed!")
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const getPlayListDetail = await axios.get(
        `${BACK_END_PORT}/api/v1/chordcollection/${id}`
      );

      if (getPlayListDetail) {
        setPlayListDetail(getPlayListDetail.data);
        handlePageChange(1, getPlayListDetail.data?.chords);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const PaginationHTML = (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
      <Text>
        Showing {dynamicPlaylist?.length} out of{" "}
        {playListDetail?.chords?.length} entires
      </Text>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        list={playListDetail?.chords}
      />
    </Flex>
  );
  const SongItemsHTML = dynamicPlaylist?.map((item, index) => (
    <MusicCardItem
      key={index}
      id={item?.id}
      image={item?.image}
      content={item?.description}
      name={item?.name}
      w="250px"
      h="450px"
      color={"black"}
      mr={playListDetail?.chords?.length !== 5 ? "4%" : "0"}
      alignItems={"flex-start"}
      cursor="pointer"
      _hover={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}
      isChorListDetail={true}
      removeSong={removeSong}
    />
  ));

  useEffect(() => {
    fetchData();
  }, [tabSelected]);

  useEffect(() => {
    fetchData();
    handlePageChange(1);
  }, []);

  useEffect(() => {
    if (reload) {
      fetchData();
    }
  }, [reload]);

  

if(playListDetail){


  return (
    <>
    <Box style={{marginTop:-100}} h={"100px"}></Box>
    <Box style={{marginTop:100}} minH={"80vh"}>
      <Box w={"60%"} m={"0 auto"} p={"0"}>
        {playListDetail?.chords?.length ? (
          <>
            <Card>
              <CardHeader>
                <Text style={{fontSize:'1.8rem'}}>Collection</Text>
                <Heading>{playListDetail?.name}</Heading>
              </CardHeader>
              <Divider />
              <CardBody my={5}>
                {/* <SimpleGrid columns={3} spacing={9} justifyItems={"center"}>
                  {SongItemsHTML}
                </SimpleGrid> */}
                <TabChordList chords={playListDetail?.chords} setTabSelected={setTabSelected} removeSong={removeSong}/>
              </CardBody>
              <Divider />
              <CardFooter>{PaginationHTML}</CardFooter>
            </Card>
          </>
        ) : (
          <Card mt={200}>
            <CardBody>
              <Heading>List Chord is empty</Heading>
            </CardBody>
          </Card>
        )}
      </Box>
    </Box>
    </>
  );}
  else {
    return(
      <NotFoundChakraUI/>
    )
  }
}

export default MyPlayListChordDetail;
