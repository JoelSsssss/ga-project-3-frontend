import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hook/useAuthenticated';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import '../styles/LoginAndRegister.scss';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: false, password: false });
  const [isLoggedIn] = useAuthenticated();

  if (isLoggedIn) {
    navigate('/products');
  }

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        // console.log(data.token);
        AUTH.setToken(data.token);
        navigate('/products');
      })
      .catch((e) => {
        // console.log(e);
        setError({ email: true, password: true });
      });
  };

  const navigateToRegister = () => navigate('/register');

  return (
    <section className='LoginRegister'>
      <Container
        maxWidth='lg'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              size='small'
              name='email'
              id='email'
              type='email'
              label='Email'
              placeholder='Email'
              required={true}
              value={formFields.email}
              onChange={handleChange}
              error={error.email}
              sx={{ mb: 2 }}
            />
          </div>
          <div>
            <TextField
              size='small'
              name='password'
              id='password'
              type='password'
              label='Password'
              placeholder='Password'
              required={true}
              value={formFields.password}
              onChange={handleChange}
              variant='outlined'
              error={error.password}
              sx={{ mb: 2 }}
            />
          </div>
          <Button variant='contained' type='submit'>
            Login
          </Button>
          <Button onClick={navigateToRegister}>
            Not Registered? Register here
          </Button>
        </form>
      </Container>
    </section>
  );
}
