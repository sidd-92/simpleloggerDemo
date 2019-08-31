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
import Badge from "@material-ui/core/Badge";
import ComplexGrid from "./Components/ComplexCard";
import ExpansionPanels from "./Components/ExpansionPanels";
import Moment from "moment";
import MomentUtils from "@date-io/moment";
import axios from "axios";
import FullScreenDialog from "./Components/FullScreenModal";
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
      selectValue: { mealType: "None" },
      mealOption: "Beverage",
      totalResident: "",
      totalGuest: "",
      totalHomeDelivery: "",
      openSnackBar: false,
      addedLogs: []
    };
  }
  componentDidMount() {
    /*
    let log = {
      date: Moment(this.state.selectedDate).format("Do MMM YY"),
      mealType: this.state.selectValue.mealType,
      mealOption: this.state.mealOption,
      category: {
        r: this.state.totalResident > 0 ? this.state.totalResident : 0,
        g: this.state.totalGuest > 0 ? this.state.totalGuest : 0,
        hd: this.state.totalHomeDelivery > 0 ? this.state.totalHomeDelivery : 0
      }
    };
    */
    /*
    dateLogged: "2019-07-08T00:00:00.000Z"
    isBeverage: true
    mealType: "None"
    totalGuest: 0
    totalHD: 2
    totalResident: 0
     */
    axios.get(`http://192.168.86.250:9000/logs`).then(res => {
      const { count, logs } = res.data;
      console.log("Logs", ...logs);
      console.log("Count", count);
      let newLogArray = [];
      logs.map(log => {
        let newLog = {
          date: Moment(log.dateLogged).format("Do MMM YY"),
          mealType: log.mealType,
          mealOption: log.isBeverage ? "Beverage" : "Food",
          category: {
            r: log.totalResident,
            g: log.totalGuest,
            hd: log.totalHD
          }
        };
        newLogArray.push(newLog);
      });
      this.setState({
        addedLogs: [...this.state.addedLogs, ...newLogArray]
      });
    });
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
      date: Moment(this.state.selectedDate).format("Do MMM YY"),
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
    this.setState(
      {
        addedLogs: [...this.state.addedLogs, log],
        openSnackBar: true,
        tabValue: 1
      },
      this.resetFields()
    );
  };
  resetFields = () => {
    this.setState({
      selectedDate: new Date(),
      selectValue: { mealType: "None" },
      mealOption: "Food",
      totalResident: "",
      totalGuest: "",
      totalHomeDelivery: ""
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
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              Food Logger
            </Typography>
            <FullScreenDialog />
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
            <Tab
              label={
                <Badge
                  className="badgeCount"
                  color="secondary"
                  badgeContent={this.state.addedLogs.length}
                >
                  View Logs
                </Badge>
              }
            />
            {this.state.addedLogs.length > 0 ? (
              <Tab label="Summary" />
            ) : (
              <Tab disabled label="Summary" />
            )}
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
                disableFuture={true}
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
                <MenuItem value={"None"}>None</MenuItem>
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
                {selectValue.mealType !== "None" && (
                  <FormControlLabel
                    value="Food"
                    control={<Radio />}
                    label="Food"
                  />
                )}

                <FormControlLabel
                  value="Beverage"
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
              <ComplexGrid key={i} log={log} />
            ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ExpansionPanels />
        </TabPanel>
      </React.Fragment>
    );
  }
}

export default App;
