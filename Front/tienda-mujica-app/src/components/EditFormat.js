import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Modal
} from '@material-ui/core/';
import { useAlert } from 'react-alert'

import HeaderAdmin from '../components/HeaderAdmin'

import { GetAll, Create, Update } from '../api/FormatAPI'

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
  const [modalStyle] = useState(getModalStyle);
  var alert = useAlert();

  const [formats, setFormats] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [format, setFormat] = useState([{
    Id: 0,
    Type: "",
    TypeCode: "",
    Active: true,
  }]);

  const handleOpenUpdate = (format) => {
    var auxFormat = {
      Id: format.id,
      Type: format.type,
      TypeCode: format.typeCode,
      Active: format.active,
    }
    setFormat(auxFormat)
    setIsUpdate(true);
    setOpen(true);
  };

  const handleOpenCreate = (format) => {
    var auxFormat = {
      Id: 0,
      Type: "",
      TypeCode: "",
      Active: true,
    }
    setFormat(auxFormat)
    setIsUpdate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormat({
      ...format,
      [name]: value
    })
    console.log(name, value);
  }

  const formatSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      var response = await Update(format);
      if (!response.isAxiosError) {
        alert.success("Se editó correctamente");
        window.location.reload(false);
      }
      else {
        let resAlert = "No se pudo editar";
        alert.error(resAlert)
      }
    } else {
      var response = await Create(format);
      if (!response.isAxiosError) {
        alert.success("Se creo correctamente");
        window.location.reload(false);
      }
      else {
        let resAlert = "No se pudo crear";
        alert.error(resAlert)
      }
    }

  }

  useEffect(() => {

    async function fetchData() {
      var res = await GetAll();
      if (!res.isAxiosError) {
        var formatRes = res;
        setFormats(formatRes)
      }
    }

    fetchData();
  }, []);

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">{isUpdate ? "Editar" : "Crear"}</Typography>
      <form onSubmit={formatSubmit}>
        <TextField
          name="Type"
          label="Tipo"
          variant="outlined"
          fullWidth
          className={classes.marginForm}
          required
          inputProps={{ maxLength: 15 }}
          value={format.Type}
          onChange={handleChange}
        />
        <TextField
          name="TypeCode"
          label="Codigo"
          variant="outlined"
          fullWidth
          className={classes.marginForm}
          required
          inputProps={{ maxLength: 3 }}
          value={format.TypeCode}
          onChange={handleChange}
        />
        <br />
        <Button type="submit" color="primary" variant="contained" className={classes.marginForm}>Submit</Button>
      </form>
    </div>
  )

  return (
    <React.Fragment>
      <HeaderAdmin />
      <br />
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        ADMINISTAR FORMATOS
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
                <FormatRow format={format} handleOpenUpdate={handleOpenUpdate}></FormatRow>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleOpenCreate}>Crear</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {bodyModal}
      </Modal>
    </React.Fragment>
  );
}