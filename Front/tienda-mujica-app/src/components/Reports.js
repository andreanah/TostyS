import React, { useEffect, useState, Fragment } from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TextField,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    InputLabel,
    NativeSelect,
    FormControl,
    Modal,
    Input,
    Grid,
    MenuItem,
    Select,
    Container,
} from '@material-ui/core/';
import { useAlert } from 'react-alert'
import { storage } from '../firebase/index'
import HeaderAdmin from '../components/HeaderAdmin'

import { GetTopSellingProducts, GetTopSellingGenres, GetTopSellingArtists, GetTopSellingFormats } from '../api/ReportsAPI'

import ProductRow from './rows/ProductRow';

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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(id, formats, theme) {
    return {
        fontWeight:
            formats.indexOf(id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    marginForm: {
        '& .MuiTextField-root': {
            marginTop: theme.spacing(2),
        },
        '& .MuiFormControl-root': {
            marginTop: theme.spacing(2),
        },
        '& .MuiButton-root': {
            marginTop: theme.spacing(2),
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

export default function Reports() {
    const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [formats, setFormats] = useState([]);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);
    const [result, setResult] = useState([]);
    const [resultText, setResultText] = useState("")

    const SetTable = (i) => {
        switch (i) {
            case 1: {
                setResult(products);
                setResultText("Productos más vendidos")
            } break;
            case 2: {
                setResult(genres);
                setResultText("Géneros más vendidos")
            } break;
            case 3: {
                setResult(artists);
                setResultText("Artistas más vendidos")
            } break;
            case 4: {
                setResult(formats);
                setResultText("Formatos más vendidos")
            } break;
        }
    }

    useEffect(() => {

        async function fetchData() {
            var resP = await GetTopSellingProducts();
            if (!resP?.isAxiosError) {
                const newProduct = resP.map(product => {
                    return {
                        Id: product.idProduct,
                        Name: product.productName,
                        Quantity: product.quantity,
                        Total: product.totalPrice
                    }
                })
                setProducts(newProduct)
            }

            const resG = await GetTopSellingGenres();
            if (!resG?.isAxiosError) {
                const newGenre = resG.map(genre => {
                    return {
                        Id: genre.idGenre,
                        Name: genre.genreName,
                        Quantity: genre.quantity,
                        Total: genre.totalPrice
                    }
                })
                setGenres(newGenre)
            }

            const resF = await GetTopSellingFormats();
            if (!resF?.isAxiosError) {
                const newFormat = resF.map(format => {
                    return {
                        Id: format.idFormat,
                        Name: format.formatName,
                        Quantity: format.quantity,
                        Total: format.totalPrice
                    }
                })
                setFormats(newFormat)
            }

            const resA = await GetTopSellingArtists();
            if (!resA?.isAxiosError) {
                const newArtist = resA.map(artist => {
                    return {
                        Id: artist.idArtist,
                        Name: artist.artistName,
                        Quantity: artist.quantity,
                        Total: artist.totalPrice
                    }
                })
                setArtists(newArtist)
            }
        }

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <HeaderAdmin />
            <br />

            <Grid my={5} container xs={12}>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={() => SetTable(1)}>Productos más vendidos</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={() => SetTable(2)}>Géneros más vendidos</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={() => SetTable(3)}>Artistas más vendidos</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={() => SetTable(4)}>Formatos más vendidos</Button>
                </Grid>
            </Grid>

            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                REPORTES
        </Typography>
        <Typography component="h4" variant="h4" align="center" color="textSecondary" gutterBottom>
                {resultText}
        </Typography>
            <Container>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead style={{ color: "white" }}>
                            <TableRow>
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="center">Nombre</StyledTableCell>
                                <StyledTableCell align="center">Cantidad</StyledTableCell>
                                <StyledTableCell align="center">Total</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {result?.map((result, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell align="left">{result.Id}</StyledTableCell>
                                    <StyledTableCell align="center">{result.Name}</StyledTableCell>
                                    <StyledTableCell align="center">{result.Quantity}</StyledTableCell>
                                    <StyledTableCell align="center">${result.Total}MXN</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );
}