import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Header from './Header';
import Footer from './BottomNav';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { shadows } from '@material-ui/system';

import { GetProduct } from '../api/ProductAPI'

import {
  useParams
} from "react-router-dom";
import DialogShoppingCart from './Dialogs/DialogShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: '80%',
    height: '80%',
    overflow: 'auto',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  media: {
    height: 140,
  },
}));

export default function ProductShowcase() {
  const classes = useStyles();

  let { id } = useParams();

  const [product, setProduct] = useState([]);

  useEffect(() => {

    async function fetchData() {

      if (id) {
        var res = await GetProduct(id);

        if (!res.isAxiosError) {
          const productRes = res;
          setProduct(productRes[0])
        }
      } else {
        window.location.href = "/MainPage";
      }
    }

    fetchData();
  }, []);

  return (
    <div className={classes.root}  >
      <Header />
      <img alt="HeaderImage" src="/banner.png" width='100%' />
      <Paper className={classes.paper}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={6} >
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={product?.urlImage} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={6} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product?.productName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product?.description}
                </Typography>

                {product?.artistName?.map(artist => (
                  <Typography key={artist} variant="body2" color="textSecondary">
                    {artist}
                  </Typography>
                ))}

                {product?.formats?.map(format => (
                  <Typography key={format} variant="body2" color="textSecondary">
                    {format}
                  </Typography>
                ))}
              </Grid>
              <Grid item>
                <DialogShoppingCart idProduct={product.idProduct}></DialogShoppingCart>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${product?.price} MXN</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <img alt="SummerSale" src="/recommended.png" width='100%' />

      <Grid container spacing={0.5} >
        <Grid item xs>
          <Card className={classes.root}>

            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Agregar al carrito
                        </Button>
            </CardActions>

          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.root}>

            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Agregar al carrito
                        </Button>
            </CardActions>

          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.root}>

            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Agregar al carrito
                        </Button>
            </CardActions>

          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.root}>

            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Agregar al carrito
                        </Button>
            </CardActions>

          </Card>
        </Grid>
        <Grid item xs>
          <Card className={classes.root}>

            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Agregar al carrito
                        </Button>
            </CardActions>

          </Card>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}
