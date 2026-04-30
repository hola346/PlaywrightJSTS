console.log("Hello World!");

console.log("Goodbye World!");

// comments. 
/*
This is a multi-line comment.
*/

// variables: you don't need to declare var type, you can just use let or const to declare a variable.
let name = "John";
let age1 = 30.256;
const age = 30;
console.log(typeof(name)); // string
console.log(typeof(age1)); // number

// diff between var, let and const: var is function-scoped, while let and const are block-scoped. This means that variables declared with var are accessible 
// throughout the entire function in which they are declared, while variables declared with let and const are only accessible within the block in which they are 
// declared. Additionally, variables declared with var can be redeclared and reassigned, while variables declared with let can be reassigned but not redeclared, 
// and variables declared with const cannot be redeclared or reassigned.

// difference between let and const is that let can be reassigned, while const cannot be reassigned. However, both let and const can be mutated 
// if they are objects or arrays. For example, you can push a new value to an array declared with const, but you cannot reassign the entire array to a new value.
//  Similarly, you can change the properties of an object declared with const, but you cannot reassign the entire object to a new value.

a = true;
console.log(typeof(a)); // boolean

b = null;
console.log(typeof(b)); // object

console.log(!a); // false