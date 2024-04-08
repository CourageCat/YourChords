import React, { useState } from 'react';
import { Box, Image, Flex, Button, IconButton } from '@chakra-ui/react';
import { BsMusicNote } from 'react-icons/bs';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function MusicCardItem({
  name,
  content,
  image,
  showNumberSong,
  numberSongs,
  isChorListDetail,
  idChordCollection,
  id,
  setReload,
  BACK_END_PORT,
  removeSong,
  handleDeleteChordCollection,
  handleDeleteSongCollection,
  ...props
}) {
  const [removeStatus, setRemoveStatus] = useState(false);
  const [configData, setConfigData] = useState({});
  return (
    <Box
      maxW='sm'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      color='white'
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      p={'16px'}
      filter={'drop-shadow(0 0 0.3rem rgb(146, 143, 144))'} 
      onMouseEnter={() => setRemoveStatus(true)}
      onMouseLeave={() => setRemoveStatus(false)}
      {...props}
    >
      {
        <Box
          height={isChorListDetail ? '' : '220px'}
          width='100%'
          mb={isChorListDetail ? '4px' : '16px'}
        >
          {idChordCollection ? 
            <Button style={{ marginTop: -30, marginBottom: -10, marginLeft: 165}} onClick={() => handleDeleteChordCollection(name)}><DeleteIcon/></Button>
            :
            <Button style={{ marginTop: -30, marginBottom: -10, marginLeft: 165}} onClick={() => handleDeleteSongCollection(name)}><DeleteIcon/></Button>}
          {idChordCollection ? 
          <Link to={`/my-playlist-chord/${idChordCollection}`}><Image
            src={
              image
                ? image
                : require ("../../assets/images/Other/chordddd).jpg")

            }
            alt='Card image'
            objectFit='cover'
            w='100%'
            h='100%'
            borderRadius={'6px'}
            paddingBottom={'10px'}
          /></Link> : 
          <Link to={`/my-playlist-song/${name}`}><Image
            src={
              image
                ? image
                : require("../../assets/images/Other/chordddd).jpg")
            }
            alt='Card image'
            objectFit='cover'
            w='100%'
            h='100%'
            borderRadius={'6px'}
            paddingBottom={'10px'}
          /></Link>}
        </Box>
      }
      {removeStatus && isChorListDetail && (
        <Box position={'relative'}>
          <IconButton
            position={'absolute'}
            onClick={() => removeSong(id)}
            bottom={0}
            left={0}
            isRound={true}
            variant='solid'
            colorScheme='red'
            aria-label='Done'
            fontSize='20px'
            icon={<DeleteIcon />}
          />
        </Box>
      )}
      <Box
        mt={'10%'}
        minH={'62px'}
        marginTop={'4px'}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
      >

        <Box>
          <Box
            borderRadius='full'
            colorscheme='teal'
            overflow={isChorListDetail ? 'visible' : 'hidden'}
            textOverflow={'ellipsis'}
            fontSize={'1.6rem'}
            fontWeight={'700'}
          >
            {name}
          </Box>

          {showNumberSong && (
            <Flex
              borderRadius='full'
              overflow={isChorListDetail ? 'visible' : 'hidden'}
              textOverflow={'ellipsis'}
              alignItems={'center'}
              mt={2}
            >
              <BsMusicNote style={{ marginRight: '5px' }} />
              {numberSongs} songs
            </Flex>
          )}
        </Box>
        <Box
          mt={'4px'}
          overflow={isChorListDetail ? 'visible' : 'hidden'}
          whiteSpace={'normal'}
          display={isChorListDetail ? 'block' : '-webkit-box'}
          textOverflow={'ellipsis'}
          fontSize={'1.4rem'}
          style={
            isChorListDetail
              ? {}
              : {
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }
          }
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
}

export default MusicCardItem;
