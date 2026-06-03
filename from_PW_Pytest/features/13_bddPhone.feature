@_bddphone

Feature: iPhone X Product Verification
    Verify that iPhone X product is available on the shop page after login

    Scenario Outline: Verify iPhone X product is present on shop page
        Given user navigates to login page
        When user enters username <username> and password <password>
        Then user is navigated to shop page
        And iPhone X product should be present on the page

        Examples:
            | username                      | password                  |
            | "New_2345@newreally.com"      | "Bb/dffg3412345678"       |
            | "22222New_2345@newreally.com" | "222222Bb/dffg3412345678" |
