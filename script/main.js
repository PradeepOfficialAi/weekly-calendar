var d = new Date();
var date = d.getDate();
var day = d.getDay();

// var weekOfMonth = Math.ceil((date - 0 - day) / 7);
console.log(date, day);

let currentDateFor = moment()

let enterCurrentDate = currentDateFor.format('DD')
let enterCurrentWeek = currentDateFor.format('MM')
let enterCurrentYear = currentDateFor.format('YYYY')

// console.log(enterCurrentDate, enterCurrentWeek, enterCurrentYear, "Current Date is", moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`));
let currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)

console.log(currentDate);

let weekStart = currentDate.clone().startOf('week')
let weekEnd = currentDate.clone().endOf('week')

let prevDays = []
let currentDay = []
let nextDay = []
let prevWeek
let nextWeek
let weekPrev = 0
let weekNext = 0
let currentWeek = 0



function updateWeekYear(value) {
    const node = document.getElementsByClassName(`${value}`)[0];
    node.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            console.log(document.getElementsByClassName(`${value}`)[0].value);
            enterCurrentYear = document.getElementsByClassName(`${value}`)[0].value
            currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
        }
    })
}



function nextWeekFunc(value, weekNextIn) {
    if (weekNextIn === 0) {
        prevWeekFunc(value, weekNextIn)
    } else {
        nextWeek = currentDate.clone().add(weekNextIn, 'week').clone().startOf('week')
        weekNext += value
        displayFunc(nextWeek)
    }
}

function prevWeekFunc(value, weekPrevIn) {
    if (weekPrevIn === 0) {
        prevWeek = currentDate.clone().subtract(weekPrevIn, 'week').clone().startOf('week')
        weekPrev += value
        displayFunc(prevWeek)
    } else {
        nextWeekFunc(value, weekPrevIn)
    }
}

function updateWeek(value, method) {
    currentWeek += value
    console.log(method, currentWeek);
    if ('add' === method) {
        nextWeekFunc(value, currentWeek)
    } else if('sub' === method) {
        prevWeekFunc(value, currentWeek)
    }
    
}

function displayFunc(weekDays) {
    for (let index = 0; index <= 6; index++) {
        currentDay.push(moment(weekDays).add(index, 'days').format("DD"))
    }
    
var html = "<table id='mockup'><th>Sun</th><th>Mon</th><th>Tue</th> <th>Wed</th> <th>Thu</th> <th>Fri</th> <th>Sat</th><tr>";
currentDay.forEach((entry) => {
    // console.log(entry);
                html += "<td>" + entry + "</td>";
    });
    html += "</tr></table>";
    document.getElementById("result").innerHTML = html;
    currentDay = []
}

displayFunc(weekStart)



