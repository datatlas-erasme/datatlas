import { faker } from '@faker-js/faker';

describe('Authentication', () => {
  /*
      TESTS TO MAKE IN THIS ORDER
      - Connecting with incorrect user.

      - Connecting with proper user admin but wrong admin password.
      - Connecting correctly with admin user.
      - Check self-profile of admin user with wrong jwt.
      - Check self-profile with correct jwt.

      - Connecting with proper user editor but wrong editor password.
      - Connecting correctly with editor user.
      - Check self-profile of editor user with wrong jwt.
      - Check self-profile with correct jwt.
   */
  it('Should fail when trying to connect without any credentials 1/2.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should fail when trying to connect without any credentials 2/2.', () => {
    cy.request({
      method: 'GET',
      url: '/api/auth/login',
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it('Should fail when trying to connect without any data 1/2.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should fail when trying to connect without any data 2/2.', () => {
    cy.request({
      method: 'GET',
      url: '/api/auth/login',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
  it('Connecting with incorrect user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Connecting with proper user admin but wrong admin password.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'admin@example.org',
        password: faker.internet.password(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Connecting correctly with admin user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        username: 'admin@example.org',
        password: 'admin',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it('Login as admin.', () => {
    cy.login(Cypress.env('admin_credentials'));
  });
  it('Connecting with proper editor user but wrong password.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'editor@example.org',
        password: 'unknown_user_pw',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Login as an editor', () => {
    cy.login(Cypress.env('editor_credentials'));
  });
});
