import { makeStyles } from '@material-ui/core/styles';

import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@material-ui/core/';

import { Create } from '../../api/ShoppingCartAPI'
import { Identity } from '../../api/UserAPI'

import { useAlert } from 'react-alert'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '20vw',
        flexGrow: 1,

    },
    media: {
        height: 300,
    },
}));

export default function ProductCard({ product }) {
    const alert = useAlert();

    const AddToCart = async() => {
        var quantity = prompt("¿Cuantos productos quieres agregar al carrito?");

        if (quantity > 0) {
            var id = "";

            var response = await Identity();
            if (!response.isAxiosError) {
                id = response[0].id;   
            }
            else {
                alert.error("Hubo un error");
                return;
            }

            const shoppingCartAux = {
                Id:0,
                IdProduct: product.idProduct,
                IdUser: id,
                Quantity: quantity
            }
            var response = await Create(shoppingCartAux);
            if (!response.isAxiosError) {
                alert.success("Se agrego al carrito correctamente");
            }
            else {
                alert.error("No se pudo agregar al carrito")
            }
        }
    }

    const classes = useStyles();

    return (<Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={product.urlImage}
                title="AlbumImage"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {product.description}
                </Typography>
                <Typography variant="h4" color="textSecondary" component="p">
                    ${product.price} MXN
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={AddToCart}>
                Agregar al carrito
            </Button>
        </CardActions>
    </Card>)
}