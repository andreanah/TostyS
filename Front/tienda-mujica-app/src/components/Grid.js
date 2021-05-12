import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'react-img-rz';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
      
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  img:{
     height:'100%',
      width:'100%',
      textAlign: 'center',
  }
 
}));


export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        
      
        <Container maxWidth='100%'>
        <Grid item xs={12}>
         
         </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}><img src={'./HEADER.png'} /></Paper>
        </Grid>
       
            
           
        </Container>
     
    </div>
  );
}