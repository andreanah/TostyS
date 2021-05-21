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
} from '@material-ui/core/';

import { Create } from '../../api/ShoppingCartAPI'
import { Identity } from '../../api/UserAPI'

import { GetAll } from '../../api/FormatAPI'

import { useAlert } from 'react-alert'
import { useState, useEffect, Fragment } from 'react';
import { GetProductFormats } from '../../api/ProductAPI';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '20vw',
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

export default function ProductCard({ product }) {
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
        var res = await GetProductFormats(product.idProduct);
        if (!res.isAxiosError) {
            const formatRes = res.formats;
            setFormats(formatRes)
        }
    }

    useEffect(() => {
        async function fetchData() {


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
            IdProduct: product.idProduct,
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

    const redirectLink = () => {
        window.location.href = `/ProductPage/${product.idProduct}`
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
    </div>)

    return (<Card className={classes.root}>
        <CardActionArea>
            <CardMedia onClick={redirectLink}
                className={classes.media}
                image={product?.urlImage}
                title="AlbumImage"
            />
            <CardContent >
                <Typography gutterBottom variant="h5" component="h2">
                    {product?.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product?.description}
                </Typography>
                <Typography variant="h4" color="textSecondary" component="p">
                    ${product?.price} MXN
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={AddToCart}>
                Agregar al carrito
            </Button>
        </CardActions>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {bodyModal}
        </Modal>
    </Card>
    )
}