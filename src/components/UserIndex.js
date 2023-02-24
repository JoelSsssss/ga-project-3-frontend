import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import UserCard from './common/UserCard';
import '../styles/Users.scss';

export default function UserIndex() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    API.GET(API.ENDPOINTS.getAllUsers)
      .then(({ data }) => {
        setUsers(data);
        // console.log(data);
      })
      .catch(({ message, responce }) => {
        console.log(message, responce);
      });
  }, []);

  return (
    <section className='Users'>
      <Container maxWidth='lg'>
        <Grid container spacing={2}>
          {users?.map((user) => (
            <Grid item xs={4} key={user.id}>
              <UserCard
                mt={1}
                name={user.username}
                reviews={user.reviews.length}
                imageId={user.cloudinaryImageId}
                userId={user._id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
