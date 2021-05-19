import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import HeaderAdmin from '../components/HeaderAdmin'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ProductRow from './rows/ProductRow';

import {GetWithGenre} from '../api/ProductAPI'

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function EditProduct() {
  const classes = useStyles();
  
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const productRes = await GetWithGenre();
      setProducts(productRes)
    }

    fetchData();
  }, []);

  return (
      <React.Fragment>
  <HeaderAdmin/>
  <br/>
  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
         EDITAR
        </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{color:"white"}}>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
            <StyledTableCell align="right">Descripción</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Género</StyledTableCell>
            <StyledTableCell align="right">IdGenero</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Eliminar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product,index) => (
            <StyledTableRow key={index}>
              <ProductRow product = {product}></ProductRow>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}