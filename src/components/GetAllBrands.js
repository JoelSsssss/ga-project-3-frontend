import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import { Link } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import '../styles/GetAllBrand.scss';

import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';
import { useAuthenticated } from '../hook/useAuthenticated';
import '../styles/App.css';

export default function GetAllBrandsIndex() {
  const [brands, setBrands] = useState(null);
  const [isLoggedIn] = useAuthenticated();

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => {
        setBrands(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <div>
      {!brands ? (
        <p>Loading...</p>
      ) : (
        <div className='brand-container-get-brands'>
          {brands?.map((brand) => (
            <div key={brand._id} className='brand-card'>
              <Link to={`/brands/${brand._id}/products`}>
                <Card sx={{ maxWidth: 345 }}>
                  <div className='brand-container-content'>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        height='140'
                        alt='vegan food iamge'
                        image={brand?.image}
                      />
                      <CardContent>
                        <Button
                          gutterbutton='true'
                          variant='h5'
                          component='div'
                        >
                          {brand?.name}
                        </Button>
                      </CardContent>
                    </CardActionArea>
                    {isLoggedIn ? (
                      <>
                        {AUTH.getPayload().isAdmin && (
                          <button
                            onClick={() => {
                              API.DELETE(
                                API.ENDPOINTS.deleteBrand(brand._id),
                                API.getHeaders()
                              )
                                // .then(() => {
                                //   console.log('deleted successfully');
                                // })
                                .then(() =>
                                  API.GET(API.ENDPOINTS.allBrands)
                                    .then(({ data }) => {
                                      setBrands(data);
                                    })
                                    .catch(({ message, response }) => {
                                      console.error(message, response);
                                    })
                                )
                                .catch((e) => console.log(e));
                            }}
                          >
                            {' '}
                            Delete{' '}
                          </button>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// {
//   /* {brand.products.map((product) => (
// <p>{product}</p> */
// }
// {
//   /* ))} */
// }
