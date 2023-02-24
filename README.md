## Description:

The goal of this project is to create a full stack application. In this application you can look at a list of vegan products and brands from an API. It contains basic features such as adding or deleting products/brands, editing products/brands, registering and logging in.

## Deployment link:

https://ga-project-3-frontend-maxy.netlify.app

## Getting Started/Code Installation:

Install the ‘Project 2’ code
Open the code with live server (In ‘Visual Studio Code’ this can be done by right clicking the ‘index.html’ folder in the ‘EXPLORER’ menu and selecting ‘Open with live server’.
Type in the terminal (make sure you are in the ga-project-3-client ‘npm install’ ‘npm i cloudinary’ ‘npm i @emotion/styled’ ‘npm install @mui/material’ ‘npm i axios’ ‘npm i buffer’ ‘npm i react-router-dom’ ‘npm i sass’ ‘npm i react-toastify’
In the same terminal write ‘npm start’
On a terminal in the backend type ‘npm i mongoose’
Type ‘npm run’

## Timeframe and working team:

This project was done over the course of 1 week and with 3 people in total. I worked on this project with Eleanor and Linh.

## Technologies used:

- Visual Studio Code (Code Editor I used)
- HTML
- JavaScript
- SCSS
- React js
- Mongo db

## Brief:

- Using React js create a full stack application (I need to find the project 3 brief)
- A MERN stack app
- used authentication
- at least two models on the back end
- multiple components on the front end.

## Planning:

We used Trello to plan out our steps. We would discuss what tasks needed to be done and then write them down on Trello. We also created an Excalidraw diagram of what we thought the application would look like.

I was tasked with making everything relating to the brands and making the seed.

1. Created a wireframe
2. We used Trello as a planning tool and a collaboration tool

![image](https://i.imgur.com/7nNx5XR.png)

When not In a Zoom meeting during class time we would discuss ideas over Slack and plan other Zoom meetings.

## Build/Code Process

The first thing we did was create the backend. I made the models folder and the Schemas for the brands. Then I added the controllers for the brands. This was all done with React.js

```javascript
import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model('Brand', brandSchema);
```

I worked on the brands.
In the brand controller, I added multiple functions. For example, I added the ability to create a new brand, get a list of all the brands and delete specific brands. These functions were all tested on Postman.

This was all done using React.js. I used code from a previous project shown in class and modified it to suit the needs of our app.

```javascript
import Brand from '../models/brand.js';
import Product from '../models/product.js';

async function createNewBrand(req, res, next) {
  if (req.currentUser.isAdmin) {
    try {
      const newBrand = await Brand.create(req.body);

      await Product.updateMany(
        { _id: newBrand.products },
        { $push: { brand: newBrand._id } }
      );

      return res.status(201).json(newBrand);
    } catch (e) {
      next(e);
    }
  }
}

async function getAllBrands(_req, res, next) {
  try {
    const brands = await Brand.find();
    return res.status(200).json(brands);
  } catch (e) {
    next(e);
  }
}

async function getAllProductsForBrand(req, res, next) {
  try {
    const brand = await Brand.findById(req.params.id).populate('products');
    return res.status(200).json(brand);
  } catch (e) {
    next(e);
  }
}

async function deleteBrand(req, res, next) {
  if (req.currentUser.isAdmin) {
    try {
      await Brand.findByIdAndDelete(req.params.id);

      const products = await Product.updateMany(
        { brand: req.params.id },
        { $unset: { brand: 1 } }
      );
      console.log({ products });

      return res.status(200).send({ message: 'Successfully delete Brand' });
    } catch (error) {
      next(error);
    }

    return res.status(301).send({ message: 'Error deleting brand' });
  }
}

console.log('Brand.js is here');

export default {
  createNewBrand,
  getAllBrands,
  getAllProductsForBrand,
  deleteBrand
};
```

My next task was to create the seed.
This would help the development process because it would automatically delete then create data for us to use when it is run. This saves a lot of time.

After testing all of the functions on Postman to make sure it works, I worked on the brands page for the frontend part of the application.

The front end allowed users to view products in specific brands but to make new brands or delete existing brands the user would have to be an admin.

First, I made a get all brands component. I used a ‘useEffect’ imported from React, to get all the data about the brands from the backend. I then installed ‘mui/materials’ and used a card preset to display the brands.

```javascript
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
```

An important component was the ability for the admin to create and delete brands. I made the create brand component. I displayed boxes to fill in information about the brand and a submit button. It will then create a brand card by using the same ‘mui/materials’ layout as before.

This ability only shows on the ‘brands’ card if the user is an admin because of the ‘AUTH.getPayload().isAdmin’ check in the ‘GettAllBrands’ component.

```javascript
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
```

After the front end functionality was complete all that was left was styling with SCSS.

When making the styling, it had to be consistent. So, communication was key. We would ask each other what we used for the styling and what colors were used for different parts. For example, the brands list looks similar to the products list. This was mostly done over Zoom. We would send code for specific styling. For example, how large the margins were around product cards was shared so others can have their cards look similar.

![image](https://i.imgur.com/XFPpmEn.png)
![image](https://i.imgur.com/yXjvkjM.png)

Both are white with images and pink-ish background.

## Challenges:

A challenge I faced was implementing categories in the seed.js. The seed file would not delete the categories and make new ones. I wrote the code for seeding the categories the same as the one for seeding the brands. Got it working after communicating the issue with the group and then asking for help from the tutors.

## Win:

In the end, the seed was working really well and it was a big help when it came to saving time.
I was the one who made the seed. I was really proud of the result.

Making the delete brands button was not too difficult however, it needed to only be visible by the admin. After some trial and error, I was able to get it working.

When a brand was deleted, the products page would crash because some products would not display without a brand. This was fixed by not making brands a must have in the code when uploading a product.

There were no Github conflicts because all of our merges were done on our local machines by pulling the work from a development folder on Github.

Using Trello was a great idea. Everyone always knew what they were doing, what everyone else was doing and when specific pieces of work were meant to be done.

## Key learnings:

I would likely not have encountered the problems with the seed if I looked at previous work seeds. I tried to do it myself. I need to look at more reference material next time.

## Bugs:

● When the homepage becomes smaller text overlaps the images.
● You can make products that are not in any brand.

## Future improvements:

● Make the pages adapt to smaller mobile phone screens. The brands list page sometimes has overlapping text on a small screen
