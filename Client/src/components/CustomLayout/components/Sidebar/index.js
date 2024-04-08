import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiTrendingUp,
  FiAward,
  FiShoppingBag,
  FiTwitter,
  FiPackage,
  FiHardDrive,
} from 'react-icons/fi';


let LinkItems = [
  { name: 'Dashboard', icon: FiHome, path: '/manager/dashboard' },
  { name: 'Order', icon: FiTrendingUp, path: '/manager/order' },
  { name: 'Production', icon: FiPackage, path: '/manager/production' },
  { name: 'Bird Cage', icon: FiTwitter, path: '/manager/bird-cage' },
  { name: 'Part', icon: FiHardDrive, path: '/manager/part' },
  { name: 'Customer', icon: FiAward, path: '/manager/customer' },
  { name: 'Proceduce', icon: FiShoppingBag, path: '/manager/proceduce' },
];

const SidebarContent = ({ onClose, ...rest }) => {
  const location = useLocation();
  const path = location.pathname;

  if (path.includes('admin')) {
    LinkItems = [
      { name: 'Account', icon: FiShoppingBag, path: '/admin/account' },
    ];
  }

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          selected={link.path === path}
          to={link.path}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, selected, to, ...rest }) => {
  return (
    <Link to={to}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align='center'
          p='4'
          mx='4'
          borderRadius='lg'
          role='group'
          cursor='pointer'
          bg={selected && 'cyan.400'}
          color={selected && 'white'}
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
          mt={'12px'}
        >
          {icon && (
            <Icon
              mr='4'
              fontSize='16'
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

function SideBar({ onClose, isOpen }) {
  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideBar;
