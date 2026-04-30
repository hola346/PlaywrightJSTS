

function summ(a, b) {
    return a + b;
}

sum = summ(3, 4)
console.log(sum)

// In anonymous function: IN => OUT

let sum2 = (a, b) => a + b
console.log(sum2(12, 1))

// check var, let, const, regarding global, function, blocks. 

/*
VARIABLES: 
•	VAR is in global or function level
•	LET is in global or block – {} level  will not be visible outside of the block. 
•	CONST: cannot be modified
*/