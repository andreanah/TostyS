import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Container,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Grid,
  Box,
} from '@material-ui/core/';

import ProductCard from "../components/Cards/ProductCard"

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import Header from './Header';
import Footer from './BottomNav';

import { GetAll } from './../api/GenreAPI'
import { GetProductsByGenre, GetProducts } from './../api/ProductAPI'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '20vw',
    flexGrow: 1,

  },
  root3: {
    flexGrow: 1,
  },
  root2: {
    maxWidth: 'flex',
  },
  media: {
    height: 250,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: (theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: (theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function ProductsDisplay() {
  const classes = useStyles();

  const preventDefault = (event) => event.preventDefault();

  let { id } = useParams();

  const [genres, setGenres] = useState([]);
  const [products, setProducts] = useState([]);

  const GetProductsHandle = async (i) => {

    var res = await GetProductsByGenre(i);

    if (!res.isAxiosError) {
      const productRes = res;
      setProducts(productRes)
    }


  }

  useEffect(() => {

    async function fetchData() {
      var resGen = await GetAll(id);

      if (!resGen.isAxiosError) {
        const genreRes = resGen;
        setGenres(genreRes)
      }

      if (id) {
        var res = await GetProductsByGenre(id);

        if (!res.isAxiosError) {
          const productRes = res;
          setProducts(productRes)
        }
      }
      else {
        var res = await GetProducts();

        if (!res.isAxiosError) {
          const productRes = res;
          setProducts(productRes)
        }
      }
    }

    fetchData();
  }, []);

  return (

    <div className={classes.root2} >
      <Header />
      <img alt="HeaderImage" src="/banner.png" width='100%' />
      <div className={classes.root3}>
        <AppBar position="static" color='transparent'>
          <Toolbar>
            {genres.map((genre, index) => (
              <Container key={index}>
                <Typography variant="h6" className={classes.title}>
                  <Link to={`/Products/${genre.id}`} color="inherit" onClick={() => GetProductsHandle(genre.id)}>
                    {genre.genreName}
                  </Link>
                </Typography>
              </Container>
            ))}
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

          </Toolbar>
        </AppBar>
      </div>

      <Box mt={3}>
        <Child products={products} />
      </Box>

      <Footer />
    </div>

  );
}

const Child = ({ products }) => {
  const classes = useStyles();
  return (
    <Grid ml={0} container spacing={3} >
      {products?.map((product, index) => (
        <Grid item xs={3} key={index}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}