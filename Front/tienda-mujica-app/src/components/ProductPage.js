import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width:'80%',
   height:'80%',
   overflow:'auto',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}  >
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item >
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="./showcase.png" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  The Final Cut
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Pink Floyd 1920x1080 • CD
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
              <ButtonBase >
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Agregar al carrito
                </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      
    </div>
  );
}
