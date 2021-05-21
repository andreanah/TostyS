import { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

import { Disable as DisableAddress, GetAll} from '../../api/CreditCardAPI'

const StyledTableCell = withStyles((theme) => ({
  head: {
    color: 'white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function AddressRow({ creditCard, handleOpenUpdate}) {
  const alert = useAlert();
  const DeleteCreditCard = async () => {
    if (window.confirm("¿Quieres eliminar la tarjeta de credito?")) {
      var res = await DisableAddress(creditCard.id);
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
      <StyledTableCell component="th" scope="row">{creditCard.creditCardNumber}</StyledTableCell>
      <StyledTableCell align="right">{creditCard.dateBirth}</StyledTableCell>
      <StyledTableCell align="right"> <Button variant="contained" color="secondary" onClick={()=> handleOpenUpdate(creditCard)}>Editar</Button></StyledTableCell>
      <StyledTableCell align="right"> <Button variant="contained" color="secondary" onClick={DeleteCreditCard}>Eliminar</Button></StyledTableCell>
    </Fragment>)
}