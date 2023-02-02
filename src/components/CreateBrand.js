import { useEffect, useState } from 'react';
import { TextField, Container, Box, Button } from '@mui/material';
import { API } from '../lib/api';
import { useNavigate } from 'react-router-dom';

import '../styles/CreateBrand.scss';

export default function CreateNewBrand() {
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData.brand
      ? formData
      : {
          name: formData.name,
          image: formData.image
        };

    API.POST(API.ENDPOINTS.createBrand, data, API.getHeaders())
      .then(() => navigate('/brands'))
      // .then(() => console.log('hello'))
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <div className='create-brand-item'>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              size='small'
              type='text'
              value={formData.name}
              onChange={handleChange}
              error={error}
              label='Name'
              name='name'
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              size='small'
              type='text'
              value={formData.image}
              onChange={handleChange}
              error={error}
              label='Image'
              name='image'
            />
          </Box>
          <Button type='submit'>Add a brand</Button>
        </form>
      </Container>
    </div>
  );
}
