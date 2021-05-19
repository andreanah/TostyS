import { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

import { Disable as DisableArtist, GetAll} from '../../api/ArtistAPI'

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function ArtistRow({ artist }) {
  const alert = useAlert();
  const DeleteArtist = async () => {
    if (window.confirm("¿Quieres eliminar el artista?")) {
      var res = await DisableArtist(artist.id);
      if (!res.isAxiosError) {
        alert.success("Se elimino correctamente")
        window.location.reload(false);
      } else {
        alert.error("No se pudo eliminar")
      }
    }
  }

  return (
    <Fragment>
      <StyledTableCell component="th" scope="row">{artist.id}</StyledTableCell>
      <StyledTableCell align="right">{artist.stageName}</StyledTableCell>
      <StyledTableCell align="right">{artist.realName}</StyledTableCell>
      <StyledTableCell align="right">{artist.description}</StyledTableCell>
      <StyledTableCell align="right"> <Button variant="contained" color="secondary">Editar</Button></StyledTableCell>
      <StyledTableCell align="right"> <Button variant="contained" color="secondary" onClick={DeleteArtist}>Eliminar</Button></StyledTableCell>
    </Fragment>)
}