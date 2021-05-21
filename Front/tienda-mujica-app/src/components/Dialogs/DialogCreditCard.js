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

import { Create, Update, GetAllOfUser } from '../../api/CreditCardAPI'
import { Identity } from '../../api/UserAPI';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

import CreditCardRow from '../rows/CreditCardRow'
import { useAlert } from 'react-alert';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
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


function DialogCreditCard({ children }) {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const alert = useAlert();

    const [open, setOpen] = React.useState(false);
    const [openM, setOpenM] = React.useState(false);

    const [creditCards, setCreditCards] = useState([])
    var [creditCard, setCreditCard] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
    var [idUser, setIdUser] = useState("");
    const handleOpenUpdate = (creditCard) => {
        var auxCreditCard = {
            Id: creditCard.id,
            DateBirth: creditCard.dateBirth,
            CreditCardNumber: creditCard.creditCardNumber,
            IdUser: creditCard.idUser
        }
        setCreditCard(auxCreditCard)
        setIsUpdate(true);
        setOpenM(true);
    };

    const handleOpenCreate = (creditCard) => {
        var auxCreditCard = {
            Id: 0,
            DateBirth: "",
            CreditCardNumber: "",
            IdUser: ""
        }
        setCreditCard(auxCreditCard)
        setIsUpdate(false);
        setOpenM(true);
    };

    const handleClose = () => {
        setOpenM(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreditCard({
            ...creditCard,
            [name]: value
        })
        console.log(name, value);
    }

    const formatSubmit = async (e) => {
        e.preventDefault();
        if (isNaN(creditCard.CreditCardNumber)) {
            alert.error("Ingresa solamente números en la tarjeta de crédito")
            return;
        }

        var resIdUser = await Identity();
        if (!resIdUser?.isAxiosError) {
            idUser = resIdUser[0].id;
        }
        var newCreditCard = {
            ...creditCard,
            IdUser: idUser
        }
        setCreditCard(newCreditCard)
        if (isUpdate) {
            var response = await Update(newCreditCard);
            if (!response.isAxiosError) {
                alert.success("Se editó correctamente");
                window.location.reload(false);
            }
            else {
                let resAlert = "No se pudo editar";
                alert.error(resAlert)
            }
        } else {
            var response = await Create(newCreditCard);
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
                    var creditCardRes = res;
                    setCreditCards(creditCardRes)
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
            <form onSubmit={formatSubmit}>
                <TextField
                    name="CreditCardNumber"
                    label="Tarjeta de Crédito"
                    variant="outlined"
                    fullWidth
                    type="text"
                    className={classes.marginForm}
                    required
                    inputProps={{ maxLength: 16, minLength: 16 }}
                    value={creditCard?.CreditCardNumber}
                    onChange={handleChange}
                />
                <TextField
                    id="date"
                    label="Fecha de expiración"
                    type="date"
                    name="DateBirth"
                    defaultValue={creditCard?.DateBirth}
                    className={classes.textField}
                    required
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br />
                <Button type="submit" color="primary" variant="contained" className={classes.marginForm}>Submit</Button>
            </form>
        </div>
    )

    const dialogContent = (
        <Fragment>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                ADMINISTRAR TARJETAS DE CRÉDITO
                </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead style={{ color: "white" }}>
                        <TableRow>
                            <StyledTableCell align="right">Número de tarjeta</StyledTableCell>
                            <StyledTableCell align="right">Fecha de expiración</StyledTableCell>
                            <StyledTableCell align="right">Editar</StyledTableCell>
                            <StyledTableCell align="right">Eliminar</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {creditCards.map((creditCard, index) => (
                            <StyledTableRow key={index}>
                                <CreditCardRow creditCard={creditCard} handleOpenUpdate={handleOpenUpdate}></CreditCardRow>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleOpenCreate}>Crear</Button>
            <Modal
                open={openM}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyModal}
            </Modal>
        </Fragment>
    )

    return (
        <div>
            <Button variant='contained' color='secondary' onClick={handleClickOpen}>
                Tarjetas de Crédito
      </Button>
            <Dialog maxWidth="xl" onClose={handleClickClose} aria-labelledby='customized-dialog-title' open={open}>
                <DialogContent dividers>
                    {dialogContent}
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default DialogCreditCard;
