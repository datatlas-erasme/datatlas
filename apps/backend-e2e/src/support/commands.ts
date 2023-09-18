// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import type { LoginResponse } from '@datatlas/dtos';

interface Credentials {
  email?: string;
  password?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable {
      login(credentials?: Credentials): Chainable<Response<LoginResponse>>;
      authenticatedRequest<T = any>(options: Partial<Cypress.RequestOptions>): Cypress.Chainable<Cypress.Response<T>>;
    }
  }
}

Cypress.Commands.add('login', (credentials?: Credentials) => {
  cy.log(`Attempt to login as ${credentials?.email}`);
  cy.session(
    credentials,
    () => {
      const loginRequest: Partial<Cypress.RequestOptions> = {
        method: 'POST',
        url: '/api/auth/login',
      };

      if (credentials) {
        loginRequest.body = credentials;
      }

      cy.request(loginRequest).then((response) => {
        window.localStorage.setItem('accessToken', response.body.access_token);
        window.localStorage.setItem('userId', response.body.user_id);
        // cy.log(` ${response.body.access_token} & ${response.body.user_id}`);
      });
    },
    {
      validate: () => {
        cy.request({
          url: `/api/users/${window.localStorage.getItem('userId')}`,
          method: 'GET',
          auth: { bearer: window.localStorage.getItem('accessToken') },
        })
          .its('status')
          .should('equal', 200);
      },
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add(
  'authenticatedRequest',
  <T = any>(options: Partial<Cypress.RequestOptions>): Cypress.Chainable<Cypress.Response<T>> => {
    const requestOptions = {
      failOnStatusCode: false,
      ...options,
    };

    if (localStorage.getItem('accessToken')) {
      requestOptions.auth = { bearer: localStorage.getItem('accessToken') };
    }

    return cy.request(requestOptions);
  }
);

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
