import Header from './Header';
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from './BottomNav';

import ProductCard from '../components/Cards/ProductCard'
import { GetProducts } from '../api/ProductAPI'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 'flex',
    },
    media: {
        height: 140,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },

}));

export default function MainPageElements() {
    const classes = useStyles();
    const theme = useTheme();
    let numberCards = 4;
    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function fetchData() {

            var res = await GetProducts();

            if (!res.isAxiosError) {
                var productRes = res;

                if (productRes.length > numberCards) {
                    productRes = productRes.slice(0, numberCards)
                }

                if (productRes.length < numberCards) {
                    for (let i = productRes.length; i < numberCards; i++) {
                        productRes.push(productRes[productRes.length - 1])
                    }
                }

                setProducts(productRes)
            }

        }

        fetchData();
    }, []);

    return (

        <Grid container spacing={0.1} >

            <Header />

            <img alt="HeaderImage" src="/banner.png" width='100%' />
            <img alt="HeaderImage" src="/HEADER.png" width='100%' />
            <img alt="Image" src="/title.png" width='100%' />

            {products.map((product, index) => (
                <Fragment key={index}>
                    <Grid item xs={3} p={0}>
                        <ProductCard product={product} />
                    </Grid>
                </Fragment>
            ))}

            <img alt="Image2" src="/title2.png" width='100%' />
            <img alt="Albums" src="/albums.png" width='100%' />

            {products.map((product, index) => (
                <Fragment key={index}>
                    <Grid item xs={3} p={0}>
                        <ProductCard product={product} />
                    </Grid>
                </Fragment>
            ))}
            <img alt="HotSale" src="/HOTSALE.png" width='100%' />

            {products.map((product, index) => (
                <Fragment key={index}>
                    <Grid item xs={3} p={0}>
                        <ProductCard product={product} />
                    </Grid>
                </Fragment>
            ))}
            <img alt="HotSale" src="/aaa.png" width='100%' />
            <Footer />

        </Grid>


    );
}
