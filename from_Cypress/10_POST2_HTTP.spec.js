import { test, expect } from '@playwright/test';

const endpoint = 'https://api.mydummyapi.com/todos'
const todoObject = { "id": 51, "title": "POST with PW", "completed": true, "userId": 39 }
const patchObject = { "id": 51, "title": "PATCH with PW", "completed": false, "userId": 99 }


const addTodo = async (page, todoObject) => {
    await page.request.post(endpoint, { data: todoObject });
};

const updateTodo = async (page, patchObject) => {
    await page.request.patch(`${endpoint}/${todoObject.id}`, { data: patchObject });
};
const deleteTodo = async (page, ObjectToDelete) => {   //defines método AÑADIR elemento definido antes, recuerda estructura - elemento es el param entrada
    await page.request.delete(`${endpoint}/${ObjectToDelete.id}`);
};

test.describe('POST demo @post2', () => {
    test('COUNT todos Previous UPDATE', async ({ page }) => {
        const response = await page.request.get(endpoint);
        const json = await response.json();
        expect(json).toHaveLength(50);
        console.log(`DEBUG: The response count is ${json.length}`);

    });

    test('add todo', async ({ page }) => {
        await addTodo(page, todoObject);

        const response2 = await page.request.get(`${endpoint}/${todoObject.id}`);
        const json2 = await response2.json();
        expect(json2).toStrictEqual(todoObject);

        const response = await page.request.get(endpoint);
        const json = await response.json();
        expect(json).toHaveLength(51);
        console.log(`DEBUG: The response count after ADD is ${json.length}`);

    });

    test('UPDATE todo', async ({ page }) => {
        await updateTodo(page, patchObject);

        const response = await page.request.get(`${endpoint}/${patchObject.id}`);
        const json = await response.json();
        expect(json).toStrictEqual(patchObject);

        const response2 = await page.request.get(endpoint);
        const json2 = await response2.json();
        expect(json2).toHaveLength(51);
        console.log(`After Update - Patch length is still ${json2.length}`);

    });

    test('DELETE todo', async ({ page }) => {
        await deleteTodo(page, patchObject);

        const response = await page.request.get(endpoint);
        const json = await response.json();
        expect(json).toHaveLength(50);
        console.log(`back to normal: ${json.length}`);

    });
});