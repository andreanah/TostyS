import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TextField,
    TableHead,
    Dialog,
    Typography,
    TableRow,
    Paper,
    Container,
    Button,
    Modal,
} from '@material-ui/core/';

import { Create, Update, GetAllOfUser } from '../../api/AddressAPI'
import { Identity } from '../../api/UserAPI';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

import AddressRow from '../rows/AddressRow'
import { useAlert } from 'react-alert';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

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
    // table: {
    //     minWidth: 700,
    // },
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
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
                <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function DialogAddress({ children }) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const alert = useAlert();

    const [open, setOpen] = React.useState(false);
    const [openM, setOpenM] = React.useState(false);

    const [addresses, setAddresses] = useState([])
    var [address, setAddress] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    var [idUser, setIdUser] = useState("");
    const handleOpenUpdate = (address) => {
        var auxAddress = {
            Id: address.id,
            Street: address.street,
            CP: address.cp,
            City: address.city,
            Country: address.country,
            State: address.state,
            Suburb: address.suburb,
            IdUser: idUser,
            Active: true,
        }
        setAddress(auxAddress)
        setIsUpdate(true);
        setOpenM(true);
    };

    const handleOpenCreate = (address) => {
        var auxAddress = {
            Id: 0,
            Street: "",
            CP: "",
            City: "",
            Country: "",
            Suburb: "",
            State: "",
            IdUser: "",
            Active: true,
        }
        setAddress(auxAddress)
        setIsUpdate(false);
        setOpenM(true);
    };

    const handleClose = () => {
        setOpenM(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address,
            [name]: value
        })
        console.log(name, value);
    }

    const formatSubmit = async (e) => {
        e.preventDefault();

        var resIdUser = await Identity();
        if (!resIdUser?.isAxiosError) {
            idUser = resIdUser[0].id;
        }
        var newAddress = {
            ...address,
            IdUser: idUser
        }
        setAddress(newAddress)
        if (isUpdate) {
            var response = await Update(newAddress);
            if (!response.isAxiosError) {
                alert.success("Se editó correctamente");
                window.location.reload(false);
            }
            else {
                let resAlert = "No se pudo editar";
                alert.error(resAlert)
            }
        } else {
            var response = await Create(newAddress);
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
            var resIdUser = await Identity();
            if (!resIdUser?.isAxiosError) {
                idUser = resIdUser[0].id;
                setIdUser(idUser);
                var res = await GetAllOfUser(idUser);
                if (!res?.isAxiosError) {
                    setAddresses(res)
                }
            }
        }

        fetchData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };

    const bodyModal = (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h6">{isUpdate ? "Editar" : "Crear"}</Typography>
            <form className={classes.marginForm} onSubmit={formatSubmit}>
                <TextField
                    name="Street"
                    label="Calle"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 20 }}
                    value={address?.Street}
                    onChange={handleChange}
                />
                <TextField
                    name="Suburb"
                    label="Colonia"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 20}}
                    value={address?.Suburb}
                    onChange={handleChange}
                />
                <TextField
                    name="CP"
                    label="CP"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 10}}
                    value={address?.CP}
                    onChange={handleChange}
                />
                <TextField
                    name="City"
                    label="Ciudad"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 20}}
                    value={address?.City}
                    onChange={handleChange}
                />
                <TextField
                    name="State"
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 20}}
                    value={address?.State}
                    onChange={handleChange}
                />
                <TextField
                    name="Country"
                    label="País"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 20}}
                    value={address?.Country}
                    onChange={handleChange}
                />
                <br />
                <Button type="submit" color="primary" variant="contained" className={classes.marginForm}>Submit</Button>
            </form>
        </div>
    )

    const dialogContent = (
        <Fragment>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                ADMINISTRAR DIRECCIÓN
                </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead style={{ color: "white" }}>
                        <TableRow>
                            <StyledTableCell align="right">Calle</StyledTableCell>
                            <StyledTableCell align="right">Colonia</StyledTableCell>
                            <StyledTableCell align="right">CP</StyledTableCell>
                            <StyledTableCell align="right">Ciudad</StyledTableCell>
                            <StyledTableCell align="right">Estado</StyledTableCell>
                            <StyledTableCell align="right">País</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addresses.map((addressItem, index) => (
                            <StyledTableRow key={index}>
                                <AddressRow address={addressItem} handleOpenUpdate={handleOpenUpdate}></AddressRow>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleOpenCreate}>Crear</Button>
            <Modal
                open={openM}
                onClose={handleClose}
                aria-labelledby="address_modal_title"
                aria-describedby="simple-modal-description"
            >
                {bodyModal}
            </Modal>
        </Fragment>
    )

    return (
        <div>
            <Button variant='contained' color='secondary' onClick={handleClickOpen}>
                Direcciones
      </Button>
            <Dialog maxWidth="xl" onClose={handleClickClose} aria-labelledby='address_modal_title' open={open}>
                <DialogContent dividers>
                    {dialogContent}
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default DialogAddress;
