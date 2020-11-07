import React from "react";
import { Layout } from "./Layout";
import "../css/custom.css";
import workflowData from './workflowData';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

export default function Home() {
  const rows = workflowData;

  return (
    <>
      <Layout>
        <h1 className="text-left">Workflow System</h1>
        <h2 className="text-left home-subheader">Contract: AS4000</h2>
        <h3 className="text-left">Workflow Register</h3>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Workflow Title</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.workflowTitle}</TableCell>
                  <TableCell align="right">{row.action ? <Link to="/workflows/payment-claim"><Button variant="contained" color="primary">Open</Button></Link> : <Button variant="contained" disabled>Disabled</Button>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>{" "}
    </>
  );
}
