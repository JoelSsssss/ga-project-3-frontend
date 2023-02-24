import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API } from '../lib/api';
import { useAuthenticated } from '../hook/useAuthenticated';
import ReviewCard from './common/ReviewCard';
import { AUTH } from '../lib/auth';

import ProductRating from './common/ProductRating';
import {
  Container,
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import '../styles/Product.scss';

export default function Product() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();
  const [isLoggedIn] = useAuthenticated();

  useEffect(() => {
    API.GET(API.ENDPOINTS.getSingleProduct(id))
      .then(({ data }) => {
        setSingleProduct(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  const userHasReviewed = useMemo(() => {
    return singleProduct?.reviews
      .map((review) => review.reviewer._id)
      .some((id) => AUTH.isOwner(id));
  }, [singleProduct]);

  if (singleProduct === null) {
    return <p>Data is Loading</p>;
  }
  const numberOfReviews = singleProduct.reviews.length;
  let isNumberOfReviewsOne = numberOfReviews === 1;

  return (
    <Box className='Product' sx={{ backgroundColor: 'rgb(253, 244, 246)' }}>
      <Container maxWidth='lg' sx={{ display: 'flex' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ objectFit: 'contain' }}>
              <img src={singleProduct.image} alt={singleProduct.name} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' component='p'>
                  {singleProduct.name}
                </Typography>
                {isLoggedIn &&
                  (AUTH.getPayload().isAdmin ||
                    AUTH.isOwner(singleProduct?.review?.reviewer?._id)) && (
                    <Link to={`/products/${id}/edit`}>
                      <ModeEditIcon />
                    </Link>
                  )}
              </Box>
              <Typography color='text.secondary'>
                Brand: {singleProduct?.brand?.name}
              </Typography>
              <Typography color='text.secondary'>
                Category: {singleProduct.category.name}
              </Typography>
              <Typography
                color='text.primary'
                sx={{ fontSize: 18 }}
                gutterBottom
              >
                Decription: {singleProduct.description}
              </Typography>
              <ProductRating rating={singleProduct.rating || 0} />
              <Typography color='text.secondary'>
                {singleProduct.rating || 'no'} avg. Rating{' '}
              </Typography>
              {isNumberOfReviewsOne ? (
                <Typography color='text.secondary'>
                  {numberOfReviews} Rating and Review
                </Typography>
              ) : (
                <Typography color='text.secondary'>
                  {numberOfReviews} Ratings and Reviews
                </Typography>
              )}
              <CardActions>
                {isLoggedIn && !userHasReviewed && (
                  <Link to={`/products/${singleProduct?._id}/reviews`}>
                    <Button size='small'>Create a Review</Button>
                  </Link>
                )}

                {!isLoggedIn && (
                  <Link to={`/login`}>
                    <Button size='small'>Login to create a Review</Button>
                  </Link>
                )}
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
      {!!singleProduct?.reviews.length && (
        <Container maxWidth='lg'>
          <Box>
            {singleProduct?.reviews.map((review) => (
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
            ))}
          </Box>
        </Container>
      )}
    </Box>
  );
}
