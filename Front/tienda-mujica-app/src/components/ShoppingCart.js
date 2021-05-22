import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CssBaseline,
  Modal,
  InputLabel,
  NativeSelect,
  FormControl
} from '@material-ui/core/'

import Header from './Header';
import ShoppingCartCard from '../components/Cards/ShoppingCartCard'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { GetShoppingCartUser, Identity } from '../api/UserAPI';
import { ShoppingCartToOrder } from '../api/ShoppingCartAPI'
import { GetAllOfUser as GetAllOfUserCreditCard } from '../api/CreditCardAPI'
import { GetAllOfUser as GetAllOfUserAddress } from '../api/AddressAPI'


import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

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
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 25,
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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ShoppingCart() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  var alert = useAlert();

  const [productsCart, setProductsCart] = useState([])
  const [address, setAddress] = useState([])
  const [creditCards, setCreditCards] = useState([])

  const [open, setOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [order, setOrder] = useState({
    IdCreditCard: 0,
    IdUser: "",
    IdAddress: 0,
  })

  useEffect(() => {
    async function fetchData() {
      var response = await Identity();
      if (response.isAxiosError) {
        return;
      }
      var id = response[0].id;

      var res = await GetShoppingCartUser(id)
      if (!res.isAxiosError) {
        setProductsCart(res);
        var totalR = 0
        res.shoppingCart.map(product=>{
          totalR += product.quantity * product.product.price;
        })
        setTotal(totalR)
      }

      res = await GetAllOfUserCreditCard(id)
      if (!res.isAxiosError) {
        setCreditCards(res);
      }

      res = await GetAllOfUserAddress(id)
      if (!res.isAxiosError) {
        setAddress(res);
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
    setOrder({
      ...order,
      [name]: value
    })
    console.log(name, value);
  }

  const submitOrder = async (e) => {
    e.preventDefault();
    var idUser = ""
    var resIdUser = await Identity();
    if (!resIdUser?.isAxiosError) {
      idUser = resIdUser[0].id;
    }

    var newOrder = {
      ...order,
      IdUser: idUser
    }

    var res = await ShoppingCartToOrder(newOrder)
    if (!res.isAxiosError) {
      alert.success("Se creo correctamente la orden")
      window.location.reload(false)
    } else {
      alert.error("No se pudo crear la orden")
    }
  }

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">Crear orden</Typography>
      <form onSubmit={submitOrder}>
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          <InputLabel htmlFor="IdAddress">Dirección</InputLabel>
          <NativeSelect
            value={order.IdAddress}
            onChange={handleChange}
            inputProps={{
              name: "IdAddress",
              id: 'IdAddress',
              required: true,
            }}
          >
            <option aria-label="None" value="" />
            {address.map((addressItem, index) => (
              <Fragment key={index}>
                <option value={addressItem?.id}>{addressItem?.street}</option>
              </Fragment>
            ))}
          </NativeSelect>
        </FormControl>
        <br />
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          <InputLabel htmlFor="IdCreditCard">Tarjeta de Crédito</InputLabel>
          <NativeSelect
            value={order.IdCreditCard}
            onChange={handleChange}
            inputProps={{
              name: "IdCreditCard",
              id: 'IdCreditCard',
              required: true,
            }}
          >
            <option aria-label="None" value="" />
            {creditCards.map((creditCard, index) => (
              <Fragment key={index}>
                <option value={creditCard?.id}>{creditCard?.creditCardNumber}</option>
              </Fragment>
            ))}
          </NativeSelect>
        </FormControl>
        <br />
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

        <img src="/carrito.png" my={1}></img>
        <Grid container spacing={2}>
          {productsCart?.shoppingCart?.map((productCart, index) => (
            <Fragment key={index}>
              <Grid item xs={8} style={{ marginLeft: "5%" }}>
                <ShoppingCartCard productCart={productCart} />
              </Grid>
            </Fragment>
          ))}
          <Button onClick={handleOpen}>
            <img src="/btnPagar.png" mt={1}></img>
          </Button>

        </Grid>
          <Typography variant="h4">Precio total: ${total}MXN</Typography>  

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




