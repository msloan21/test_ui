/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
	  /**
	   * Login to the application
	   * @example
	   * cy.employeeLogin()
	   */
	  employeeLogin(): Chainable<any>;
	  /**
	   * Clear cache and login
	   * @example
	   * cy.hardReload()
	   */
	  hardReload(): Chainable<any>;
	  runAccessibility(): Chainable<any>;
	}
  }