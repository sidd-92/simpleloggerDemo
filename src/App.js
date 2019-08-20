import React from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import TabPanel from "./Components/TabPanel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Moment from "moment";
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
      selectedDate: new Date(),
      selectValue: { mealType: "Breakfast" },
      mealOption: "Food",
      totalResident: "",
      totalGuest: "",
      totalHomeDelivery: "",
      openSnackBar: false,
      addedLogs: []
    };
  }
  handleTabChange = (e, v) => {
    this.setState({ tabValue: v });
  };
  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleSelectChange = (e, values) => {
    this.setState({ selectValue: { mealType: e.target.value } });
  };
  handleMealOptionChange = (e, values) => {
    this.setState({ mealOption: values });
  };
  handleChangeResident = e => {
    e.preventDefault();
    this.setState({ totalResident: e.target.value });
  };
  handleChangeGuest = e => {
    e.preventDefault();
    this.setState({ totalGuest: e.target.value });
  };
  handleChangeHomeDelivery = e => {
    e.preventDefault();
    this.setState({ totalHomeDelivery: e.target.value });
  };
  addLog = e => {
    let log = {
      date: Moment(this.state.selectedDate).format("Do MMM"),
      mealType: this.state.selectValue.mealType,
      mealOption: this.state.mealOption,
      category: {
        r: this.state.totalResident > 0 ? this.state.totalResident : 0,
        g: this.state.totalGuest > 0 ? this.state.totalGuest : 0,
        hd: this.state.totalHomeDelivery > 0 ? this.state.totalHomeDelivery : 0
      }
    };
    let newLogs = [];
    newLogs.push(log);
    this.setState({
      addedLogs: [...this.state.addedLogs, log],
      openSnackBar: true
    });
  };
  render() {
    const {
      tabValue,
      selectedDate,
      mealOption,
      selectValue,
      openSnackBar
    } = this.state;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Food Logger
            </Typography>
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={openSnackBar}
          autoHideDuration={1000}
          onClose={() => this.setState({ openSnackBar: false })}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Log Added</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({ openSnackBar: false })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
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
          <Typography
            variant="subtitle1"
            component="p"
            align="center"
            className="detailsHeader"
          >
            Enter The Details Below
          </Typography>
          <Paper elevation={2} className="addPaper">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                disablePast={true}
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
          <Paper elevation={2} className="selectPaper">
            <FormControl fullWidth>
              <InputLabel htmlFor="mealType-simple">Meal Type</InputLabel>
              <Select
                value={selectValue.mealType}
                onChange={(e, values) => this.handleSelectChange(e, values)}
                inputProps={{
                  name: "mealType",
                  id: "mealType-simple"
                }}
              >
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Snack"}>Snack</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <Paper elevation={2} className="selectPaper">
            <FormControl component="fieldset">
              <FormLabel component="legend">Beverage / Food</FormLabel>
              <RadioGroup
                row
                aria-label="Beverage / Food"
                name="mealOption"
                value={mealOption}
                onChange={(e, values) => this.handleMealOptionChange(e, values)}
              >
                <FormControlLabel
                  value="food"
                  control={<Radio />}
                  label="Food"
                />
                <FormControlLabel
                  value="beverage"
                  control={<Radio />}
                  label="Beverage"
                />
              </RadioGroup>
              <FormHelperText>Did You Have a Beverege ?</FormHelperText>
            </FormControl>
          </Paper>
          <Paper elevation={2} className="gridPaper">
            <Typography variant="caption" gutterBottom>
              Enter The Total Number Of Each Category
            </Typography>
            <Grid container spacing={3} className="gridText">
              <Grid item xs={4}>
                <TextField
                  required
                  value={this.state.totalResident}
                  type="number"
                  onChange={e => this.handleChangeResident(e)}
                  className="textField"
                  id="outlined-dense"
                  label="Res"
                  margin="dense"
                  helperText="Resident"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  value={this.state.totalGuest}
                  onChange={e => this.handleChangeGuest(e)}
                  type="number"
                  className="textField"
                  id="outlined-dense"
                  label="Guest"
                  margin="dense"
                  helperText="Guest"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  value={this.state.totalHomeDelivery}
                  onChange={e => this.handleChangeHomeDelivery(e)}
                  helperText="Home Delivery"
                  type="number"
                  className="textField"
                  id="outlined-dense"
                  label="HD"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Paper>
          <Button
            variant="contained"
            onClick={e => this.addLog(e)}
            color="primary"
            className="addButton"
          >
            Log Details
          </Button>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {this.state.addedLogs.length > 0 &&
            this.state.addedLogs.map((log, i) => (
              <div key={i}>
                <p>{log.date}</p>
              </div>
            ))}
        </TabPanel>
      </React.Fragment>
    );
  }
}

export default App;
