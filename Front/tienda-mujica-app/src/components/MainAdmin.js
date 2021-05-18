import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import HeaderAdmin from '../components/HeaderAdmin'



const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


export default function MainAdmin() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <HeaderAdmin/>
      <CssBaseline />
      
     
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          BIENVENIDO ADMINISTRADOR
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
         PUEDES ESCOGER ENTRE ESTAS OPCIONES PARA CREAR UNA MEJOR APLICACIÓN PARA LOS USUARIOS
        </Typography>
      </Container>
      {/* End hero unit */}

      <Container maxWidth="md" component="main">
        <Grid container spacing={8} alignItems="flex-end" style={{marginTop:"3%"}}>
        <Card>
                <CardHeader
                  title={"Productos"}
                  
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  
                  className={classes.cardHeader}
                />
                <CardActions>
                <Link href="/CreateProduct"  color="inherit">
                    CREAR
                    </Link>
                    <Link href="/EditProduct"  color="inherit">
                    EDITAR
                    </Link>
                </CardActions>
              </Card>
              <Card style={{marginLeft:"2%"}}>
                <CardHeader
                  title={"Artistas"}
                  
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  
                  className={classes.cardHeader}
                />
                <CardActions>
                <Link href="/CreateArtist"  color="inherit">
                    CREAR
                    </Link>
                    <Link href="/EditArtist"  color="inherit">
                    EDITAR
                    </Link>
                </CardActions>
              </Card>
              <Card style={{marginLeft:"2%"}}>
                <CardHeader
                  title={"Formato"}
                  
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  
                  className={classes.cardHeader}
                />
                <CardActions>
                <Link href="/CreateFormat"  color="inherit">
                    CREAR
                    </Link>
                    <Link href="/EditFormat"  color="inherit">
                    EDITAR
                    </Link>
                </CardActions>
              </Card>
              <Card style={{marginLeft:"2%"}}>
                <CardHeader
                  title={"Género"}
                  
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  
                  className={classes.cardHeader}
                />
                <CardActions>
                <Link href="/CreateGenre"  color="inherit">
                    CREAR
                    </Link>
                    <Link href="/EditGenre"  color="inherit">
                    EDITAR
                    </Link>
                </CardActions>
              </Card>
        </Grid>
        
      </Container>
      
      {/* End footer */}
    </React.Fragment>
  );
}