import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Layout } from "./Layout";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 300,
  },
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  step: {
    width: "100%",
    margin: 50,
    alignItems: "center",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[700],
  },

  paper: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginBottom: 300,
  },
}));

const tiers = [
  {
    title: "Workflow 1",
    description: ["Payment"],
    buttonText: "Start",
    buttonVariant: "outlined",
  },
  {
    title: "Workflow 2",
    description: ["Workflow2"],
    buttonText: "Start",
    buttonVariant: "outlined",
  },
  {
    title: "Workflow 3",
    description: ["Workflow3"],
    buttonText: "Start",
    buttonVariant: "outlined",
  },
  {
    title: "Workflow 4",
    description: ["Workflow4"],
    buttonText: "Start",
    buttonVariant: "outlined",
  },
  {
    title: "Workflow 5",
    description: ["Workflow5"],
    buttonText: "Start",
    buttonVariant: "outlined",
  },
];

export default function LoginForm() {
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const classes = useStyles();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      id: "573cf6e7-8caf-46f2-9805-bab6771066f2",
      claim_title: "claim title test",
      submitted_by: name,
      amount: amount,
      contract_id: "f8511f21-9d77-45c9-b0c3-fd0b2697c747",
      principal_id: "3d48d94c-9b1f-451a-b6cb-690f87789c60",
      superintendent_id: "9e8c8da9-4e47-4f7f-b32e-1628eddc5b8c",
    };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let result = await axios.post(
      "https://b8l77g698i.execute-api.eu-central-1.amazonaws.com/Stage/execution",
      { data },
      headers
    );
    console.log(result.data);
    alert("Payment claim has been submitted!");
  };
  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit} className={classes.title}>
          <Typography component="h1" variant="h2">
            Workflow System
          </Typography>
          <Typography component="h1" variant="h4">
            AS4000
          </Typography>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoFocus
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="claim title"
                  label="Claim Title"
                  type="text"
                  id="claimTitle"
                />
              </form>
            </div>
          </Container>

          <Container maxWidth="md" component="main" className={classes.step}>
            <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid
                  item
                  key={tier.title}
                  xs={12}
                  sm={tier.title === "Enterprise" ? 12 : 6}
                  md={4}
                >
                  <Card className={classes.card}>
                    <CardHeader
                      title={tier.title}
                      subheader={tier.subheader}
                      titleTypographyProps={{ align: "center" }}
                      subheaderTypographyProps={{ align: "center" }}
                      action={tier.title === "Pro" ? <StarIcon /> : null}
                      className={classes.cardHeader}
                    />
                    <CardContent className={classes.cardContent}>
                      <ul>
                        {tier.description.map((line) => (
                          <Typography
                            component="li"
                            variant="subtitle1"
                            align="center"
                            key={line}
                          >
                            {line}
                          </Typography>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant={tier.buttonVariant}
                        color="primary"
                      >
                        {tier.buttonText}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="rem_sub">
              <form className={classes.form} noValidate>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </Container>
        </form>
      </Layout>
    </div>
  );
}
