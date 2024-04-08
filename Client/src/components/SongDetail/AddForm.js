import { GlobalContext } from '@/Provider';
import useToken from '@/authorization/useToken';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useContext, useState } from 'react';

function AddSongAndPlaylist({ isOpen, onClose, songId, userId, setReload }) {
  const { BACK_END_PORT } = useContext(GlobalContext);
  const toast = useToast();
  const token = useToken()

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
    name: '',
    songid: songId,
  });

  const addNewPlaylistandAndSong = () => {
    axios
      .post(`${BACK_END_PORT}/api/v1/playlist/user/${userId}/newadd`, formData)
      .then((response) => {
        if (response.data === 'Playlist is created successfully') {
          showSuccessToast("Collection is created successfully")
          setFormData({ ...formData, name: '' });
          setReload(true);
          setTimeout(() => {
            setTimeout(false);
          }, 500);
          onClose();
        }
      })
      .catch((error) => {
        showFailedToast("Collection name has been used!")
      });
  };

  return ( 
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Collection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder='Enter name'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost' onClick={addNewPlaylistandAndSong}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSongAndPlaylist;
