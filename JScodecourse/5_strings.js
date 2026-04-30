
let day = "Monday "

console.log(day.length) //7

day2 = day.slice(1, 4)
console.log(day2) // ond

console.log(day[1]) //o
console.log(day.slice(1, 4)) // prints chars of string, but does not modify string
console.log(day)

// split string:
Mon = day.slice(0, 3)
console.log(Mon)
Day = day.slice(3, 6)
console.log(Day)
//OR:
let split_array = day.split("n") //losses the n
let split_array2 = day.split(/(n)/) // not losing n
console.log(split_array)
console.log(split_array2)


date1 = "13"
date2 = "30"
console.log(parseInt(date1) > parseInt(date2)) // make strings numbers

Num = parseInt(date1) + parseInt(date2)
console.log(Num)
console.log(Num.toString())

// remember TRIM to CUT FINAL 

let date3 = date1.concat(date2)
console.log(date3)
// concat
let date4 = date1 + date2
console.log(date4)

let hello = "tomorrow is " + day
console.log(hello)

let day1 = "Monday "
let day4 = "Tuesday " // DON'T REDECLARE SAME VARIBLE - 2 LETs. 
let day3 = "Wednesday "
midweek = day1 + day4 + day3
console.log(midweek)

console.log(midweek.indexOf("day", 12)) // If many days, start counting from 12. 

// write a program counting how many "days" are in string

//while i
