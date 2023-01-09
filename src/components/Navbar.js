import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthenticated } from '../hook/useAuthenticated';
import { AUTH } from '../lib/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();

  const logout = () => {
    AUTH.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box sx={{ flexgrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Link to='/'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/products'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Vegan Products
            </Typography>
          </Link>
          <Link to='/brands'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Vegan Brands
            </Typography>
          </Link>
          <Link to='/register'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Register
            </Typography>
          </Link>
          <Link to='/login'>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              sx={{ mr: 2 }}
            >
              Login
            </Typography>
          </Link>
          {isLoggedIn && (
            <>
              <Link to='/' onClick={logout}>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  Logout
                </Typography>
              </Link>
              <Link to='/users'>
                <Typography
                  variant='h6'
                  color='inherit'
                  component='div'
                  sx={{ mr: 2 }}
                >
                  Users
                </Typography>
              </Link>
              {AUTH.getPayload().isAdmin && (
                <Link to='/brands/create'>
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ mr: 2 }}
                  >
                    Create Brand
                  </Typography>
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
