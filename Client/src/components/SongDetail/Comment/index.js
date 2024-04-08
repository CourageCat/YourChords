import {
  Card,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import CommentItems from './CommentItems';
import { IoSend } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { SongContext } from '@/Pages/SongDetails';
import { GlobalContext } from '@/Provider';
import axios from 'axios';
import useToken from '@/authorization/useToken';
import jwtDecode from 'jwt-decode';

function Comment({ songCommentData, avatarUser, ...props }) {
  const { information, setReload } = useContext(SongContext);
  const token = useToken();
  const { BACK_END_PORT } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    userId: information?.userId,
    songId: information?.songId,
    content: '',
    parentId: null,
  });
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
  const handleComment = () => {
    if(!token){
      showFailedToast("You need to login before using this function!")
      return
    }
    if (formData?.content.length) {
      axios
        .post(`${BACK_END_PORT}/api/v1/comment`, formData)
        .then((response) => {
          if (response.data === 'Comment Successfully') {
            setFormData({ ...formData, content: '' });
            setReload(true);
            setTimeout(() => {
              setReload(false);
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
          showFailedToast("Upload comment failed!")        
        });
    } else {
      showFailedToast("Please input your comment!")
    }
  };
  const handleDelete = (id) => {
    axios
      .post(`${BACK_END_PORT}/api/v1/comment/${id}`, formData)
      .then((response) => {
        if (response.data === 'Deleted Comment Successfully!') {
          setReload(true);
          setTimeout(() => {
            setReload(false);
          }, 500);
        }
      })
      .catch((err) => {
        showFailedToast("You cannot delete this comment (This comment is not own by you)!")
      });
  };
  return (
    <Card className='comment' {...props}>
      <CardBody>
        <Flex w={'100%'} mt={2} mb={6}>
          {avatarUser ? 
          <Avatar
            src={
              avatarUser
            }
            height={'40px'}
            width={'40px'}
            alignSelf={'start'}
            m={{ base: '0 0 15px 0', md: '0 15px 0 0' }}
          /> : 
          <Avatar
            src={
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s'
            }
            height={'40px'}
            width={'40px'}
            alignSelf={'start'}
            m={{ base: '0 0 15px 0', md: '0 15px 0 0' }}
          />}
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              height= '50px'
              placeholder='Enter your comment'
              borderRadius={'9999px'}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
            <InputRightElement
              width='3.5rem'
              height='50px'
              color={'#1877F2'}
              fontSize={'20px'}
            >
              <IoSend style={{ cursor: 'pointer' }} onClick={() => handleComment()} />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <CommentItems
          songCommentData={songCommentData}
          BACK_END_PORT={BACK_END_PORT}
          handleDelete={handleDelete}
          avatarUser = {avatarUser}
        />
      </CardBody>
    </Card>
  );
}

export default Comment;
