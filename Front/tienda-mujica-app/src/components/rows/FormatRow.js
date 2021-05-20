import { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';

import { Disable as DisableFormat } from '../../api/FormatAPI'

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: 'white',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function FormatRow({ format, handleOpenUpdate}) {
    const alert = useAlert();
    const DeleteFormat = async () => {
        if (window.confirm("¿Quieres eliminar el formato?")) {
            var res = await DisableFormat(format.id);
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
            <StyledTableCell component="th" scope="row">{format.id}</StyledTableCell>
            <StyledTableCell align="center">{format.type}</StyledTableCell>
            <StyledTableCell align="center">{format.typeCode}</StyledTableCell>
            <StyledTableCell align="center"> <Button variant="contained" color="secondary" onClick={()=> handleOpenUpdate(format)}>Editar</Button></StyledTableCell>
            <StyledTableCell align="center"> <Button variant="contained" color="secondary" onClick={DeleteFormat}>Eliminar</Button></StyledTableCell>
        </Fragment>)
}