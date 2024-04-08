import { Card, CardBody, CardHeader, Divider, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
function Lyrics({ songDescription, userId, userfullname, ...props }) {
  return (
    <Card {...props}>
      <CardHeader display={'flex'} justifyContent={'space-between'}>
        <Text fontWeight={'700'} fontSize={'2.5rem'}>
          Lyrics
        </Text>
        <Link to={`/viewdetailsuser/${userId}`}><Text fontWeight={'400'} fontSize={'1.6rem'} textDecoration={'underline'}>
          by{' ' + userfullname}
        </Text></Link>
      </CardHeader>
      <Divider />
      <CardBody fontSize={"1.2rem"}>
        {songDescription?.split('\n')?.map((line, index) => {
          return (
            <Text fontSize={"1.8rem"} key={index} dangerouslySetInnerHTML={{ __html: line }} />
          );
        })}
      </CardBody>
      
    </Card>
  );
}

export default Lyrics;
