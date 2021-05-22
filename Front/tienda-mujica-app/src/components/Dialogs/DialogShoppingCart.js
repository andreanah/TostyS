import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    TextField,
    Modal,
    InputLabel,
    FormControl,
    NativeSelect,
    FormHelperText,
    Dialog,
} from '@material-ui/core/';

import { Create } from '../../api/ShoppingCartAPI'
import { Identity } from '../../api/UserAPI'
import { GetProductFormats } from '../../api/ProductAPI';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'

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

const useStyles = makeStyles((theme) => ({
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

function DialogShoppingCart({idProduct}) {
    var id = "";
    const classes = useStyles();
    const alert = useAlert();

    const [open, setOpen] = useState(false);
    const [formats, setFormats] = useState([])
    var [shoppingCart, setShoppingCart] = useState({
        Id: 0,
        Quantity: 0,
        IdFormat: 0,
        IdProduct: 0,
        IdUser: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShoppingCart({
            ...shoppingCart,
            [name]: value
        })
        console.log(name, value);
    }

    useEffect(() => {

    }, []);

    const handleClickOpen = async() => {
        setOpen(true)
        var res = await GetProductFormats(idProduct);
        if (!res.isAxiosError) {
            const formatRes = res.formats;
            setFormats(formatRes)
        }
    };
    const handleClickClose = () => {
        setOpen(false);
    };

    const formatSubmit = async (e) => {
        e.preventDefault();
        var response = await Identity();
        if (!response.isAxiosError) {
            id = response[0].id;
        }
        else {
            alert.error("Hubo un error");
            return;
        }

        const shoppingCartAux = {
            Id: 0,
            IdProduct: idProduct,
            IdFormat: shoppingCart.IdFormat,
            IdUser: id,
            Quantity: shoppingCart.Quantity
        }
        var response = await Create(shoppingCartAux);
        if (!response.isAxiosError) {
            alert.success("Se agrego al carrito correctamente");
        }
        else {
            alert.error("No se pudo agregar al carrito")
        }
    }

    const dialogContent = (
        <Fragment>
            <div>
                <Typography variant="h6">Agregar al carrito</Typography>
                <form onSubmit={formatSubmit}>
                    <TextField
                        name="Quantity"
                        label="Cantidad"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.marginForm}
                        required
                        inputProps={{ maxLength: 5, minLength: 1 }}
                        value={shoppingCart?.Quantity}
                        onChange={handleChange}
                    />
                    <FormControl style={{ width: "100%" }} className={classes.formControl}>
                        <InputLabel htmlFor="IdFormat">Formato</InputLabel>
                        <NativeSelect
                            value={shoppingCart?.IdFormat}
                            onChange={handleChange}
                            inputProps={{
                                name: "IdFormat",
                                id: 'IdFormat',
                                required: true,
                            }}
                        >
                            <option aria-label="None" value="" />
                            {formats.map((format, index) => (
                                <Fragment key={index}>
                                    <option value={format.idFormat}>{format.type}</option>
                                </Fragment>
                            ))}
                        </NativeSelect>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    <br />
                    <br />
                    <Button type="submit" color="primary" variant="contained" className={classes.marginForm}>Submit</Button>
                </form>
            </div>
        </Fragment>
    )

    return (
        <div style={{width: "100%" }}>
            <Button variant='contained' color='secondary' onClick={handleClickOpen}>
                Agregar al carrito
            </Button>
            <Dialog maxWidth="xl" onClose={handleClickClose} aria-labelledby='customized-dialog-title' open={open}>
                <DialogContent>
                    {dialogContent}
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default DialogShoppingCart;
