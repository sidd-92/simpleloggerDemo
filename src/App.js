import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./Components/TabPanel";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      selectedDate: new Date()
    };
  }
  handleTabChange = (e, v) => {
    this.setState({ tabValue: v });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  render() {
    const { tabValue, selectedDate } = this.state;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Food Logger
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper square>
          <Tabs
            variant="fullWidth"
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, v) => this.handleTabChange(e, v)}
            aria-label="disabled tabs example"
          >
            <Tab label="Add New Log" />
            <Tab label="View Added Logs" />
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="subtitle1" component="p" align="center">
            Enter The Details Below
          </Typography>
          <Paper elevation={2} className="addPaper">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                id="mui-pickers-date"
                label="Select a Date"
                value={selectedDate}
                onChange={date => this.handleDateChange(date)}
                onAccept={date => this.handleDateChange(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Paper>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Item Two
        </TabPanel>
      </React.Fragment>
    );
  }
}

export default App;
