import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(7),
    flexShrink: 0,
    fontSize: "20px",
  },
}));

const sections = [
  // { title: " Payment Claim", url: "/" },
  { title: "Workflows", url: "/" },
];

export default function NavMenu() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <NavLink
          color="inherit"
          key="123"
          to="/"
          className=""
          style={{ textDecoration: "none" }}
        >
          <img src="https://res.cloudinary.com/dkx2eayab/image/upload/v1586504148/mastt/logos/mastt_logo_dark_oi2lul.png" width="180px" />
        </NavLink>
        {sections.map((section, index) => (
          <NavLink
            color="inherit"
            key={index}
            to={section.url}
            className={classes.toolbarLink}
            style={{ textDecoration: "none" }}
          >
            {section.title}
          </NavLink>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
