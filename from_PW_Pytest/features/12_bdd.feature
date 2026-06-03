@bdd
Feature: Order Transaction
    Test related to Order Transactions


    Scenario Outline: Verify order success message in order details page
        Given Login by API using <username> and <password> and create order
        And take note of the ORDER number
        And user is on landing page

        When Login to the application using UI with same <username> and <password>
        And go to order history
        And Select order details using previous ORDER number

        Then Validate the order details - order message should be "Thank you for Shopping With Us"
        Examples:
            | username                      | password               |
            | "apiUser@apiUser.com"         | "apiUser/dffg3412345678" |
            | "33333New_2345@newreally.com" | "33333Bb/dffg3412345678" |