import React, { Component } from "react";

class App extends Component {
  state = {
    date: "",
    result: null
  };

  onDateChanged = e => {
    this.setState({ date: e.target.value });
  };

  separateDateSection = () => {
    let [year, month, day] = this.state.date.split("-");
    return { day: parseInt(day), month: parseInt(month), year: parseInt(year) };
  };

  onCalculateDate = () => {
    // alert user to fill date
    if (this.state.date === "") {
      return alert("Enter your date before.");
    }

    // Seperate date in string to 3 int variables
    const { day, month, year } = this.separateDateSection();

    // alert if date year lower than 1900
    if (year < 1900) {
      return alert("This year is out of range");
    }

    // Define Weekdays Name
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    // Define total day for each month
    const eachMonthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check what date is plus from 1900
    const yearDiff = year - 1900;

    // includes leap year to difference year date
    const dateShift = yearDiff + Math.floor(yearDiff / 4);

    // total of day in this year before current month
    const monthLength = eachMonthDate.reduce((prev, curr, index) => {
      // Skip current month or month that more than current
      if (index >= month - 1) {
        return prev;
      }

      // Plus 1 day if it's a leap year
      if (year % 4 === 0 && year !== 1900) {
        prev += 1;
      }

      // Plus all day in previous month
      prev += curr;

      return prev;
    }, 0);

    // Summary of day in this year and day was shifted after pass old years.
    const totalDate = dateShift + monthLength + day;

    // Modulus day to get index of weekdays
    const dayInWeekday = totalDate % 7;

    // Set Weekday to state for display
    this.setState({
      result: weekdays[dayInWeekday]
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "60vh"
        }}
      >
        <h1 style={{ marginBottom: 0 }}>What weekday is today?</h1>
        <span style={{ marginBottom: "1em" }}>
          (Range of years is start from 1900 afterward)
        </span>
        <div>
          <label htmlFor="date">Enter date : </label>
          <input
            id="date"
            type="date"
            value={this.state.date}
            onChange={this.onDateChanged}
            style={{ border: "none", borderBottom: "1px solid black" }}
          />
        </div>
        <button
          style={{
            border: "1px solid black",
            background: "#fff",
            padding: 15,
            marginTop: 20
          }}
          onClick={this.onCalculateDate}
        >
          Calculate this date to weekday
        </button>
        <h4>
          {this.state.result
            ? `This date is ${this.state.result}`
            : "Result will show at this field"}
        </h4>
      </div>
    );
  }
}

export default App;
