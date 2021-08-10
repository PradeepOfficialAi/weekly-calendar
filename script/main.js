let currentDateFor = moment()
currentdate = new Date();
var oneJan = new Date(currentdate.getFullYear(),0,1);
var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
let enterCurrentDate = currentDateFor.format('DD')
let enterCurrentWeek = currentDateFor.format('MM')
let enterCurrentYear = currentDateFor.format('YYYY')
let currentWeekNumber = result
let currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
let weekStart = currentDate.clone().startOf('week')
let weekEnd = currentDate.clone().endOf('week')
let currentDay = []
let prevWeek
let nextWeek
let weekPrev = 0
let weekNext = 0
let currentWeek = 0

document.getElementsByClassName('input1')[0].value = currentWeekNumber
document.getElementsByClassName('input2')[0].value = enterCurrentYear

function resetActive() {
    currentWeekNumber = result
    currentDateFor = moment()
     enterCurrentDate = currentDateFor.format('DD')
     enterCurrentWeek = currentDateFor.format('MM')
     enterCurrentYear = currentDateFor.format('YYYY')
     currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
    weekStart = currentDate.clone().startOf('week')
    displayFunc(weekStart)

    currentWeek = 0
    weekPrev = 0
    weekNext = 0
    currentDay = []
}

function updateWeekYear(value, defType) {
    const node = document.getElementsByClassName(`${value}`)[0];
    node.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            console.log(document.getElementsByClassName(`${value}`)[0].value);
            if (defType === 'year') {
                let findDays = (currentWeekNumber * 7)
                enterCurrentDate = currentDateFor.dayOfYear(findDays)._d.getDate()
                enterCurrentYear = document.getElementsByClassName(`${value}`)[0].value
            } else if(defType === 'week') {
                let findMonth = document.getElementsByClassName(`${value}`)[0].value
                currentWeekNumber = findMonth
                let findDays = (findMonth * 7)
                enterCurrentWeek = Math.ceil(findDays/30)
                enterCurrentDate = currentDateFor.dayOfYear(findDays)._d.getDate()
            }
            currentDate = moment(`${enterCurrentYear}-${enterCurrentWeek}-${enterCurrentDate}`)
            weekStart = currentDate.clone().startOf('week')
            displayFunc(weekStart)
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
    if ('add' === method) {
        document.getElementsByClassName('input1')[0].value = currentWeekNumber+=1
        nextWeekFunc(value, currentWeek)
    } else if('sub' === method) {
        document.getElementsByClassName('input1')[0].value = currentWeekNumber-= 1
        prevWeekFunc(value, currentWeek)
    }
}
function displayFunc(weekDays) {
    document.getElementsByClassName('input1')[0].value = currentWeekNumber
    document.getElementsByClassName('input2')[0].value = enterCurrentYear
    for (let index = 0; index <= 6; index++) {
        console.log(moment(weekDays).add(index, 'days').format("DD MM"));
        currentDay.push(moment(weekDays).add(index, 'days').format("DD"))
    }
    var html = "<table id='mockup'><th>Sun</th><th>Mon</th><th>Tue</th> <th>Wed</th> <th>Thu</th> <th>Fri</th> <th>Sat</th><tr>";
    currentDay.forEach((entry) => {
                html += "<td>" + entry + "</td>";
    });
    html += "</tr></table>";
    document.getElementById("result").innerHTML = html;
    currentDay = []
}
displayFunc(weekStart)



