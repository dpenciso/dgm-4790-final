import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Email from '../Email/Email'
import './ButtonAppBar.css'
import { Link } from 'react-router-dom';


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
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <header>
              <nav>
                <ul>
                  <li><Link className='link' to="/">Home</Link></li>
                  <li><Link className='link' to="/amiibos">Amiibos</Link></li>
                  <li><Link className='link' to="/zelda">Zelda</Link></li>
                  <li><Link className='link' to="/contact">Contact</Link></li>
                </ul>
              </nav>
            </header>
          </Typography>
          <Button color="inherit"><Email/></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}