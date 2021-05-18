import React from 'react';
import ArtistLists from '../components/ArtistLists'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HeaderAdmin from '../components/HeaderAdmin';
import GenreLists from '../components/GenreLists';
import FormatLists from '../components/FormatList';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
   
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateFormat() {
  const classes = useStyles();

  return (
    <React.Fragment>
          <HeaderAdmin/>
          <Typography component="h1" variant="h5" style={{marginTop:"3%"}}>
          Nuevo Formato
        </Typography>
    <Container component="main" >
       
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Type"
            label="Nombre del Formato"
            name="nombreFormato"
            autoComplete="Nombre"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="TypeCode"
            label="Abreviación"
            name="abreviacion"
            autoFocus
          />
          
        
        <br/>
        <br/>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
           Agregar
          </Button>

          </form>
        
        
      </div>
      
    </Container>
   </React.Fragment>
  );
}