import React, { useEffect, useState, Fragment } from 'react';
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

import { GetProduct, GetProducts } from '../api/ProductAPI'
import ProductCard from '../components/Cards/ProductCard'

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

  const numberCards = 4;

  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);

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

      var res = await GetProducts();

      if (!res.isAxiosError) {
        var productRes = res;

        if (productRes.length > numberCards) {
          productRes = productRes.slice(0, numberCards)
        }

        if (productRes.length < numberCards) {
          for (let i = productRes.length; i < numberCards; i++) {
            productRes.push(productRes[productRes.length - 1])
          }
        }

        setProducts(productRes)
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
            <Grid item xs={8} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {product?.productName}
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  {product?.description}
                </Typography>

                <Typography mt={2} variant="h5" color="textPrimary">
                  Género
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {product?.genre}
                </Typography>

                <Typography mt={2} variant="h5" color="textPrimary">
                  Artistas
                </Typography>
                {product?.artistName?.map(artist => (
                  <Typography key={artist} variant="h6" color="textSecondary">
                    {artist}
                  </Typography>
                ))}

                <Typography mt={2} variant="h5" color="textPrimary">
                  Formatos
                </Typography>
                {product?.formats?.map(format => (
                  <Typography key={format} variant="h6" color="textSecondary">
                    {format}
                  </Typography>
                ))}
              </Grid>
              <Grid item>
                <DialogShoppingCart idProduct={product.idProduct}></DialogShoppingCart>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">${product?.price} MXN</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <img alt="SummerSale" src="/recommended.png" width='100%' />

      <Grid container spacing={0.5} >
        {products.map((product, index) => (
          <Fragment key={index}>
            <Grid item xs={3} p={0}>
              <ProductCard product={product} />
            </Grid>
          </Fragment>
        ))}
      </Grid>

      <Footer />
    </div>
  );
}
