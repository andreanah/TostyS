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

export default function CreateArtist() {
  const classes = useStyles();

  return (
    <React.Fragment>
          <HeaderAdmin/>
          <Typography component="h1" variant="h5" style={{marginTop:"3%"}}>
          Nuevo Artista
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
            id="Nombre"
            label="Nombre del Artista"
            name="nombreArtista"
            autoComplete="Nombre"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Nombre"
            label="Nombre Artistico"
            name="nombreArtistico"
            autoComplete="Nombre"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            multiline="true"
            required
            fullWidth
            name="Descripción"
            label="Descripción"
            type="descripcion"
            id="Descripcion"
            autoComplete="Descripción"
          />
          <FormControlLabel
            control={<Checkbox value="active" color="primary" />}
            label="Activo" style={{fontSize:"25"}}
          />
         
        
        <br/>
        <Typography component="h3" variant="h5">
          Selecciona una foto para el artista
        </Typography>
        <input type="file"></input>
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