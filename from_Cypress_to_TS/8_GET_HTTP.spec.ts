import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
let todos = 'http://localhost:3000/api/todos';
let url = 'http://localhost:3000/';

test.describe('HttpGET_getJSON @get', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(url);

        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        await page.reload();

        await page.locator('.new-todo').fill('Item1');
        await page.locator('.new-todo').press('Enter');
        await page.locator('.new-todo').fill('Item2');
        await page.locator('.new-todo').press('Enter');
    });
    test('Print JSON', async ({ page }) => {

        let json = await (await page.request.get(todos)).json();
        console.log(json);

    });
    test('Body length @get', async ({ page }) => {

        let body = await (await page.request.get(url)).body();
        expect(body).toHaveLength(726);

    });

    test('status todo @get', async ({ page }) => {
        let status = await (await page.request.get(todos)).status();
        expect(status).toBe(200);
    });

    test.skip('length todos JSON @get', async ({ page }) => {
        let length = await (await page.request.get(todos)).json();
        expect(length).toHaveLength(2);
    });

    test('content type URL @get', async ({ page }) => {
        const response = await page.request.get(url);

        const h1 = response.headers()['content-type'];

        expect(h1).toContain('html');
    });

    test('content type JSON @get', async ({ page }) => {
        const response = await page.request.get(todos);

        const h2 = response.headers()['content-type'];

        expect(h2).toContain('json');
    });

    test.afterEach(async ({ page }) => {
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
    });
});

test.describe('Other Web @get', () => {

    test('test JSON length Cryptos', async ({ page }) => {
        let length2 = await (await page.request.get('https://api.mydummyapi.com/categories/crypto')).json();
        expect(length2).toHaveLength(20);
    });

    test('take JSON and compare', async ({ page }) => {
        const response1 = await page.request.get('https://api.mydummyapi.com/categories/crypto');
        expect(response1.ok()).toBeTruthy();
        const jsonVar = await response1.json();

        const response2 = await page.request.get('https://api.mydummyapi.com/categories/crypto');
        expect(response2.ok()).toBeTruthy();
        const jsonVar2 = await response2.json();

        expect(jsonVar).toStrictEqual(jsonVar2);
        //let json = await (await page.request.get('https://api.mydummyapi.com/categories/crypto')).json();
        //await expect(await (await page.request.get('https://api.mydummyapi.com/categories/crypto')).json()).toEqual(json);
    });

    test('JSON schema', async ({ page }) => {

        interface JsonElem {
            id: number;
            coin: string;
            symbol: string;
            price: string;
            change: number
        }


        const response = await page.request.get('https://api.mydummyapi.com/categories/crypto');
        expect(response.ok()).toBeTruthy();
        const sche: JsonElem[] = await response.json();

        sche.forEach(object => {
            expect(object).toHaveProperty('id');
            expect(object).toHaveProperty('coin');
            expect(object).toHaveProperty('symbol');
            expect(object).toHaveProperty('price');
            expect(object).toHaveProperty('change');
        })

    });

    test('JSON in a row', async ({ page }) => {
        const start = Date.now();

        const response = await page.request.get('https://api.mydummyapi.com/categories/crypto');
        expect(response.ok()).toBeTruthy();
        const json = await response.json();

        expect(response.status()).toBe(200);
        expect(json).toHaveLength(20);
        expect(response.headers()).toBeDefined();
        //expect(response.duration()).toBeDefined();
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(200)

    });


});