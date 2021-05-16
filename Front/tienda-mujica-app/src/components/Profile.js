import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CardActionArea from '@material-ui/core/CardActionArea';
import Header from '../components/Header';
import Login from '../components/Login'

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
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
     <Header/>
      <main>
        {/* Hero unit */}
        <h1 style={{marginTop:"5%"}}>BIENVENIDO</h1>
        
        <Grid container spacing={2}>
        <Grid item xs={4} style={{marginTop: "3%"}} >
        
        <Card >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/user.png"
                title="Contemplative Reptile"
              />
              <CardContent>
                <img src="/user.png" style={{width:'40%', height:'40%'}}></img>
                <Typography gutterBottom variant="h5" component="h2">
                  Nombre
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
                  <Button variant="contained" color="secondary" style={{marginLeft:"10%"}}>
                   Editar
                  </Button>
                  <Button variant="contained" color="secondary" style={{marginLeft:"50%"}} href="/Login">
                   Cerrar Sesión
                  </Button>
            </CardActions>
          
        </Card>
     
     </Grid>   
     
        <Grid item xs={8} style={{marginTop: "3%"}}>
        <div className={classes.heroContent} style={{backgroundImage: 'url(/Challenger.png)'}}>
          <Container maxWidth="sm">
          <br/><br/><br/><br/><br/><br/><br/><br/>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center" style={{marginLeft:"-25%"}}>
                <Grid item>
                  <Button variant="contained" color="secondary">
                   Conseguir mas puntos
                  </Button>
                </Grid>
                
              </Grid>
            </div>
          </Container>
        </div>
        </Grid>
      </Grid>
        
      <img src="/levels.png" style={{marginTop:"3%"}}></img>
      </main>
      {/* Footer */}
      <footer className={classes.footer} style={{backgroundColor:"black",marginTop:"5%"}}>
        <Typography variant="h6" align="center" gutterBottom style={{color:"white"}}>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p" style={{color:"white"}}>
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}