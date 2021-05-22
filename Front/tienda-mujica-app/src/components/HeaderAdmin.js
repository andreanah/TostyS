import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Profile from '../components/Profile';

import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  AppBar:{
    padding: 5,
  },
 
}));

export default function HeaderAdmin() {
  const classes = useStyles();
  const location = useLocation();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      
      <AppBar position="static" style={{ background: '#000000' }} >
        <Toolbar>
          
        <Typography variant="h6" className={classes.title}>
            <Link href="/MainPage"  color="inherit">
              Pagina Principal
            </Link>
          </Typography>

          <Typography variant="h6" className={classes.title}>
            <Link href="/admin/Reports"  color="inherit">
              Reportes
            </Link>
          </Typography>


          {(location.pathname!="/admin")?
          <Typography variant="h6" className={classes.title}>
            <Link href="/admin"  color="inherit">
              Administrador
            </Link>
          </Typography>:""
          }
          
         
        </Toolbar>
      </AppBar>
    </div>
  );
}