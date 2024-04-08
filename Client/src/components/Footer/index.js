import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Tag,
  chakra,
  VisuallyHidden,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
// Import library
import classNames from "classnames/bind";
import { Link } from "react-router-dom";


// Import component


// Import css
import styles from "./footer.module.scss";

const cx = classNames.bind(styles);

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={22}
      h={22}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box marginLeft={'-5px'}
      bg={useColorModeValue('#272727', '#272727')}
      color={useColorModeValue('#fff', 'gray.600')}
    >
      <Container as={Stack} maxW={'100%'} py={10}>
        <Flex spacing={8} justifyContent={'space-around'}>
          <Stack align={'flex-start'} w={'8%'}>
            <ListHeader>Product</ListHeader>
            <Box color={'white'} as='a' href={'#'}>
              Overview
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Box color={'white'} as='a' href={'#'}>
                Features
              </Box>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}
                background={"#05CB25"}
                padding={"5px"}
                fontSize={'0.875rem'}
                borderRadius={'5px'}
              >
                New
              </Tag>
            </Stack>
            <Box color={'white'} as='a' href={'#'}>
              Tutorials
            </Box>
            <Box color={'white'} as='a' href={'#'}>
              Pricing
            </Box>
            <Box color={'white'} as='a' href={'#'}>
              Releases
            </Box>
          </Stack>
          <Stack align={'flex-start'} style={{gap: 12}} w={'8%'}>
            <ListHeader>Company</ListHeader>
            <Box color={'white'} as='a' href={'#'}>
              Contact Us
            </Box>
            <Box color={'white'} style={{textWrap: 'nowrap'}} as='a' href={'#'}>
              Phone number : 0901020304
            </Box>
            <Box color={'white'} style={{textWrap: 'nowrap'}}  as='a' href={'#'}>
              Address: District 9, TPHCM
            </Box>
            <Box color={'white'} style={{textWrap: 'nowrap'}} as='a' href={'#'}>
              Email: laplanh123@gmail.com
            </Box>
          </Stack>
          <Stack align={'flex-start'} w={'8%'}>
            <ListHeader>About us</ListHeader>
            <Text style={{fontSize: '1.4rem', width: 300}}>Unlock your musical potential at Chords & Beats Hub. Explore top-tier chords and premium beats, ideal for producers of all levels. With a user-friendly interface and a vibrant community, turn your creative vision into reality. Join us today and make history with every note and beat.</Text>
          </Stack>
        </Flex>
      </Container>
      <Box pt={10} pb={2}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
        ></Flex>
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ md: 'space-between' }}
            align={{ md: 'center' }}
          >
            <Text display={'flex'} justifyContent={'center'} textWrap='nowrap' marginLeft={"650px"}>© 2022  YourChords Templates. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton width={"30px"} height={'30px'} label={'Twitter'} href={'#'}>
                <FaTwitter color={'white'} />
              </SocialButton>
              <SocialButton width={"30px"} height={'30px'} label={'YouTube'} href={'#'}>
                <FaYoutube color={'white'} />
              </SocialButton>
              <SocialButton width={"30px"} height={'30px'} label={'Instagram'} href={'#'}>
                <FaInstagram color={'white'} />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
