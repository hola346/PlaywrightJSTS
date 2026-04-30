import { test, expect } from '@playwright/test';

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;

test.describe("math natural numbers @math", () => {
    test('add postive numbers', () => {
        expect(add(1, 2)).toBe(3);
    });
    test('add subtract numbers', () => {
        expect(subtract(4, 2)).toBe(2);
    });
    test('add divide numbers', () => {
        expect(divide(4, 2)).toBe(2);
    });
    test('add multiply numbers', () => {
        expect(multiply(4, 2)).toBe(8);
    });
});

test.describe('Math with DECIMAL numbers @math', () => {
    test('add postive decimal numbers', () => {
        expect(add(1.2, 2.2)).toBeCloseTo(3.4, 3); //instead of eq, to avoid the problem of the precision of the decimal numbers, we use to.be.closeTo, with a delta of 0.001, which means that the result can be between 3.399 and 3.401
    });
    test('add subtract decimal numbers', () => {
        expect(subtract(2.5, 2.2)).toBeCloseTo(0.3, 3);
    });

});
