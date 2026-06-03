// Generated from: features\13_bddPhone.feature
import { test } from "playwright-bdd";

test.describe('iPhone X Product Verification', () => {

  test.describe('Verify iPhone X product is present on shop page', () => {

    test('Example #1', { tag: ['@_bddphone'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('user navigates to login page', null, { page }); 
      await When('user enters username "New_2345@newreally.com" and password "Bb/dffg3412345678"', null, { page }); 
      await Then('user is navigated to shop page', null, { page }); 
      await And('iPhone X product should be present on the page', null, { page }); 
    });

    test('Example #2', { tag: ['@_bddphone'] }, async ({ Given, When, Then, And, page }) => { 
      await Given('user navigates to login page', null, { page }); 
      await When('user enters username "22222New_2345@newreally.com" and password "222222Bb/dffg3412345678"', null, { page }); 
      await Then('user is navigated to shop page', null, { page }); 
      await And('iPhone X product should be present on the page', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\13_bddPhone.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":14,"tags":["@_bddphone"],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given user navigates to login page","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When user enters username \"New_2345@newreally.com\" and password \"Bb/dffg3412345678\"","stepMatchArguments":[{"group":{"start":21,"value":"\"New_2345@newreally.com\"","children":[{"start":22,"value":"New_2345@newreally.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":59,"value":"\"Bb/dffg3412345678\"","children":[{"start":60,"value":"Bb/dffg3412345678","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then user is navigated to shop page","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And iPhone X product should be present on the page","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":15,"tags":["@_bddphone"],"steps":[{"pwStepLine":16,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given user navigates to login page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When user enters username \"22222New_2345@newreally.com\" and password \"222222Bb/dffg3412345678\"","stepMatchArguments":[{"group":{"start":21,"value":"\"22222New_2345@newreally.com\"","children":[{"start":22,"value":"22222New_2345@newreally.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":64,"value":"\"222222Bb/dffg3412345678\"","children":[{"start":65,"value":"222222Bb/dffg3412345678","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then user is navigated to shop page","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And iPhone X product should be present on the page","stepMatchArguments":[]}]},
]; // bdd-data-end