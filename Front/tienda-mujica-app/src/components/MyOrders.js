import React, { useEffect, useState, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from './Header';
import Footer from './BottomNav';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import { shadows } from '@material-ui/system';
import ProductCard from '../components/Cards/ProductCard'

import { useAlert } from 'react-alert'

import { Identity } from '../api/UserAPI';
import { GetProducts } from '../api/ProductAPI'

import { GetOrderOrderProducts, OrderConfirm } from '../api/OrderAPI'

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
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      overflowY: 'auto',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[300],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function OrderElements() {
  const numberCards = 4;
  const classes = useStyles();
  const alert = useAlert();
  const [products, setProducts] = useState([])
  const [orderOrderProducts, setOrderOrderProducts] = useState()

  useEffect(() => {
    async function fetchData() {
      var response = await Identity();
      if (response.isAxiosError) {
        return;
      }
      var id = response[0].id;

      var response = await GetOrderOrderProducts(id);
      if (!response.isAxiosError) {
        setOrderOrderProducts(response)
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

  const ConfirmOrder = async (id) => {
    var res = await OrderConfirm(id);
    if (!res.isAxiosError) {
      alert.success("Se confirmo la orden");
      window.location.reload(false);
    } else {
      alert.error("No se pudo confirmar la orden")
    }
  }

  const CardsOrder = (OOP) => (
    <Card>
      <CardHeader
        title={OOP?.title}
        subheader={OOP?.subheader}
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
        className={classes.cardHeader}
      />
      <CardContent>
        <ul>
          <Grid container my={2} xs={12}>
            <Grid item xs={5}>
              <Typography variant="h5">
                Producto
            </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h5">
                Cantidad
            </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">
                P. unitario
            </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h5">
                Precio
            </Typography>
            </Grid>
          </Grid>
          {OOP?.orderProducts?.map((OP, index) => (
            <Grid key={index} mb={2} container style={{ width: '100%' }}>
              <Grid item xs={1}>
                <img src={OP.product.urlImage} style={{ width: "100%" }} />
              </Grid>
              <Grid item xs={4}>
                <Typography align="left" variant="h4">
                  {OP.product.name}
                </Typography>
                <Typography align="left" variant="h5">
                  {OP.format.type}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography align="center" variant="h5">
                  {OP.orderProduct.quantity}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="center" variant="h5">
                  ${OP.orderProduct.unitPrice}MXN
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align="center" variant="h5">
                  ${OP.orderProduct.totalPrice}MXN
                </Typography>
              </Grid>
            </Grid>
          ))}
          <div className={classes.cardPricing}>
            <Grid container>
              <Grid item xs={12}>
                <Typography align="right" component="h4" variant="h4" color="textPrimary">
                  Total: ${OOP?.order.total}MXN
              </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="right" component="h6" variant="h6" color="textPrimary">
                  {OOP?.address.street}, {OOP?.address.suburb}, {OOP?.address.cp}, {OOP?.address.city}, {OOP?.address.state}, {OOP?.address.country}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </ul>
      </CardContent>
      <CardActions>
        <Button fullWidth disabled={(OOP?.order?.status === "Finalizado") ? true : false} onClick={() => ConfirmOrder(OOP?.order?.id)} variant={(OOP?.order?.status === "Finalizado") ? "outlined" : "contained"} color="primary">
          {OOP?.order?.status}
        </Button>
      </CardActions>
    </Card>
  )

  return (
    <React.Fragment>
      <CssBaseline />

      <Header />
      <img alt="HeaderImage" src="/banner.png" width='100%' />
      {/* End hero unit */}
      <Container maxWidth="md" my={5} component="main">
        <Typography variant="h2" my={5}>
          Mis ordenes
        </Typography>
        <Grid container spacing={5} alignItems="flex-end">
          {orderOrderProducts?.map((orderOrderProduct) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={orderOrderProducts.title} xs={12} sm={orderOrderProducts.title === 'Enterprise' ? 12 : 6} md={12}>
              {CardsOrder(orderOrderProduct)}
            </Grid>
          ))}
        </Grid>
      </Container>
      <img alt="HeaderImage" src="/recommendedforyou.png" width='100%' />

      <Grid my={3} container spacing={5} alignItems="flex-">
        {products.map((product, index) => (
          <Fragment key={index}>
            <Grid item xs={3} p={0}>
              <ProductCard product={product} />
            </Grid>
          </Fragment>
        ))}
      </Grid>

      <Footer />

    </React.Fragment>
  );
}