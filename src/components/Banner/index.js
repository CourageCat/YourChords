import { Box, Flex, Image, Text } from '@chakra-ui/react';
import DVDimage from '@/assets/images/Other/DVD.png';
import Rating from '@/components/Rating';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiFillEye } from 'react-icons/ai';
import axios from 'axios';

function BannerTitle({
  songData,
  handleRating,
  BACK_END_PORT,
  information,
  setReload,
}) {
  
  const [liked, setLiked] = useState(false);
  const admin = JSON.parse(sessionStorage.getItem("Admin"))
  const handleLikeSong = async () => {
    axios
      .get(
        `${BACK_END_PORT}/api/v1/song/like?userid=${information.userId}&songid=${information.songId}`,
      )
      .then((response) => {
        if (
          response.data === 'Like Successfully' ||
          response.data === 'Unlike Successfully'
        ) {
          setReload(true);
          setTimeout(() => {
            setReload(false);
          }, 500);
          checkUserLikeSong();
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Cannot rate', error);
      });
  };
  const checkUserLikeSong = async () => {
    axios
      .get(
        `${BACK_END_PORT}/api/v1/song/like/user?userid=${information.userId}&songid=${information.songId}`,
      )
      .then((response) => {
        setLiked(response.data);
      })
      .catch((error) => {
        setLiked(error?.response?.data);
      });
  };
  useEffect(() => {
    if (information?.userId && information?.songId) {
      checkUserLikeSong();
    }
  }, [information]);
  return (
    <Box style={{marginTop:-100}}  bg={'#f8f6fa'} p={'3% 0'} mt={-50} > 
      <Flex justifyContent={'start'} ml={'20%'} style={{marginTop:100}}>
        <Box w={'200px'} mr={10} >
          <Image src={DVDimage} />
        </Box>
        <Flex justifyContent={'flex-start'} flexDirection={'column'}>
          <Text fontSize={'3.5rem'} fontWeight={'700'}>
            {songData?.songName}
          </Text>
          <Text fontSize={'3rem'} fontWeight={'400'}>
            Author: {' ' + songData?.singer}
          </Text>
          <Text fontSize={'3rem'} fontWeight={'400'}>
            Genres:{' '}
            {songData?.genres?.length
              ? ' ' + songData?.genres?.map((item) => item?.name)
              : ' null'}
          </Text>
          {admin === false ?
          <Flex mt={2} alignItems={'center'}>
            <Text
              mr={2}
              fontSize={'3rem'}
              ml={2}
              display={'flex'}
              alignItems={'center'}
              color={liked ? 'red' : null}
            >
              <AiFillHeart
                cursor={'pointer'}
                style={{ marginRight: '5px' }}
                onClick={handleLikeSong}
              />
              {songData?.totalLike}
            </Text>
            {/* <Text
              fontSize={'1.2rem'}
              ml={2}
              display={'flex'}
              alignItems={'center'}
            >
              <AiFillEye style={{ marginRight: '5px' }} />
              {songData?.view}
            </Text> */}
          </Flex> : <div></div>}
            {admin === false ? 
          <Flex mt={2} alignItems={'center'}>
            <Rating fontSize={'4rem'} maxRating={5} handleRating={handleRating} />
            <Text fontSize={'3rem'} ml={2}>
              {songData?.rating}
            </Text>
          </Flex> : <div></div>}
        </Flex>
      </Flex>
    </Box>
  );
}

export default BannerTitle;