// Generated from: features\12_bdd.feature
import { test } from "../Fixtures/bddFixture.js";

test.describe('Order Transaction', () => {

  test.describe('Verify order success message in order details page', () => {

    test('Example #1', { tag: ['@bdd'] }, async ({ Given, When, Then, And, page, request, sharedData }) => { 
      await Given('Login by API using "apiUser@apiUser.com" and "apiUser/dffg3412345678" and create order', null, { request, sharedData }); 
      await And('take note of the ORDER number', null, { sharedData }); 
      await And('user is on landing page', null, { page }); 
      await When('Login to the application using UI with same "apiUser@apiUser.com" and "apiUser/dffg3412345678"', null, { page }); 
      await And('go to order history', null, { page }); 
      await And('Select order details using previous ORDER number', null, { page, sharedData }); 
      await Then('Validate the order details - order message should be "Thank you for Shopping With Us"', null, { page }); 
    });

    test('Example #2', { tag: ['@bdd'] }, async ({ Given, When, Then, And, page, request, sharedData }) => { 
      await Given('Login by API using "33333New_2345@newreally.com" and "33333Bb/dffg3412345678" and create order', null, { request, sharedData }); 
      await And('take note of the ORDER number', null, { sharedData }); 
      await And('user is on landing page', null, { page }); 
      await When('Login to the application using UI with same "33333New_2345@newreally.com" and "33333Bb/dffg3412345678"', null, { page }); 
      await And('go to order history', null, { page }); 
      await And('Select order details using previous ORDER number', null, { page, sharedData }); 
      await Then('Validate the order details - order message should be "Thank you for Shopping With Us"', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\12_bdd.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":18,"tags":["@bdd"],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given Login by API using \"apiUser@apiUser.com\" and \"apiUser/dffg3412345678\" and create order","stepMatchArguments":[{"group":{"start":19,"value":"\"apiUser@apiUser.com\"","children":[{"start":20,"value":"apiUser@apiUser.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":45,"value":"\"apiUser/dffg3412345678\"","children":[{"start":46,"value":"apiUser/dffg3412345678","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And take note of the ORDER number","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And user is on landing page","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When Login to the application using UI with same \"apiUser@apiUser.com\" and \"apiUser/dffg3412345678\"","stepMatchArguments":[{"group":{"start":44,"value":"\"apiUser@apiUser.com\"","children":[{"start":45,"value":"apiUser@apiUser.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":70,"value":"\"apiUser/dffg3412345678\"","children":[{"start":71,"value":"apiUser/dffg3412345678","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And go to order history","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And Select order details using previous ORDER number","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Validate the order details - order message should be \"Thank you for Shopping With Us\"","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":19,"tags":["@bdd"],"steps":[{"pwStepLine":19,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given Login by API using \"33333New_2345@newreally.com\" and \"33333Bb/dffg3412345678\" and create order","stepMatchArguments":[{"group":{"start":19,"value":"\"33333New_2345@newreally.com\"","children":[{"start":20,"value":"33333New_2345@newreally.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"33333Bb/dffg3412345678\"","children":[{"start":54,"value":"33333Bb/dffg3412345678","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And take note of the ORDER number","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And user is on landing page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When Login to the application using UI with same \"33333New_2345@newreally.com\" and \"33333Bb/dffg3412345678\"","stepMatchArguments":[{"group":{"start":44,"value":"\"33333New_2345@newreally.com\"","children":[{"start":45,"value":"33333New_2345@newreally.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":78,"value":"\"33333Bb/dffg3412345678\"","children":[{"start":79,"value":"33333Bb/dffg3412345678","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And go to order history","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And Select order details using previous ORDER number","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then Validate the order details - order message should be \"Thank you for Shopping With Us\"","stepMatchArguments":[]}]},
]; // bdd-data-end