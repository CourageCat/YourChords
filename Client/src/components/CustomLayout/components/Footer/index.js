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

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
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
    <Box
      bg={useColorModeValue('#272727', '#272727')}
      color={useColorModeValue('#fff', 'gray.600')}
    >
      <Container as={Stack} maxW={'100%'} py={10}>
        <Flex spacing={8} justifyContent={'space-around'}>
          <Stack align={'flex-start'} w={'8%'}>
            <ListHeader>Product</ListHeader>
            <Box as='a' href={'#'}>
              Overview
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Box as='a' href={'#'}>
                Features
              </Box>
              <Tag
                size={'sm'}
                bg={useColorModeValue('green.300', 'green.800')}
                ml={2}
                color={'white'}
              >
                New
              </Tag>
            </Stack>
            <Box as='a' href={'#'}>
              Tutorials
            </Box>
            <Box as='a' href={'#'}>
              Pricing
            </Box>
            <Box as='a' href={'#'}>
              Releases
            </Box>
          </Stack>
          <Stack align={'flex-start'} w={'8%'}>
            <ListHeader>Company</ListHeader>
            <Box as='a' href={'#'}>
              About Us
            </Box>
            <Box as='a' href={'#'}>
              Press
            </Box>
            <Box as='a' href={'#'}>
              Careers
            </Box>
            <Box as='a' href={'#'}>
              Contact Us
            </Box>
            <Box as='a' href={'#'}>
              Partners
            </Box>
          </Stack>
          <Stack align={'flex-start'} w={'8%'}>
            <ListHeader>Legal</ListHeader>
            <Box as='a' href={'#'}>
              Cookies Policy
            </Box>
            <Box as='a' href={'#'}>
              Privacy Policy
            </Box>
            <Box as='a' href={'#'}>
              Terms of Service
            </Box>
            <Box as='a' href={'#'}>
              Law Enforcement
            </Box>
            <Box as='a' href={'#'}>
              Status
            </Box>
          </Stack>
          <Stack align={'flex-start'} w={'8%'}>
            <ListHeader>Follow Us</ListHeader>
            <Box as='a' href={'#'}>
              Facebook
            </Box>
            <Box as='a' href={'#'}>
              Twitter
            </Box>
            <Box as='a' href={'#'}>
              Dribbble
            </Box>
            <Box as='a' href={'#'}>
              Instagram
            </Box>
            <Box as='a' href={'#'}>
              LinkedIn
            </Box>
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
            <Text>© 2022 Chakra Templates. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
