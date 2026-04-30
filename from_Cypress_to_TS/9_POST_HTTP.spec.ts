import { test, expect, Page } from '@playwright/test';

const endpoint = 'https://api.mydummyapi.com/categories/animals'; // web animals todo - elementos

const animalObject = {
    "id": 21, "type": "PW", "name": "PW",  //def de nuevo elemento a añadir
    "habitat": "in2222", "image": "https://loremflickr.com/640/480/sfssf?lock=1803067255160832"
};

const addAnimal = async ({ page, animalObject }: { page: Page; animalObject: Object }) => {   //CAREFUL: page needs to be used. ALSO, NO {}
    await page.request.post(endpoint, { data: animalObject });
};

test.describe('POST demo New Animal @post', () => {
    test('add Animal', async ({ page }) => {

        await addAnimal({ page, animalObject });
        const response = await page.request.get(`${endpoint}/${animalObject.id}`);
        const json = await response.json();

        expect(json).toStrictEqual(animalObject);
        console.log(json);
    });
});