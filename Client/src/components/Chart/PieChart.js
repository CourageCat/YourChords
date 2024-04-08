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
  ArcElement,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
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
);


function PieChart({ data, title, options }) {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <CardComponent w='40%' p='20px'>
      <CardHeader>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Pie data={data} options={options} />
      </CardBody>
    </CardComponent>
  );
}

export default PieChart;
