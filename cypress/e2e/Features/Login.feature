@readonly
Feature: Login page

    Feature Login page will work depending on the user credentials.

    Background:
        Given I am not logged in and open the application
    Scenario: Login page form
        Then I can view the login form
    Scenario: Success Login
        When I sign in as a manager user
        Then I will be on the applications list page
    Scenario: Incorrect Username Login
        When I provide incorrect credentials, and click on the login button
        Then The error message "Your attempt to sign in has failed." is displayed
    Scenario: Accessibility check
        Then the page passes accessibility standards