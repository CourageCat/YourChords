import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Image,
} from '@chakra-ui/react';

function Chord({ songData, ...props }) {
  return (
    <Card w={'32%'} {...props}>
      <CardHeader>
        <Text fontWeight={'700'} fontSize={'1.8rem'}>
          Chords List
        </Text>
      </CardHeader>
      <Divider />
      <CardBody>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList fontSize={'1.5rem'}>
            <Tab fontSize={'1.5rem'}>Guitar</Tab>
            <Tab fontSize={'1.5rem'}>Ukulele</Tab>
            <Tab fontSize={'1.5rem'}>Piano</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex flexWrap={'wrap'}>
                {songData?.chords
                  ?.filter((item) => item?.type === 'Guitar')
                  ?.map((item) => (
                    <Stack
                      alignItems={'center'}
                      justifyContent={'flex-start'}
                      mb={3}
                    >
                      <Box>
                        <Image src={item?.image} />
                      </Box>
                      <Box>
                        <Text fontWeight={'500'} fontSize={'2.5rem'}>
                          {item?.chordName}
                        </Text>
                      </Box>
                    </Stack>
                  ))}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexWrap={'wrap'}>
                {songData?.chords
                  ?.filter((item) => item?.type === 'Ukulele')
                  ?.map((item) => (
                    <Stack alignItems={'center'} justifyContent={'flex-start'}>
                      <Box>
                        <Image src={item?.image} />
                      </Box>
                      <Box>
                        <Text fontWeight={'500'} fontSize={'2.5rem'}>
                          {item?.chordName}
                        </Text>
                      </Box>
                    </Stack>
                  ))}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexWrap={'wrap'}>
                {songData?.chords
                  ?.filter((item) => item?.type === 'Piano')
                  ?.map((item) => (
                    <Stack alignItems={'center'} justifyContent={'flex-start'}>
                      <Box>
                        <Image src={item?.image} />
                      </Box>
                      <Box>
                        <Text fontWeight={'500'} fontSize={'2.5rem'}>
                          {item?.chordName}
                        </Text>
                      </Box>
                    </Stack>
                  ))}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default Chord;
