// 1. Creating a single employee record from an array
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // 2. Creating multiple employee records from an array of arrays
  function createEmployeeRecords(employeeDataArrays) {
    return employeeDataArrays.map(createEmployeeRecord);
  }
  
  // 3. Creating a TimeIn event for an employee record
  function createTimeInEvent(employeeRecord, dateStamp) {
    // dateStamp is "YYYY-MM-DD HHMM"
    const [date, hourString] = dateStamp.split(' ');
    const hour = parseInt(hourString, 10);
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: hour,
      date: date
    });
    return employeeRecord;
  }
  
  // 4. Creating a TimeOut event for an employee record
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hourString] = dateStamp.split(' ');
    const hour = parseInt(hourString, 10);
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: hour,
      date: date
    });
    return employeeRecord;
  }
  
  // 5. Calculating the number of hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    // Finding the corresponding TimeIn and TimeOut events for the date
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    // Subtracting the hours and divide by 100 (since 0900 represents 9:00 AM)
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // 6. Calculating wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // 7. Calculating all wages for an employee record
  function allWagesFor(employeeRecord) {
    // Geting all dates when the employee clocked in
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    // Summing wages for each date
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }
  
  // 8. Calculating the total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  }
  
  /* ================================
     Example Usage / Testing
  
  // Uncomment the lines below to test the functions:
  
  const empData = [
    ["John", "Doe", "Developer", 30],
    ["Jane", "Smith", "Designer", 40]
  ];
  
  const employees = createEmployeeRecords(empData);
  
  // Record some time events for the first employee
  createTimeInEvent(employees[0], "2022-10-10 0900");
  createTimeOutEvent(employees[0], "2022-10-10 1700");
  
  // Record time events for the second employee
  createTimeInEvent(employees[1], "2022-10-10 1000");
  createTimeOutEvent(employees[1], "2022-10-10 1800");
  
  console.log("Hours worked by John on 2022-10-10:", hoursWorkedOnDate(employees[0], "2022-10-10"));  // Expected: 8
  console.log("Wages earned by Jane on 2022-10-10:", wagesEarnedOnDate(employees[1], "2022-10-10")); // Expected: 320
  
  console.log("Total wages for John:", allWagesFor(employees[0])); // Expected: 240
  console.log("Total Payroll:", calculatePayroll(employees));       // Expected: 240 + 320 = 560
  ================================ */
  
  