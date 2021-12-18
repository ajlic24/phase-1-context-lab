function createEmployeeRecord([firstName, familyName, title, payRate]) {
    return {
        'firstName': firstName,
        'familyName': familyName,
        'title': title,
        'payPerHour': payRate,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(ele => createEmployeeRecord(ele))
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return this
}
let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")
// console.log(createTimeInEvent(bpRecord, "2014-02-28 1400"))

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return this
}

function hoursWorkedOnDate(date) {
    let timeOut;
    let timeIn;
    this.timeOutEvents.forEach(element => {
        if (element.date === date) {
            timeOut = element.hour
        }
    });
    this.timeInEvents.forEach(element => {
        if (element.date === date) {
            timeIn = element.hour
        }
    })
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date) {
    let payRate = this.payPerHour
    let multiplier = hoursWorkedOnDate.call(this, date)
    return payRate * multiplier

}

function findEmployeeByFirstName(arr, first) {
    let value;
    arr.forEach(ele => {
        if (ele.firstName === first) {
            value = ele
        } 
    })
    return value
}

// function calculatePayroll(employees) {
//     return employees.reduce((m, e) => m + allWagesFor.call(e), 0)
// }

function calculatePayroll(employees) {
    let arr = []
    employees.forEach(ele => {
       arr.push(allWagesFor.call(ele))
    })
    return arr.reduce((a, b) => a + b, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */



function allWagesFor() {
    console.log(this)
    const eligibleDates = this.timeInEvents.map(function (e) {
        console.log(e)
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
