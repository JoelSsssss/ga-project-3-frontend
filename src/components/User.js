import { API } from '../lib/api';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import ProfilePicture from './common/ProfilePicture';
import { Button, CardContent, Typography } from '@mui/material';
import ReviewCard from './common/ReviewCard';
import '../styles/Users.scss';

export default function User() {
  const { id } = useParams();
  const { userId } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API.POST(API.ENDPOINTS.singleUser(userId), {}, API.getHeaders())
      .then(({ data }) => {
        setSingleUser(data);
        // console.log({ data });
      })
      .catch(({ message, response }) => {
        console.log(message, response);
      });
    setIsUpdated(false);
  }, [userId, isUpdated]);

  if (singleUser === null) {
    return <p>Loading User</p>;
  }
  // console.log({ singleUser });

  const goBackToProducts = () => navigate('/products');

  return (
    <section className='Users'>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', flexDirection: 'column' }}
        mt={5}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mt: 5
          }}
        >
          <Box sx={{ pl: 3 }}>
            {singleUser?.user.cloudinaryImageId && (
              <ProfilePicture imageId={singleUser?.user.cloudinaryImageId} />
            )}
          </Box>

          <Typography variant='h5' color='text.secondary' sx={{ pr: 3 }}>
            {singleUser?.user.username}
          </Typography>
        </Box>
        <CardContent>
          {singleUser?.user.reviews && (
            <Box>
              {singleUser?.user.reviews.map((review) => (
                <Typography>
                  {review.productId}
                  <ReviewCard
                    key={review._id}
                    text={review.text}
                    reviewer={review.reviewer}
                    productId={id}
                    reviewId={review._id}
                    rating={review.rating}
                    setIsUpdated={setIsUpdated}
                    productName={review.productName}
                  />
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
        <Button onClick={goBackToProducts}>Back to Browsing!</Button>
      </Container>
    </section>
  );
}
