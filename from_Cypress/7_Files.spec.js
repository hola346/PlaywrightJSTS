import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

const url = 'https://api.mydummyapi.com/categories/crypto';
const url2 = 'https://api.mydummyapi.com/todos';
const filePath = '../Fixtures/file.json';

test.describe('Write/Read @file', () => {
    test('Add API response to a JSON file', async ({ page }) => {
        let json = await (await page.request.get(url)).json();
        console.log(json);
        fs.writeFile(filePath, JSON.stringify(json, null, 2));
    });



    test('Add line - SKIP OK', () => { // this works, but in JSON file, it is not possible to have comments, so we cannot add a line with // and then remove it. We would need to add a line with a specific word and then filter it out.

        fs.appendFile(filePath, '//Info Hub for Testers\n');

    });

    test('Remove line - SKIP OK', async () => { // this works, but in JSON file, it is not possible to have comments, so we cannot add a line with // and then remove it. We would need to add a line with a specific word and then filter it out.
        let content = await fs.readFile(filePath, 'utf-8');

        // Remove the specific line
        content = content.replace('//Info Hub for Testers\n', '');

        // Write back
        await fs.writeFile(filePath, content);
    });

    test('Upgrade JSON', async ({ page }) => {
        let json2 = await (await page.request.get(url2)).json();
        console.log(json2);
        fs.appendFile(filePath, JSON.stringify(json2, null, 2));
    });


});