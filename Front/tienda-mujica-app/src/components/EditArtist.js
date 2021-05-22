import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
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

import { GetAll, Create, Update } from '../api/ArtistAPI'

import ArtistRow from './rows/ArtistRow';

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
  marginForm: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
    '& .MuiFormControl-root':{
      marginTop: theme.spacing(2),
    },
    '& .MuiButton-root':{
      marginTop: theme.spacing(2),
    },
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

export default function EditArtist() {
  const classes = useStyles();
  const theme = useTheme();

  const [modalStyle] = useState(getModalStyle);
  var alert = useAlert();

  const [artists, setArtists] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [artist, setArtist] = useState([{
    Id: 0,
    StageName: "",
    RealName: "",
    Description: "",
    Active: true,
  }]);

  const handleOpenUpdate = (artist) => {
    var auxArtist = {
      Id: artist.id,
      StageName: artist.stageName,
      RealName: artist.realName,
      Description: artist.description,
      Active: artist.active,
    }
    setArtist(auxArtist)
    setIsUpdate(true);
    setOpen(true);
  };

  const handleOpenCreate = (artist) => {
    var auxArtist = {
      Id: 0,
      StageName: "",
      RealName: "",
      Description: "",
      Active: true,
    }
    setArtist(auxArtist)
    setIsUpdate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist({
      ...artist,
      [name]: value
    })
    console.log(name, value);
  }

  const formatSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      var response = await Update(artist);
      if (!response.isAxiosError) {
        alert.success("Se editó correctamente");
        window.location.reload(false);
      }
      else {
        let resAlert = "No se pudo editar";
        alert.error(resAlert)
      }
    } else {
      var response = await Create(artist);
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
        var artistRes = res;
        setArtists(artistRes)
      }
    }

    fetchData();
  }, []);

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">{isUpdate ? "Editar" : "Crear"}</Typography>
      <form className={classes.marginForm} onSubmit={formatSubmit}>
        <TextField
          name="StageName"
          label="Nombre artístico"
          variant="outlined"
          fullWidth
          required
          inputProps={{ maxLength: 50 ,          
          }}
          value={artist.StageName}
          onChange={handleChange}
        />
        <TextField
          name="RealName"
          label="Nombre real"
          variant="outlined"
          fullWidth
          required
          inputProps={{ maxLength: 50}}
          value={artist.RealName}
          onChange={handleChange}
        />
        <TextField
          name="Description"
          label="Descripción"
          variant="outlined"
          fullWidth
          inputProps={{ maxLength: 50 }}
          required
          value={artist.Description}
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
        ADMINISTRAR ARTISTAS
        </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ color: "white" }}>
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
                <ArtistRow artist={artist} handleOpenUpdate={handleOpenUpdate}></ArtistRow>
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