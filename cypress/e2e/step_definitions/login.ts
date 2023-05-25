import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../../pages/LoginPage';

Given('I am not logged in and open the application', () => {
  cy.visit('/');
});

When('I sign in as a manager user', () => {
  const usernameValue = Cypress.env('EMPLOYEE_USERNAME');
  const passwordValue = Cypress.env('EMPLOYEE_PASSWORD');
  loginPage.submitLogin(usernameValue, passwordValue);
});

When('I provide incorrect credentials, and click on the login button', () => {
  loginPage.submitLogin('invalid', 'invalid');
});

Then('I will be on the applications list page', () => {
  cy.url().should('contains', '/listApplications');
});

Then('I can view the login form', () => {
  cy.get('form').contains('Username or email address');
  cy.get('form').contains('Password');
});

Then('The error message {string} is displayed', (errorMessage) => {
  loginPage.elements.errorMessage().should('have.text', errorMessage);
});

Then('the page passes accessibility standards', () => {
  cy.runAccessibility();
});
