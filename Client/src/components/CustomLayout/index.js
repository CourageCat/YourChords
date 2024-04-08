import {
  Box,
  ChakraProvider,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Header from "../Header";
import Footer from "../Footer";

const CustomLayout = ({ children }) => {
  const { onOpen } = useDisclosure();
  return (
    <ChakraProvider>
      <Box bg={useColorModeValue("gray.100", "gray.900")}>
        <Header onOpen={onOpen} notHaveSidebar={true} />
        <Box ml={{ base: 0, md: 0 }} minH={"40vh"} style={{marginTop:100}}>
          {children}
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
};

export default CustomLayout;
