
a = { "hi": "bye", "huevos": "cojones" }
b = [1, 3, "hola"] // array
//c=()

console.log(typeof (a))
console.log(typeof (b))

let array = Array(3)
array = new Array(1, 3, "hola")


console.log(`Are array and b equals?? --> ${b == array}`) // this is false, both are objects, do not compare content-value. 

console.log(b[1]);

b[1] = "Changed!";

console.log(`this is length: ${b.length}`)

b.push("perras") // add at the end

console.log(b)

b.pop() // removes at the end
console.log(b)

b.unshift("beginning")
console.log(`this is the unshift: ${b} `)

b.shift()
console.log(b) // removes 1st

console.log(b.indexOf("hola"))

console.log(b.includes(1))

console.log(b)

b.push("peras", "manzanas", "limones")
console.log(b)

// Create subarray from previous' components - till 4-1
b2 = b.slice(2, 4)
console.log(`I'm printing b2 - slice: ${b2}`)

//loop prints all elements of array:
sum = 0
for (let i = 0; i < b.length; i++) {
    console.log(`print all elements from array in for: ${b[i]}`);
}

b2 = [2, 4, 5, 6, 7, 78, 4, 9, 121]
for (let i = 0; i < b2.length; i++) {
    sum = sum + (b2[i]);
}
console.log(sum);

sum = 0
console.log(b2.reduce((sum, marks) => sum + marks, 0)) // reduce method does the same thing, suitable to modify/accumuolate values
console.log(b2.reduce((sum, marks) => sum + marks, 0) / b2.length) //average

//print even numbers:
even = []
for (let i = 0; i < b2.length; i++) {
    if (b2[i] % 2 == 0) {
        even.push(b2[i]);
    }
}
console.log(even)

//you can do that with filter:
neweven = []
neweven.push(b2.filter(n => n % 2 === 0));
console.log(`filtering even: ${neweven}`) // suitable to filter values, not really modifying

//map: modify all ARRAY values: EX: multiply x2 all even values:

let doubleeven = [];
doubleeven.push(b2.filter(n => n % 2 === 0).map(n => n * 2));
//doubleeven2=doubleeven.map(x => x*2)
console.log(`DOUBLE filtering even: ${doubleeven}`)


let sum2 = doubleeven.reduce((sum, n) => sum + n, 0);
//let sum2=doubleeven.reduce((sum, marks) => sum + marks, 0)
console.log(sum2)

// concatenate:
console.log("-----------------------------")
b3 = [2, 4, 5, 6, 7, 78, 4, 9, 121]
let newvar = b3.filter(n => n % 2 === 0).map(m => m * 2).reduce((sum, o) => sum + o, 0);
console.log(newvar)

//sorting: srings
fruits=["orange","lemon","potato","banana"]
console.log(fruits.sort())
console.log(fruits.reverse())
b4 = [2, 4, 5, 6, 7, 78, 4, 9, 121]
console.log(b4.sort((a, b) => a - b)) //sorting as numbers
console.log(b4.reverse((a, b) => b - a)) 