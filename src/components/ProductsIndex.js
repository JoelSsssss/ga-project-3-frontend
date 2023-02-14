import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import ProductCard from './common/ProductCard';
import FilterComp from './common/FilterComp';

import { Container, Grid } from '@mui/material';
import '../styles/ProductIndex.scss';

export default function ProductsIndex() {
  const [products, setProducts] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    API.GET(
      API.ENDPOINTS.getFilteredProducts(selectedCategories, selectedBrands)
    )
      .then(({ data }) => {
        // console.log('DATA', data);
        setProducts(data);
      })
      .catch(({ message, response }) => console.error(message, response));
  }, [selectedBrands, selectedCategories]);

  if (products === null) {
    return <p>Loading</p>;
  }

  return (
    <section className='ProductIndex'>
      <Container maxwith='lg' sx={{ display: 'flex', flexDirection: 'column' }}>
        <Container
          maxwith='lg'
          sx={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <FilterComp
                sx={{ width: 100 }}
                onBrandsSelected={(selectedBrandOptions) =>
                  setSelectedBrands(
                    selectedBrandOptions.map((brand) => brand._id)
                  )
                }
                onCategoriesSelected={(selectedCategories) =>
                  setSelectedCategories(
                    selectedCategories.map((category) => category._id)
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item sm={12} md={4} key={product._id}>
                    <ProductCard
                      name={product.name}
                      image={product.image}
                      brand={product?.brand?.name}
                      category={product?.category?.name}
                      id={product._id}
                      rating={product.rating || 0}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </section>
  );
}
