import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

/*
log = {
      date: Moment(this.state.selectedDate).format("Do MMM"),
      mealType: this.state.selectValue.mealType,
      mealOption: this.state.mealOption,
      category: {
        r: this.state.totalResident > 0 ? this.state.totalResident : 0,
        g: this.state.totalGuest > 0 ? this.state.totalGuest : 0,
        hd: this.state.totalHomeDelivery > 0 ? this.state.totalHomeDelivery : 0
      }
    }
*/
export default function ComplexGrid({ log }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {log.mealOption}
                  {log.mealType !== "None" ? ` | ${log.mealType}` : ""}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Resident : {log.category.r}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Guest : {log.category.g}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Home Delivery : {log.category.hd}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{log.date}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
