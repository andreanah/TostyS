import { makeStyles } from '@material-ui/core/styles';

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
    Grid,
    Paper,
    ButtonBase,
} from '@material-ui/core/';

import { Create, Update, Delete } from '../../api/ShoppingCartAPI'
import { Identity } from '../../api/UserAPI'

import { GetAll } from '../../api/FormatAPI'

import { useAlert } from 'react-alert'
import { useState, useEffect, Fragment } from 'react';
import { GetProductFormats } from '../../api/ProductAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: '20vw',
        flexGrow: 1,

    },
    media: {
        height: 300,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textTypo: {
        maxWidth: '100%'
    }
}));

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function ShoppingCartCard({ productCart }) {
    const alert = useAlert();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [formats, setFormats] = useState([])
    var [shoppingCart, setShoppingCart] = useState({
        Id: 0,
        Quantity: 0,
        IdFormat: 0,
        IdProduct: 0,
        IdUser: ""
    });

    var id = "";

    const handleClose = () => {
        setOpen(false)
    }

    const AddToCart = async () => {
        setOpen(true)

        const shoppingCartAux = {
            ...shoppingCart,
            ["IdFormat"]: productCart.format.id,
            ["Quantity"]: productCart.quantity,
        }
        setShoppingCart(shoppingCartAux)
    }

    useEffect(() => {
        async function fetchData() {
            var resFormats = await GetProductFormats(productCart.product.id)
            if (resFormats.isAxiosError) { return; }
            setFormats(resFormats.formats);
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShoppingCart({
            ...shoppingCart,
            [name]: value
        })
        console.log(name, value);
    }

    const RemoveItem = async()=> {
        if (window.confirm("¿Seguro que quiere eliminar el producto?")) {
            var res = await Delete(productCart.idShoppingCart)
            if (!res.isAxiosError) {
                window.location.reload(false)
            } else {
                alert.error("No se pudo eliminar")
            }
        }
    }

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
            Id: productCart.idShoppingCart,
            IdProduct: productCart.product.id,
            IdFormat: shoppingCart.IdFormat,
            IdUser: id,
            Quantity: shoppingCart.Quantity
        }
        var response = await Update(shoppingCartAux);
        if (!response.isAxiosError) {
            alert.success("Se agrego al carrito correctamente");
            window.location.reload(false)
        }
        else {
            alert.error("No se pudo agregar al carrito")
        }
    }

    const redirectLink = () => {
        window.location.href = `/ProductPage/${productCart?.product?.id}`
    }

    const classes = useStyles();

    const bodyModal = (<div style={modalStyle} className={classes.paper}>
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
                    value={shoppingCart.IdFormat}
                    onChange={handleChange}
                    inputProps={{
                        name: "IdFormat",
                        id: 'IdFormat',
                        required: true,
                    }}
                >
                    <option aria-label="None" value="" />
                    {formats?.map((format, index) => (
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
    </div>)

    return (<Card >
        <div>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <ButtonBase className={classes.image} onClick={redirectLink}>
                            <img width="100%" className={classes.img} alt="complex" src={productCart?.product?.urlImage} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={10} container>
                        <Grid item xs={9} container spacing={2}>
                            <Grid item xs={10}>
                                <Typography className={classes.textTypo} gutterBottom variant="h5">
                                    {productCart?.product?.name}
                                </Typography>
                                <Typography className={classes.textTypo} variant="h6" gutterBottom>
                                    {productCart?.product?.description}
                                </Typography>
                                <Typography className={classes.textTypo} style={{ maxWidth: '100%' }} variant="body2" color="textSecondary">
                                    {productCart?.format?.type}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography onClick={AddToCart} variant="h6" style={{ color: "#0011cc", cursor: 'pointer' }}>
                                    Edit
                                </Typography>
                                <Typography onClick={RemoveItem} variant="h6" style={{ color: "#dd0000", cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography align="left" variant="h6">${productCart?.product?.price}MXN Precio unitario</Typography>
                            <Typography align="left" variant="h6">${productCart?.product.price * productCart?.quantity}MXN Precio total</Typography>
                            <br />
                            <Typography style={{ marginTop: "10px" }} variant="subtitle">Cantidad {productCart?.quantity}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {bodyModal}
            </Modal>
        </div>
    </Card>
    )
}