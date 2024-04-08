import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Image,
  Button,
  IconButton,
} from '@chakra-ui/react';

function TabChordList({ chords, setTabSelected, removeSong, ...props }) {
  return (
    <Tabs variant='soft-rounded' colorScheme='green'>
      <TabList fontSize={'1.5rem'}>
        <Tab onClick={() => setTabSelected("Guitar")} fontSize={'1.5rem'}>Guitar</Tab>
        <Tab onClick={() => setTabSelected("Ukulele")} fontSize={'1.5rem'}>Ukulele</Tab>
        <Tab onClick={() => setTabSelected("Piano")} fontSize={'1.5rem'}>Piano</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex flexWrap={'wrap'}  mt={5} ml={20}>
            {chords
              ?.filter((item) => item?.type === 'Guitar')
              ?.map((item) => (
                <Stack
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  mb={3}
                  w={"30%"}
                >
                  <Box>
                    <Image src={item?.image} h={"320px"} />
                  </Box>
                  <IconButton
                    onClick={() => removeSong(item.id)}
                    bottom={0}
                    left={0}
                    isRound={true}
                    variant='solid'
                    colorScheme='red'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<DeleteIcon />}
                  />
                  <Box>
                    <Text fontWeight={'600'} fontSize={'2rem'}>
                      {item?.chordName}
                    </Text>
                  </Box>

                </Stack>
              ))}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap={'wrap'} justifyContent={'space-between'} mt={5}>
            {chords
              ?.filter((item) => item?.type === 'Ukulele')
              ?.map((item) => (
                <Stack
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  mb={2}
                  w={"30%"}
                >
                  <Box>
                    <Image src={item?.image} h={"240px"} />
                  </Box>
                  <IconButton
                    onClick={() => removeSong(item.id)}
                    bottom={0}
                    left={0}
                    isRound={true}
                    variant='solid'
                    colorScheme='red'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<DeleteIcon />}
                  />
                  <Box>
                    <Text fontWeight={'600'} fontSize={'2rem'}>
                      {item?.chordName}
                    </Text>
                  </Box>
                </Stack>
              ))}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex flexWrap={'wrap'} justifyContent={'space-between'} mt={5}>
            {chords
              ?.filter((item) => item?.type === 'Piano')
              ?.map((item) => (
                <Stack alignItems={'center'} justifyContent={'flex-start'} w={"30%"}>
                  <Box>
                    <Image src={item?.image} h={"160px"} />
                  </Box>
                  <IconButton
                    onClick={() => removeSong(item.id)}
                    bottom={0}
                    left={0}
                    isRound={true}
                    variant='solid'
                    colorScheme='red'
                    aria-label='Done'
                    fontSize='20px'
                    icon={<DeleteIcon />}
                  />
                  <Box>
                    <Text fontWeight={'600'} fontSize={'2rem'}>
                      {item?.chordName}
                    </Text>
                  </Box>
                </Stack>
              ))}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>

  );
}

export default TabChordList;
