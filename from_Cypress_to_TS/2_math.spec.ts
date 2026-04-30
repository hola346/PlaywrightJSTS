import { test, expect } from '@playwright/test';

// We define the types for the parameters (a and b) and the return value
const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const divide = (a: number, b: number): number => a / b;
const multiply = (a: number, b: number): number => a * b;

test.describe("math natural numbers @math", () => {
    test('add positive numbers', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('subtract numbers', () => {
        expect(subtract(4, 2)).toBe(2);
    });

    test('divide numbers', () => {
        expect(divide(4, 2)).toBe(2);
    });

    test('multiply numbers', () => {
        expect(multiply(4, 2)).toBe(8);
    });
});

test.describe('Math with DECIMAL numbers @math', () => {
    test('add positive decimal numbers', () => {
        // toBeCloseTo is perfect here. 
        // In TS, 3.4 is inferred as a number type.
        expect(add(1.2, 2.2)).toBeCloseTo(3.4, 3); 
    });

    test('subtract decimal numbers', () => {
        expect(subtract(2.5, 2.2)).toBeCloseTo(0.3, 3);
    });
});