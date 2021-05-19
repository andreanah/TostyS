import React, { useState, useEffect} from 'react';
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

import ArtistRow from './rows/ArtistRow';

import {GetAll} from '../api/ArtistAPI'

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
  
  const [artists, setArtists] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const artistRes = await GetAll();
      setArtists(artistRes)
    }

    fetchData();
  }, []);

  return (
      <React.Fragment>
  <HeaderAdmin/>
  <br/>
  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
         EDITAR ARTISTAS
        </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{color:"white"}}>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Nombre</StyledTableCell>
            <StyledTableCell align="right">Nombre real</StyledTableCell>
            <StyledTableCell align="right">Descripción</StyledTableCell>
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Eliminar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artists.map((artist, index) => (
            <StyledTableRow key={index}>
              <ArtistRow artist={artist}></ArtistRow>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}