import React, {useMemo, useState} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';
import useBombStats from '../../hooks/useBombStats';
import useBtcStats from '../../hooks/useBtcStats';
import useShareStats from '../../hooks/usebShareStats';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AccountButton from './AccountButton';

import gaiaLogo from '../../assets/logos/gaia-logo.png';
import gaiaCoinLogo from '../../assets/logos/gaia.png';
import {roundAndFormatNumber} from '../../0x';
import TokenSymbol from '../TokenSymbol';
//import TokenSymbol from '../TokenSymbol';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#f9d749',
    'background-color': '#171923',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    fontFamily: 'Rubik',
    fontSize: '0px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#f9d749',
    fontSize: '18px',
    marginTop: '15px',
    margin: theme.spacing(10, 1, 1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#f9d749',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const bombStats = useBombStats();
  const btcStats = useBtcStats();
  const shareStats = useShareStats();

 // const [connected, setConnected] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const btcPriceInDollars = useMemo(() => (btcStats ? Number(btcStats).toFixed(2) : null), [btcStats]);
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const sharePriceInDollars = useMemo(
    () => (shareStats ? Number(shareStats.priceInDollars).toFixed(2) : null),
    [shareStats],
  );

  // const activeNavStyle = {
  //   backgroundColor: '#000'
  // }

  const [navActive, setNavActive] = useState(false)

  function handleScroll() {
    if(window.scrollY >= 89){
      setNavActive(true)
    }else{
      setNavActive(false)
    }
  }

  window.addEventListener('scroll', handleScroll)

  return (
    <nav  className="fixed w-full pt-2 px-5  z-50 h-20 " style={{background: navActive ? '#1C1800' : 'transparent'}}>   
     
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            {/* <Typography variant="h6" color="inherit" noWrap style={{flexGrow: '0'}} className={classes.toolbarTitle}> */}
              {/* <a className={ classes.brandLink } href="/">Bomb Money</a> */}
              <Link to="/" color="inherit">
                <img alt="bomb.money" src={gaiaLogo} className="w-32 " />
              </Link>
            {/* </Typography> */}
            <Box style={{paddingLeft: '15px', paddingTop: '10px', fontSize: '1rem', flexGrow: '1'}}>
              <Link to="/" className={'navLink ' + classes.link}>
                Home
              </Link>
              <Link to="/boardroom" className={'navLink ' + classes.link}>
                Boardroom
              </Link>
              <Link to="/bond" className={'navLink ' + classes.link}>
                Bond
              </Link>
              <Link to="/farm" className={'navLink ' + classes.link}>
                Farm
              </Link>

              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
              <a href="https://docs.gaiafinance.io/" className={'navLink ' + classes.link} rel="noopener noreferrer" target="_blank">
                Docs
              </a>
                {/* <a href="https://bomb.farm" className={'navLink ' + classes.link} rel="noopener noreferrer" target="_blank">
                AutoVaults
              </a> */}
            </Box>

          <div className="bg-gaiagray p-5 py-2 rounded-md rounded-t-none flex absoulte top-0 right-10 -mt-2 items-center justify-between space-x-10 w-72 absolute">
            <Box
              style={{
                flexGrow: '0',
                // paddingLeft: '15px',
                // paddingTop: '5px',
                fontSize: '1rem',
                // paddingRight: '15px',
                // height: 'max',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img
              alt="bomb.money"
              src={gaiaCoinLogo}
              style={{height: '40px', }}
            />
              
              <div className="navTokenIcon bomb"></div>{' '}
              <div className="navTokenPrice ml-2 text-white font-bold">${roundAndFormatNumber(Number(bombPriceInDollars), 2)}</div>
              {/* <div className="navTokenIcon bshare"></div>{' '}
              <div className="navTokenPrice">${roundAndFormatNumber(Number(sharePriceInDollars), 2)}</div>
              <div className="navTokenIcon btc"></div>{' '}
              <div className="navTokenPrice">${roundAndFormatNumber(Number(btcPriceInDollars), 2)}</div> */}
            </Box>
            <AccountButton text="Connect" />
          </div>
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <img
              alt="bomb.money"
              src={gaiaLogo}
              style={{height: '40px', marginTop: '-10px', marginLeft: '10px', marginRight: '15px'}}
            />
            <AccountButton text="Connect" />
            <Drawer
                className={classes.drawer}
                onClose={handleDrawerClose}
              // onEscapeKeyDown={handleDrawerClose}
              // onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? (
                    <ChevronRightIcon htmlColor="white" />
                  ) : (
                    <ChevronLeftIcon htmlColor="white" />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem>
                  <AccountButton text="Connect" />
                </ListItem>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farm" to="/farm" />
                <ListItemLink primary="Boardroom" to="/boardroom" />
                <ListItemLink primary="Bond" to="/bond" />
                {/* <ListItemLink primary="SBS" to="/sbs" /> */}
                {/* <ListItemLink primary="Liquidity" to="/liquidity" /> */}
                {/* <ListItemLink primary="Regulations" to="/regulations" /> */}
                <ListItem button component="a" href="https://docs.bomb.money">
                  <ListItemText>Docs</ListItemText>
                  </ListItem>
                   <ListItem button component="a" href="https://bomb.farm">
                  <ListItemText>AutoVaults</ListItemText>
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </nav>
  );
};

export default Nav;
