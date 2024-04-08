import React, { useContext, useEffect, useState } from 'react';
import { Box, Icon, HStack } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { SongContext } from '@/Pages/SongDetails';
import axios from 'axios';
import { GlobalContext } from '@/Provider';

const Rating = ({ maxRating, handleRating }) => {
  const [rating, setRating] = useState();
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleRatingClick = (selectedRating) => {
    if (selectedRating === hoveredRating) {
      setHoveredRating(null);
    } else {
      setHoveredRating(selectedRating);
    }
    setRating(selectedRating);
    handleRating(selectedRating);
  };

  const { information, setReload } = useContext(SongContext);
  const { BACK_END_PORT } = useContext(GlobalContext);

  const getRating = async () => {
    axios
      .get(
        `${BACK_END_PORT}/api/v1/song/rate/user?userid=${information.userId}&songid=${information.songId}`,
      )
      .then((response) => {
        setHoveredRating(response.data?.star);
        setRating(response.data?.star);
        setReload(true);
        setTimeout(() => {
          setReload(false);
        }, 500);
      })
      .catch((error) => {
        alert('Can not rate', error);
      });
  };

  useEffect(() => {
    if (information.userId)
    getRating();
  }, []);

  return (
    <HStack spacing={2}>
      {[...Array(maxRating).keys()].map((index) => (
        <Icon
          key={index}
          as={FaStar}
          boxSize={10}
          cursor='pointer'
          color={
            hoveredRating !== null
              ? index <= hoveredRating - 1
                ? 'yellow.500'
                : 'gray.300'
              : index < rating
              ? 'yellow.500'
              : 'gray.300'
          }
          onClick={() => handleRatingClick(index + 1)}
          onMouseEnter={() => setHoveredRating(index + 1)}
          onMouseLeave={() => setHoveredRating(null)}
        />
      ))}
    </HStack>
  );
};

export default Rating;
