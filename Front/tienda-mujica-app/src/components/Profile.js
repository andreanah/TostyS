import React, { useState, Fragment, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardMedia from '@material-ui/core/CardMedia';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Header from '../components/Header';
import Login from '../components/Login'

import {
  Typography,
  Grid,
  Card,
  TextField,
  CardActionArea,
  CardContent,
  CardActions,
  CssBaseline,
  Modal,
  InputLabel,
  NativeSelect,
  FormControl
} from '@material-ui/core/'

import DialogCreditCard from './Dialogs/DialogCreditCard'
import DialogAddress from './Dialogs/DialogAddress'
import { Identity, Update, Disable } from '../api/UserAPI';

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

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  marginForm: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
    '& .MuiFormControl-root':{
      marginTop: theme.spacing(2),
    },
    '& .MuiButton-root':{
      marginTop: theme.spacing(2),
    },
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  profileButtons: {
    height: "100%",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Profile() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState({
    Id: "",
    Name: "",
    Email: "",
    PhoneNumber: "",
    UserName: "",
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {

    async function fetchData() {
      var res = await Identity();
      if (!res.isAxiosError) {
        const newUser = {
          Id: res[0].id,
          Name: res[0].name,
          Email: res[0].email,
          PhoneNumber: res[0].phoneNumber,
          UserName: res[0].userName,
        }
        setUser(newUser)
      }
    }

    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
    console.log(name, value);
  }

  const submitUser = async () => {
    var res = await Update(user);
    if (!res.isAxiosError) {
      const newUser = {
        Id: res.id,
        Name: res.name,
        Email: res.email,
        PhoneNumber: res.phoneNumber,
      }
      setUser(newUser)
    }
  }

  const DisableUser = async()=> {
    if (window.confirm("¿Seguro que quiere eliminar su cuenta?")) {
        var res = await Disable(user.Id)
        if (!res.isAxiosError) {
            localStorage.removeItem("token")
            window.location.reload(false)
        } else {
            alert.error("No se pudo eliminar")
        }
    }
}

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">Editar usuario</Typography>
      <form className ={classes.marginForm} onSubmit={submitUser}>
        <TextField
          name="Name"
          label="Nombre"
          variant="outlined"
          fullWidth
          required
          inputProps={{ maxLength: 50 }}
          value={user.Name}
          onChange={handleChange}
        /><TextField
          name="PhoneNumber"
          label="Teléfono"
          variant="outlined"
          fullWidth
          required
          inputProps={{ maxLength: 10, minLength: 10 }}
          value={user.PhoneNumber}
          onChange={handleChange}
        /><TextField
          name="Email"
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          inputProps={{ maxLength: 64 }}
          value={user.Email}
          onChange={handleChange}
        />
        <Button type="submit" color="primary" variant="contained" className={classes.marginForm}>Submit</Button>
      </form>
    </div>
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {/* Hero unit */}
        <h1 style={{ marginTop: "5%" }}>BIENVENIDO</h1>

        <Grid container spacing={2}>
          <Grid item xs={4} style={{ marginTop: "3%" }} >
            <Card >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/user.png"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <img src="/user.png" style={{ width: '40%', height: '40%' }}></img>
                  <Typography gutterBottom variant="h5" component="h2">
                    {user.UserName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {user.Name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container>
                  <Grid className="profileButtons" item xs={4}>
                    <Button onClick={DisableUser} variant="contained" color="secondary" style={{ marginLeft: "10%" }}>
                      Eliminar
                    </Button>
                  </Grid>
                  <Grid className="profileButtons" item xs={4}>
                    <DialogCreditCard></DialogCreditCard>
                  </Grid>
                  <Grid className="profileButtons" item xs={4}>
                    <DialogAddress></DialogAddress>
                  </Grid>
                  <Grid className="profileButtons" item xs={12}>
                    <Button onClick={handleOpen} variant="contained" color="secondary" style={{ marginLeft: "10%" }}>
                      Editar
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <img src="/levels.png" style={{ marginTop: "3%" }}></img>
      </main>
      {/* Footer */}
      <footer className={classes.footer} style={{ backgroundColor: "black", marginTop: "5%" }}>
        <Typography variant="h6" align="center" gutterBottom style={{ color: "white" }}>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p" style={{ color: "white" }}>
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {bodyModal}
      </Modal>
      {/* End footer */}
    </React.Fragment>
  );
}