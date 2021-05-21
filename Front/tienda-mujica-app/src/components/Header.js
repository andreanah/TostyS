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

export default function MenuAppBar() {
  const classes = useStyles();
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

  const LogOut = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  };

  const preventDefault = (event) => event.preventDefault();
  return (
    <div className={classes.root}>
      
      <AppBar position="static" style={{ background: '#000000' }} >
        <Toolbar>
          
      

        <Typography variant="h6" className={classes.title}>
            <Link href="/MainPage"  color="inherit">
              Principal
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link href="/Products"  color="inherit">
              Productos
            </Link>
          </Typography>

          

          <Typography variant="h6" className={classes.title}>
            <Link href="/ShoppingCart"  color="inherit">
              Cart
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link href="/MyOrders"  color="inherit">
              Mis Ordenes
            </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link href="/Profile">Mi perfil</Link></MenuItem>
                <MenuItem onClick={LogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}