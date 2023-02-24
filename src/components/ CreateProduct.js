import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTIFY } from '../lib/notifications';
import { API } from '../lib/api';

import {
  TextField,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';

import '../styles/ProductIndex.scss';

export default function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    brand: ''
  });
  const [error, setError] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => setAvailableBrands(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllCategories)
      .then(({ data }) => setAvailableCategories(data))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data =
      formData.brand && formData.category
        ? formData
        : {
            name: formData.name,
            description: formData.description,
            image: formData.image
          };

    API.POST(API.ENDPOINTS.getAllProducts, data, API.getHeaders())
      .then(({ data }) => {
        NOTIFY.SUCCESS(`Created ${data.name}`);
        navigate(`/products/${data._id}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <section className='createProduct'>
      <Typography
        variant='h4'
        component='p'
        sx={{ textAlign: 'center', pt: '40px' }}
      >
        Create a Product
      </Typography>
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
              value={formData.description}
              onChange={handleChange}
              error={error}
              label='Description'
              name='description'
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
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='brand'>Brand</InputLabel>
              <Select
                size='small'
                labelId='brand'
                value={formData.brand}
                label='Brand'
                name='brand'
                onChange={handleChange}
              >
                {availableBrands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                size='small'
                labelId='category'
                value={formData.category}
                label='category'
                name='category'
                onChange={handleChange}
              >
                {availableCategories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button type='submit'>ADD MY PRODUCT</Button>
        </form>
      </Container>
    </section>
  );
}
