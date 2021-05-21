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

import { GetAll, Create, Update } from '../api/GenreAPI'

import GenreRow from './rows/GenreRow';

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

export default function EditGenre() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  var alert = useAlert();

  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [genre, setGenre] = useState([{
    Id: 0,
    GenreName: "",
    Active: true,
  }]);

  const handleOpenUpdate = (genre) => {
    var auxGenre = {
      Id: genre.id,
      GenreName: genre.genreName,
      Active: genre.active,
    }
    setGenre(auxGenre)
    setIsUpdate(true);
    setOpen(true);
  };

  const handleOpenCreate = (genre) => {
    var auxGenre = {
      Id: 0,
      GenreName: "",
      Active: true,
    }
    setGenre(auxGenre)
    setIsUpdate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre({
      ...genre,
      [name]: value
    })
    console.log(name, value);
  }

  const formatSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      var response = await Update(genre);
      if (!response.isAxiosError) {
        alert.success("Se editó correctamente");
        window.location.reload(false);
      }
      else {
        let resAlert = "No se pudo editar";
        alert.error(resAlert)
      }
    } else {
      var response = await Create(genre);
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
      if (!res?.isAxiosError) {
        var genreRes = res;
        setGenres(genreRes)
      }
    }

    fetchData();
  }, []);

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">{isUpdate ? "Editar" : "Crear"}</Typography>
      <form onSubmit={formatSubmit}>
        <TextField
          name="GenreName"
          label="Nombre del género"
          variant="outlined"
          fullWidth
          className={classes.marginForm}
          required
          inputProps={{ maxLength: 30 }}
          value={genre.GenreName}
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
        ADMINISTRAR GENEROS
        </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ color: "white" }}>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Nombre de Género</StyledTableCell>
              <StyledTableCell>Editar</StyledTableCell>
              <StyledTableCell>Eliminar</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.length > 0 &&
              genres.map((genre, index) => (
                <StyledTableRow key={index}>
                  <GenreRow genre={genre} handleOpenUpdate={handleOpenUpdate}></GenreRow>
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