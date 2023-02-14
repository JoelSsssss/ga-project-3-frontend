import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../lib/api';

import { TextField, Stack, Autocomplete } from '@mui/material';

export default function Search() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllProducts)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, []);

  useEffect(() => {
    API.GET(API.ENDPOINTS.search(query)).then(({ data }) => {
      if (query) {
        setFilteredProducts(data);
      }
    });
  }, [query]);

  return (
    <Stack spacing={2} sx={{ width: 600 }}>
      <Autocomplete
        options={query ? filteredProducts : products}
        getOptionLabel={(product) => product.name}
        onChange={(event, newValue) => {
          navigate(`/products/${newValue.id}`);
        }}
        // Don't use build in matching logic, as it just filters through product names, but we use API query to manually control autocomplete list
        filterOptions={(product) => product}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              console.log('User is Typing', e.target.value);
              if (e.target.value !== '') {
                setQuery(e.target.value);
              } else {
                setFilteredProducts([]);
              }
            }}
            label='Search for product name or description'
          />
        )}
      />
    </Stack>
  );
}
