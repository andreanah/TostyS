import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Link from '@material-ui/core/Link';
import CarProduct from '../components/CarProduct'
import Button from '@material-ui/core/Button';

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

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  root: {
    Width: 75,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ShoppingCar() {
  const classes = useStyles();
 

  return (

<React.Fragment>
      <CssBaseline />
     <Header/>
      <main>
        {/* Hero unit */}
        
        <img src="/carrito.png" style={{marginTop:"3%", marginBottom:"2%"}}></img>
        <Grid container spacing={2}>
          
        <Grid item xs={7}style={{marginLeft:"5%"}}>
            <CarProduct/>
            <Button>
             <img src="/btnPagar.png" style={{marginTop:"3%"}}></img>
            </Button>
           <br/><br/><br/>
          <img src="/Forfree.png" style={{marginLeft:"-20%"}}></img>
        </Grid>

        <Grid item xs>
        <Card className={classes.root}>
            <CardActions>
            <Button>
             <img src="/btnPagar.png" style={{marginTop:"3%"}}></img>
            </Button>
            </CardActions>
            <CardContent>
              <Typography variant="h3" component="h2" color="black" gutterBottom>
                RESUMEN DE PEDIDO
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                PRODUCTO
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                ENTREGA
              </Typography>
              <Typography  variant="h5" component="h2">
              TOTAL
                <br />
                <Typography className={classes.pos} color="textSecondary">
                IVA INCLUIDO
              </Typography>
                
              </Typography>
            </CardContent>
          </Card>
          <br/>
          <img src="/Help.png" style={{marginLeft:"-20%"}}></img>
        </Grid>
      </Grid>
        
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


   

