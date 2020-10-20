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
  { title: " Payment Claim", url: "/" },
  { title: "Executions", url: "/execution-list" },
  { title: "Under construction", url: "#" },
  { title: "Under construction", url: "#" },
  { title: "Under construction", url: "#" },
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
        {sections.map((section, index) => (
          <NavLink
            color="inherit"
            noWrap
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
