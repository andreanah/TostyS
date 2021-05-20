import React, { useEffect, useState, Fragment } from 'react';
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
  InputLabel,
  NativeSelect,
  FormControl,
  Modal,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core/';
import { useAlert } from 'react-alert'
import { storage } from '../firebase/index'
import HeaderAdmin from '../components/HeaderAdmin'

import { GetWithGenre, Create, Update, GetProductArtistsFormats, CreateWithArtistFormat, UpdateWithArtistFormat } from '../api/ProductAPI'
import { GetAll as GetAllGenres } from '../api/GenreAPI';
import { GetAll as GetAllFormats } from '../api/FormatAPI';
import { GetAll as GetAllArtists } from '../api/ArtistAPI';

import ProductRow from './rows/ProductRow';

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id, formats, theme) {
  return {
    fontWeight:
      formats.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
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

export default function EditProduct() {
  const classes = useStyles();
  const theme = useTheme();
  const [modalStyle] = useState(getModalStyle);
  var alert = useAlert();

  const [genres, setGenres] = useState([]);
  const [formats, setFormats] = useState([]);
  const [artists, setArtists] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  var [product, setProduct] = useState([{
    Id: 0,
    Name: "",
    Price: 0.0,
    Description: "",
    Active: true,
    IdGenre: 0,
    URLImage: "",
  }]);
  const [image, setImage] = useState(null);

  const [format, setFormat] = useState([]);
  const [artist, setArtist] = useState([]);

  const handleChangeFormat = (event) => {
    setFormat(event.target.value);
  };

  const handleChangeArtist = (event) => {
    setArtist(event.target.value);
  };

  const handleOpenUpdate = async (product) => {
    var auxProduct = {
      Id: product.id,
      Name: product.name,
      Price: product.price,
      Description: product.description,
      Active: product.active,
      IdGenre: product.idGenre,
      URLImage: product.urlImage,
    }
    setProduct(auxProduct)

    const resFA = await GetProductArtistsFormats(product.id);
    if (!resFA?.isAxiosError) {
      var formatArtistRes = resFA;
      if (formatArtistRes.idFormats[0] != null) {
        setFormat(formatArtistRes.idFormats)
      }
      if (formatArtistRes.idArtists[0] != null) {
        setArtist(formatArtistRes.idArtists)
      }
    }

    setIsUpdate(true);
    setOpen(true);
  };

  const handleOpenCreate = (product) => {
    var auxProduct = {
      Id: 0,
      Name: "",
      Price: 0.0,
      Description: "",
      Active: true,
      IdGenre: 0,
      URLImage: "",
    }
    setFormat([]);
    setArtist([]);
    setProduct(auxProduct)
    setIsUpdate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
    console.log(name, value);
  }

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const formatSubmit = async (e) => {
    e.preventDefault();
    if (isUpdate) {
      if (image != null) {

        var urlImage = await uploadImage();
        setProduct({
          ...product,
          URLImage: urlImage
        })
        product = ({
          ...product,
          URLImage: urlImage
        })
      }
      var response = await UpdateWithArtistFormat(product, format, artist);
      if (!response.isAxiosError) {
        alert.success("Se editó correctamente");
        window.location.reload(false);
      }
      else {
        alert.error("No se pudo editar")
      }
    } else {
      if (image != null) {
        var urlImage = await uploadImage();
        setProduct({
          ...product,
          URLImage: urlImage
        })
        product = ({
          ...product,
          URLImage: urlImage
        })
        
        var response = await CreateWithArtistFormat(product, format, artist);
        if (!response.isAxiosError) {
          alert.success("Se creo correctamente");
          window.location.reload(false);
        }
        else {
          alert.error("No se pudo crear")
        }
      }else{
          alert.error("Ingrese una imagen")
      }

    }
  }

  useEffect(() => {

    async function fetchData() {
      var resP = await GetWithGenre();
      if (!resP?.isAxiosError) {
        var productRes = resP;
        setProducts(productRes)
      }

      const resG = await GetAllGenres();
      if (!resG?.isAxiosError) {
        var genreRes = resG;
        setGenres(genreRes)
      }

      const resF = await GetAllFormats();
      if (!resF?.isAxiosError) {
        var formatRes = resF;
        setFormats(formatRes)
      }

      const resA = await GetAllArtists();
      if (!resA?.isAxiosError) {
        var artistRes = resA;
        setArtists(artistRes)
      }
    }

    fetchData();
  }, []);

  const uploadImage = async () => {
    return new Promise((resolve, reject) => {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var imageName = "image" + date + time
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          reject("Error")
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(imageName)
            .getDownloadURL()
            .then(async (url) => {
              resolve(url)
              console.log(url)
            })
        }
      )
    })
  }

  const bodyModal = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">{isUpdate ? "Editar" : "Crear"}</Typography>
      <form onSubmit={formatSubmit}>
        <TextField
          name="Name"
          label="Nombre"
          variant="outlined"
          fullWidth
          className={classes.marginForm}
          required
          inputProps={{ maxLength: 50 }}
          value={product.Name}
          onChange={handleChange}
        />
        <TextField
          name="Price"
          type="number"
          label="Precio"
          variant="outlined"
          fullWidth
          className={classes.marginForm}
          required
          inputProps={{ maxLength: 6 }}
          value={product.Price}
          onChange={handleChange}
        />
        <TextField
          name="Description"
          label="Descripción"
          variant="outlined"
          fullWidth
          className={classes.marginForm}
          inputProps={{ maxLength: 128 }}
          required
          value={product.Description}
          onChange={handleChange}
        />
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          <InputLabel htmlFor="IdGenre">Genero</InputLabel>
          <NativeSelect
            value={product.IdGenre}
            onChange={handleChange}
            inputProps={{
              name: "IdGenre",
              id: 'IdGenre',
              required: true,
            }}
          >
            <option aria-label="None" value="" />
            {genres.map((genre, index) => (
              <Fragment key={index}>
                <option value={genre.id}>{genre.genreName}</option>
              </Fragment>
            ))}
          </NativeSelect>
        </FormControl>
        <br />
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          <InputLabel id="FormatList">Formatos</InputLabel>
          <Select
            labelId="FormatList"
            id="FormatSelect"
            multiple
            value={format}
            required
            onChange={handleChangeFormat}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {formats.map((formatItem, index) => (
              <MenuItem key={formatItem.id} value={formatItem.id} style={getStyles(formatItem.id, format, theme)}>
                {formatItem.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          <InputLabel id="ArtistList">Artistas</InputLabel>
          <Select
            labelId="ArtistList"
            id="ArtistSelect"
            multiple
            required
            value={artist}
            onChange={handleChangeArtist}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {artists.map((artistItem, index) => (
              <MenuItem key={artistItem.id} value={artistItem.id} style={getStyles(artistItem.id, artist, theme)}>
                {artistItem.stageName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <input id="image" type="file" onChange={handleChangeImage}></input>

        <Button type="submit" color="primary" variant="contained" className={classes.marginForm}>Submit</Button>
      </form>
    </div>
  )

  return (
    <React.Fragment>
      <HeaderAdmin />
      <br />
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        ADMINISTAR PRODUCTOS
        </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead style={{ color: "white" }}>
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
            {products.map((product, index) => (
              <StyledTableRow key={index}>
                <ProductRow product={product} handleOpenUpdate={handleOpenUpdate}></ProductRow>
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