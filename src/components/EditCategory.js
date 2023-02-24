import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { NOTIFY } from '../lib/notifications';

import {
  TextField,
  Container,
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';

import '../styles/ProductIndex.scss';

export default function EditCategory() {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [error, setError] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllCategories)
      .then(({ data }) => setAvailableCategories(data))
      .catch((e) => console.log(e));
  }, [availableCategories]);

  const handleChange = (e) => {
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData;

    API.POST(API.ENDPOINTS.getAllCategories, data, API.getHeaders())
      .then(({ data }) => {
        NOTIFY.SUCCESS(`Created ${data.name}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <Box className='editCategory'>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          pt: 10,
          disply: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography color='text.primary' sx={{ mb: 2 }}>
                Already Available Categories
              </Typography>
              {availableCategories.map((category) => (
                <Card sx={{ mb: 2, backgroundColor: 'rgb(249, 230, 246)' }}>
                  <CardContent className='optionBox'>
                    <Typography variant='h5' component='p' key={category._id}>
                      {category.name}
                    </Typography>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        API.DELETE(
                          API.ENDPOINTS.deleteCategory(category._id),
                          API.getHeaders()
                        )
                          .then(() =>
                            NOTIFY.SUCCESS(`Deleted ${category.name}`)
                          )
                          .catch((e) => console.log(e));
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography color='text.primary' sx={{ mb: 2 }}>
              Add a new Category
            </Typography>
            <Container maxWidth='lg'>
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
                <Button type='submit' variant='outlined'>
                  ADD MY CATEGORY
                </Button>
              </form>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
