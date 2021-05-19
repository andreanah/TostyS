import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function EditFormat() {
  const classes = useStyles();
  const [formats, setFormats] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const formatRes = await GetAll();
      setFormats(formatRes)
    }

    fetchData();
  }, []);

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
            {formats.map((format, index) => (
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