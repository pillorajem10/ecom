import React, { useState } from 'react';

//navigation
import  Link  from 'next/link';

//logo
import logo from '../public/images/jp.png';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

//material-ui icons
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import HomeIcon from '@material-ui/icons/Home';
import ComputerIcon from '@material-ui/icons/Computer';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';

//css
import styles from '../styles/NavbarLow.module.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  navbarLowLinks: {
    color: '#000000',
    textDecoration: 'none',
    marginLeft: '1.5rem',
    fontSize: '1.3rem'
  },
  navbarLowListItems: {
    marginTop: '1.5rem'
  }
});

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <AppBar style={{background:"#2E2E2E"}}>
          <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="end"
               >
                <MenuIcon />
              </IconButton>
            <ul className = {styles.nav}>
              <li className = 'navbar-li'><img src = {logo} alt = 'logo'/></li>
            </ul>
          <Drawer
            anchor="left"
            open={open}
          >
            <div>
              <IconButton onClick={handleDrawerClose}>
                <ClearIcon/>
              </IconButton>
            </div>
            <div className={classes.list}>
            <List>
              <ListItem className={classes.navbarLowListItems}>
                <HomeIcon/>
                <Link href="/"><a className={classes.navbarLowLinks} onClick={handleDrawerClose}>Home</a></Link>
              </ListItem>
            </List>
          </div>
          </Drawer>
          </Toolbar>
        </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
