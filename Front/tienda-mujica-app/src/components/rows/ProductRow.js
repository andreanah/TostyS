import { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

import { Disable as DisableProduct} from '../../api/ProductAPI'

const StyledTableCell = withStyles((theme) => ({
    head: {
      color: 'white',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

export default function ProductRow({ product }) {
    const alert = useAlert();
    const DeleteProduct = async () => {
      if (window.confirm("¿Quieres eliminar el producto?")) {
        var res = await DisableProduct(product.id);
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
        <StyledTableCell component="th" scope="row">{product.id}</StyledTableCell>
                <StyledTableCell align="right">{product.name}</StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">{product.description}</StyledTableCell>
                <StyledTableCell align="right"><div><img style={{maxWidth:"3vw"}} src={product.urlImage}/></div></StyledTableCell>
                <StyledTableCell align="right">{product.genreName}</StyledTableCell>
                <StyledTableCell align="right">{product.idGenre}</StyledTableCell>
                <StyledTableCell align="right"> <Button variant="contained" color="secondary" >Editar</Button></StyledTableCell>
                <StyledTableCell align="right"> <Button variant="contained" color="secondary" onClick={DeleteProduct}>Eliminar</Button></StyledTableCell>
      </Fragment>)
  }