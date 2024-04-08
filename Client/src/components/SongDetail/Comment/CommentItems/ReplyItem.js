import {
  Avatar,
  Card,
  CardBody,
  chakra,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';
import { FaRegComment, FaTrash } from 'react-icons/fa6';
import axios from 'axios';
import useToken from '@/authorization/useToken';

function ReplyItem({
  item,
  information,
  handleDelete,
  index,
  BACK_END_PORT,
  setReload,
  avatarUser
}) {
  const [showBox, setShowBox] = useState(false);
  const toast = useToast();
  const token = useToken();
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
  const [formData, setFormData] = useState({
    userId: information?.userId,
    songId: information?.songId,
    content: '',
    parentId: item?.id,
  });

  const handleComment = () => {
    if(!token){
      showFailedToast("You need to login before using this function!")
      return
    }
    if (formData?.content.length) {
      axios
        .post(`${BACK_END_PORT}/api/v1/comment`, formData)
        .then((response) => {
          if (response.data === 'Reply Comment Successfully') {
            setFormData({ ...formData, content: '' });
            setShowBox(false);
             setReload(true);
             setTimeout(() => {
               setReload(false);
             }, 500);
          }
        })
        .catch((err) => {
          showFailedToast("Upload comment failed!")
        });
    } else {
      showFailedToast("Please input your comment!")    
    }
  };

  const ReplyInput = (
    <Flex w={'100%'} my={1}>
      <Avatar
        src={
          avatarUser
            ? avatarUser
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhcVcxgW8LzmIu36MCeJb81AHXlI8CwikrHNh5vzY8A&s'
        }
        height={'40px'}
        width={'40px'}
        alignSelf={'start'}
        m={{ base: '0 0 15px 0', md: '0 15px 0 0' }}
      />
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          placeholder='Enter your comment'
          borderRadius={'9999px'}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
        <InputRightElement width='3.5rem' color={'#1877F2'} fontSize={'20px'}>
          <IoSend style={{ cursor: 'pointer' }} onClick={() => handleComment()} />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );

   const ReplyComment = item?.subComment?.map((e, index) => (
     <ReplyItem
       item={e}
       key={index}
       information={information}
       setReload={setReload}
       BACK_END_PORT={BACK_END_PORT}
       handleDelete={handleDelete}
       avatarUser={avatarUser}
     />
   ));
  return (
    <>
      <Flex
        direction={{ base: 'column-reverse', md: 'row' }}
        rounded={'xl'}
        p={'0 0 10px'}
        justifyContent={'space-between'}
        position={'relative'}
        w={'100%'}
      >
        <Avatar
          src={item?.avatar}
          height={'40px'}
          width={'40px'}
          alignSelf={'start'}
          m={{ base: '0 0 15px 0', md: '0 15px 0 0' }}
        />
        <Stack alignItems={'flex-start'} w={'100%'}>
          <Card
            width={'100%'}
            boxShadow={
              'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'
            }
          >
            <CardBody>
              <Flex
                direction={'column'}
                textAlign={'left'}
                justifyContent={'space-between'}
              >
                <chakra.p
                  fontFamily={'Work Sans'}
                  fontWeight={'bold'}
                  fontSize={18}
                  pb={2}
                >
                  {item?.username}
                </chakra.p>
                <chakra.p
                  fontFamily={'Inter'}
                  fontWeight={'medium'}
                  fontSize={'15px'}
                >
                  {item?.content}
                </chakra.p>
              </Flex>
            </CardBody>
          </Card>
          <Flex>
            <Text
              color={'#1877F2'}
              cursor={'pointer'}
              display={'flex'}
              alignItems={'center'}
              _hover={{ textDecoration: 'underline' }}
              mb={item?.subComment?.length ? 2 : 0}
              onClick={() => setShowBox(!showBox)}
            >
              <FaRegComment style={{ marginRight: '3px' }} /> Reply
            </Text>
            <Text
              color={'red'}
              cursor={'pointer'}
              display={'flex'}
              ml={5}
              alignItems={'center'}
              _hover={{ textDecoration: 'underline' }}
              mb={item?.subComment?.length ? 2 : 0}
              onClick={() => handleDelete(item?.id, index)}
            >
              <FaTrash style={{ marginRight: '3px' }} onClick={handleDelete} />{' '}
              Delete
            </Text>
          </Flex>
          {showBox && ReplyInput}
          {ReplyComment}
        </Stack>
      </Flex>
    </>
  );
}

export default ReplyItem;
