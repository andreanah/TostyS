import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from '@material-ui/core/';

import HeaderAdmin from '../components/HeaderAdmin'

import { GetAll } from '../api/FormatAPI'

import FormatRow from './rows/FormatRow';

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
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

export default function EditFormat() {
  const classes = useStyles();
  const [formats, setFormats] = useState([]);

  useEffect(() => {

    async function fetchData() {
      var res = await GetAll();
      if(!res.isAxiosError)
      {
        var formatRes = res;
        setFormats(formatRes)
      }
    }

    fetchData();
  }, []);

  const Modal = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  )

  return (
    <React.Fragment>
      <HeaderAdmin />
      <br />
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        EDITAR FORMATO
        </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ color: "white" }}>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="center">ABREVIACIÓN</StyledTableCell>
              <StyledTableCell align="center">TIPO DE FORMATO</StyledTableCell>
              <StyledTableCell align="center">Editar</StyledTableCell>
              <StyledTableCell align="center">Eliminar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formats?.map((format, index) => (
              <StyledTableRow key={index}>
                <FormatRow format={format}></FormatRow>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}