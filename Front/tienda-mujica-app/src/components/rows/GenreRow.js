import { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

import { Disable as DisableGenre } from '../../api/GenreAPI'

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: 'white',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function GenreRow({ genre, handleOpenUpdate }) {
    const alert = useAlert();
    const DeleteGenre = async () => {
        if (window.confirm("¿Quieres eliminar el genero?")) {
            var res = await DisableGenre(genre.id);
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
            <StyledTableCell component="th" scope="row">{genre.id}</StyledTableCell>
              <StyledTableCell component="th" scope="row">{genre.genreName}</StyledTableCell>
              <StyledTableCell align="center"> <Button variant="contained" color="secondary" onClick={()=> handleOpenUpdate(genre)}>Editar</Button></StyledTableCell>
              <StyledTableCell align="center"> <Button variant="contained" color="secondary" onClick={DeleteGenre}>Eliminar</Button></StyledTableCell>
        </Fragment>)
}