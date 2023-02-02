import Filter from './Filter';

import { useState, useEffect } from 'react';

import { API } from '../../lib/api';

import { Box, Button, Typography } from '@mui/material';

export default function FilterComp({ onBrandsSelected, onCategoriesSelected }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => {
        setBrands(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllCategories)
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  if (brands === null) {
    return <p>Brands still Loading</p>;
  }

  if (categories === null) {
    return <p>Categories still Loading</p>;
  }

  return (
    <>
      <Typography variant='h6' mb={2}>
        Filter by
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Filter
          className='marginBottom2'
          pulledOptions={brands}
          labelText='Brand'
          placeholderText='Brand'
          onChange={(event, selectedBrandOptions) => {
            onBrandsSelected(selectedBrandOptions);
          }}
        />
      </Box>
      <Filter
        pulledOptions={categories}
        labelText='Category'
        placeholderText='Category'
        onChange={(event, selectedCategorisOptions) => {
          onCategoriesSelected(selectedCategorisOptions);
        }}
      />
    </>
  );
}
