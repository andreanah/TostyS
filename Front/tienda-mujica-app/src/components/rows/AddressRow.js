import { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

import { Disable as DisableAddress, GetAll} from '../../api/AddressAPI'

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function AddressRow({ address, handleOpenUpdate}) {
  const alert = useAlert();
  const DeleteAddress = async () => {
    if (window.confirm("¿Quieres eliminar la dirección?")) {
      var res = await DisableAddress(address.id);
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
      <StyledTableCell component="th" scope="row">{address.street}</StyledTableCell>
      <StyledTableCell align="right">{address.suburb}</StyledTableCell>
      <StyledTableCell align="right">{address.cp}</StyledTableCell>
      <StyledTableCell align="right">{address.city}</StyledTableCell>
      <StyledTableCell align="right">{address.state}</StyledTableCell>
      <StyledTableCell align="right">{address.country}</StyledTableCell>
      <StyledTableCell align="right"> <Button variant="contained" color="secondary" onClick={()=> handleOpenUpdate(address)}>Editar</Button></StyledTableCell>
      <StyledTableCell align="right"> <Button variant="contained" color="secondary" onClick={DeleteAddress}>Eliminar</Button></StyledTableCell>
    </Fragment>)
}