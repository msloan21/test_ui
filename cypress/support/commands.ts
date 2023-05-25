/// <reference types="cypress" />

Cypress.Commands.add('employeeLogin', () => {
	cy.visit('/');
	const usernameValue = Cypress.env('EMPLOYEE_USERNAME');
	const passwordValue = Cypress.env('EMPLOYEE_PASSWORD');
	cy.get('#username').type(usernameValue).should('have.value', usernameValue);
	cy.get('#password').type(passwordValue).should('have.value', passwordValue);
	cy.get('button[type="submit"]').click();
	cy.wait(700);
  });
  
  Cypress.Commands.add('hardReload', () => {
	cy.clearLocalStorage().reload();
  });
  
  Cypress.Commands.add('runAccessibility', () => {
	cy.injectAxe();
	cy.configureAxe();
	cy.checkA11y(null, {
	  includedImpacts: ['serious', 'critical'],
	});
  });