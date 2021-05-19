import React,{ useState, useEffect} from 'react';
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

import GenreRow from './rows/GenreRow';

import {GetAll} from '../api/GenreAPI'

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

export default function EditArtist() {
  const classes = useStyles();
  
  const [genres, setGenres] = useState([]);

  useEffect(() => {

    async function fetchData() {
      
      var res = await GetAll();
      if(!res?.isAxiosError)
      {
        var genreRes = res;
        setGenres(genreRes)
      }
    }

    fetchData();
  }, []);

  return (
      <React.Fragment>
  <HeaderAdmin/>
  <br/>
  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
         EDITAR GÉNERO
        </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{color:"white"}}>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nombre de Género</StyledTableCell>
            <StyledTableCell>Editar</StyledTableCell>
            <StyledTableCell>Eliminar</StyledTableCell>           
          </TableRow>
        </TableHead>
        <TableBody>
          {genres.length > 0 &&
            genres.map((genre,index) => (
            <StyledTableRow key={index}>
              <GenreRow genre={genre}></GenreRow>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}