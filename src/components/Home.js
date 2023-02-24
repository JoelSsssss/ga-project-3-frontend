import Logo from '../assets/Logo.png';
import ProfilePicture from '../assets/profile.png';
import VeganFood from '../assets/veganImage.jpeg';
import '../styles/Home.scss';
import ProductCard from '../components/common/ProductCard';
import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid
} from '@mui/material';
import ProductRating from './common/ProductRating';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState('');
  const [randomProduct, setRandomProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllProducts)
      .then(({ data }) => {
        setProducts(data);
        setRandomProduct(Math.floor(Math.random() * data.length));
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  const exampleReviews = [
    {
      username: 'Sophie1',
      text: 'This was amazing, the texture was good and it was as morish as the real thing',
      productName: 'Quorn nuggets'
    },
    {
      username: 'Dan Grish',
      text: 'Loved this alternative meat! It had the same cook time and even a nice smell to go with it',
      productName: 'No Bacon Baquorn'
    }
  ];

  const navigateToBrowse = () => navigate('/products');

  return (
    <section className='Home'>
      <Grid>
        <Grid item l={3} sm={6} md={4}>
          <div className='banner'>
            <img src={Logo} alt='Tazty alternativez logo' />
            <div className='bannerText'>
              <h1>Find your tazty alternative now!</h1>
              <p>
                Mylks, cheezes, meatz & more - find the highest rated ones and
                help others find tazty products with your reviews!
              </p>
              <Button onClick={navigateToBrowse}>Browse Products</Button>
            </div>
            <img
              src={VeganFood}
              alt='Example of vegan food'
              className='veganImage'
            />
          </div>
        </Grid>
      </Grid>
      <div className='productsAndReviews'>
        <div className='ProductCard'>
          <ProductCard
            name={products[randomProduct]?.name}
            image={products[randomProduct]?.image}
            brand={products[randomProduct]?.brand?.name}
            category={products[randomProduct]?.category.name}
            id={products[randomProduct]?._id}
            rating={products[randomProduct]?.rating || 0}
          />
        </div>{' '}
        <div className='ReviewCard'>
          {exampleReviews.map((review) => (
            <Card sx={{ minWidth: 305, mb: 2 }} key={review.username}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ alignSelf: 'flex-end' }}>
                    <img
                      src={ProfilePicture}
                      alt='Example user ProfilePicute'
                      className='exampleProfilePicture'
                    />
                  </Box>
                  <Box sx={{ alignSelf: 'flex-start' }}>
                    <Typography variant='h5' color='text.secondary'>
                      {review.username}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                />
                <Typography variant='h6' component='div'>
                  Product: {review.productName}
                </Typography>
                <Typography variant='h6' component='div'>
                  {review.text}
                </Typography>
                <ProductRating rating={5} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
