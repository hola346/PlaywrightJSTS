const {test, expect} = require('@playwright/test');

// in order to use test as a variable, we need to import it from the playwright test library. We can also import expect to make assertions in our tests.
test('UI Basic Test', async () => {

});

// JS behavior is asynchronous, so we need to use async/await to handle the asynchronous nature of our tests. We can also use the test function to define our test cases and the expect function to make assertions about the behavior of our application.
// if using async, then you need to use await
// contrary to other testing frameworks, Playwright does not have a beforeEach or afterEach hook. Instead, you can use the test function to define your test cases and the expect function to make assertions about the behavior of your application.
// also contrary than on Cypress, you can always use safely ()=> instead of function() to define your test cases, as Playwright does not have a this context that is shared between tests. This means that you can use arrow functions to define your test cases without worrying about the this context.