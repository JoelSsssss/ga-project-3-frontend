import { TextareaAutosize, Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../lib/api';
import ProductRating from './common/ProductRating';
import '../styles/LoginAndRegister.scss';

export default function ReviewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [textValue, setTextValue] = useState('');
  const [rating, setRating] = useState(0);
  const [nameValue, setNameValue] = useState('');

  const handleTextChange = (e) => setTextValue(e.target.value);

  const handleNameChange = (e) => setNameValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(
      API.ENDPOINTS.createReview(id),
      { productName: nameValue, text: textValue, rating: rating },
      API.getHeaders()
    )
      .then(({ data }) => {
        // console.log({ data });
        navigate(`/products/${id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className='LoginRegister'>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 4,
              mb: 2
            }}
          >
            <TextareaAutosize
              name='name'
              value={nameValue}
              placeholder='Product you are Reviewing'
              label='Name'
              type='textarea'
              onChange={handleNameChange}
              minRows={1}
              style={{ width: 500 }}
            />
            <TextareaAutosize
              name='text'
              value={textValue}
              placeholder='Leave a Review'
              label='Review'
              type='textarea'
              onChange={handleTextChange}
              minRows={10}
              style={{ width: 500 }}
            />
          </Box>
          <Box>
            <ProductRating rating={rating} setRating={setRating} />{' '}
          </Box>
          <Button type='Submit'>Send your review!</Button>
        </form>
      </Container>
    </section>
  );
}
