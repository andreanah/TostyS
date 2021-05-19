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

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20vw',
        flexGrow: 1,

    },
    media: {
        height: 250,
    },
}));

export default function ProductCard({product}) {

    const meClickearon = () =>{
        var quantity = prompt("¿Cuantos productos quieres agregar al carrito?");
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
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={meClickearon}>
                Agregar al carrito
            </Button>
        </CardActions>
    </Card>)
}