import React from 'react';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function EditFormat() {
  const classes = useStyles();
  
  return (
      <React.Fragment>
  <HeaderAdmin/>
  <br/>
  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
         EDITAR FORMATO
        </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead style={{color:"white"}}>
          <TableRow>
            <StyledTableCell>Abreviación</StyledTableCell>
            <StyledTableCell align="right">TIPO DE FORMATO</StyledTableCell>
            
            <StyledTableCell align="right">Editar</StyledTableCell>
            <StyledTableCell align="right">Eliminar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              
             
              <StyledTableCell align="right"> <Button variant="contained" color="secondary" >
                   Editar
                  </Button></StyledTableCell>
              <StyledTableCell align="right"> <Button variant="contained" color="secondary">
                   Eliminar
                  </Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}