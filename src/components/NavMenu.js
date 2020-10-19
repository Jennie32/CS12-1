import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(7),
    flexShrink: 0,
  },
}));

const sections = [
  { title: ' Payment Claim', url: '/' },
  { title: 'Executions', url: '/execution-list' },
  {title: 'To develop...', url: '#' },
  {title: 'To develop...', url: '#' },
  {title: 'To develop...', url: '#' }
];


export default function NavMenu() {
  const classes = useStyles();

  return (

    <React.Fragment>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      
      
    </React.Fragment>

   
  );
}