import { GlobalContext } from '@/Provider';
import { SongContext } from '@/Pages/SongDetails';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

export default function ViewReport({ isOpen, onClose }) {
  const { information } = useContext(SongContext);
  const { BACK_END_PORT } = useContext(GlobalContext);
  const [listReport, setListReport] = useState([]);
  const getListReport = () => {
    axios
      .get(`${BACK_END_PORT}/api/v1/report/song/${information?.songId}`)
      .then((response) => {
        setListReport(response.data);
      })
      .catch((error) => {
        alert('Cant send report', error.message);
      });
  };

  const RowTableHTML =
    listReport &&
    listReport?.map((item, index) => (
      <Tr key={index}>
        <Td>{item?.username}</Td>
        <Td>{item?.content}</Td>
      </Tr>
    ));

  useEffect(() => {
    if (information?.songId) {
      getListReport();
    }
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalBody>
          {listReport && listReport?.length ? (
            <TableContainer>
              <Table variant='simple'>
                <TableCaption>User's Report For This Song</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Username</Th>
                    <Th>Content</Th>
                  </Tr>
                </Thead>
                <Tbody>{RowTableHTML}</Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Box h={'120px'} textAlign={'center'}>
              <Text fontWeight={'600'} mt={'60px'}>
                No have report for this song
              </Text>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
