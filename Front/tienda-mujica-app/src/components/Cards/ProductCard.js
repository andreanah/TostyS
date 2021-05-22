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
import DialogShoppingCart from '../Dialogs/DialogShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: '20vw',
        flexGrow: 1,

    },
    media: {
        height: 300,
    },
    cardHover: {
        "&": { height: "100%" },
        "&:hover": {
            transform: "scale3d(1.1, 1.1, 1.1)",
            transition: "all .3s cubic-bezier(0.075, 0.82, 0.165, 1)",
            position: "relative",
            zIndex: "5",
        },

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

    const redirectLink = () => {
        window.location.href = `/ProductPage/${product?.idProduct}`
    }

    const classes = useStyles();

    return (<Card className={classes.root, classes.cardHover}>
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
            <DialogShoppingCart idProduct={product.idProduct}></DialogShoppingCart>
        </CardActions>
    </Card>
    )
}