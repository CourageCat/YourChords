import { CardBody, CardHeader, CardComponent } from '../Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Text, useColorModeValue } from '@chakra-ui/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
);

function AreaChart({ data, title, options, w, mH }) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <CardComponent w={w ? w : '27%'} p='20px'>
      <CardHeader paddingBottom='12px'>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody maxH={mH}>
        <Line data={data} options={options} />
      </CardBody>
    </CardComponent>
  );
}

export default AreaChart;
