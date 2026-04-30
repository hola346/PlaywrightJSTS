
const a = true

if (!a) {
    console.log("if is true");
} else {
    console.log("if is false");
}

i = 0;

while (i <= 10) {
    console.log(i);
    i++;
}

for (let i = 0; i <= 10; i++) {
    console.log(i);
}
// do while loop: the code block will be executed at least once, and then the condition will be checked. If the condition is true, the code block will
// be executed again, and this process will continue until the condition is false.
// normally run for if you know the number of iterations and condition is numeric, while loop is used when you don't know the number of iterations and 
// condition is not numeric, and do while loop is used when you want to execute the code block at least once.

i = 0;
do {
    console.log(i);
    i++;
} while (i <= 10);

// program to discover mutliples of 2 and 3 from 1 to 20

for (let i = 0; i <= 200; i++) {
    if ((i % 2 == 0) && (i % 15 == 0) && (i>99)){
        console.log(`number  ${i} is multiple of 2 and 15`);
        break;
    }
}

n=0
for (let i = 0; i <= 20; i++) {
    if ((i % 4 == 0) || (i % 7 == 0)) {
        console.log(`number  ${i} is multiple of 4 OR 7`);
        n++
    }
}
console.log(`there are  ${n} numbers multiple of 4 OR 7 between 0 and 20`);

a = 5
console.log(5 % 3)