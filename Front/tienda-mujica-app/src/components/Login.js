import React from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Link,
  CssBaseline,
  Avatar,
  Paper,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import SignUp from '../components/SignUp';
import CustomizedDialogs from '../components/dialogSignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  }, 
  image: {
    backgroundImage: 'url(./BgLogin2.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    marginTop: "20%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    fontSize: 70 ,
    backgroundColor: theme.palette.secondary,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {

  
  const classes = useStyles();

  return (
    <Router>
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5' style={{ marginTop: "5%"}}>
            <strong >Inicia Sesión</strong>
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Correo electrónico'
              name='email'
              autoComplete='email'
              autoFocus
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Recordar contraseña'
            />
            
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              className={classes.submit}
             href='/Header'
            >
              Ingresar
             
            </Button>
            

            <Grid container>
              <Grid item xs>
                <Link href='Header' variant='body2'>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <CustomizedDialogs>
                  <SignUp/>
                </CustomizedDialogs>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </Router>
  );
};

export default Login;
