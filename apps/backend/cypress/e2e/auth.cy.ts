import { Logger } from '@nestjs/common';

describe('AUTHENTIFICATION TESTS', () => {
  const notExistingUser = {
    username: 'not_existing_user',
    password: 'utilisateur_test_pw',
    role: 'editor',
    active: true,
  };
  const existingUserWithWrongPassword = {
    username: 'editor',
    password: 'wrong_password',
    role: 'editor',
    active: true,
  };
  const existingUserWithCorrectPassword = {
    username: 'editor',
    password: 'editor', // todo grab somehow via env var
    role: 'editor',
    active: true,
  };
  let jwtUser = {};

  it('User -> Try login with unknown username.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: notExistingUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('User -> Try login with correct username but wrong password.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: existingUserWithWrongPassword,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('User -> Try login with correct credentials.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: existingUserWithCorrectPassword,
      failOnStatusCode: false,
    }).then((response) => {
      jwtUser = response.body.access_token;
      expect(response.status).to.eq(201);
    });
  }); /*
  it('User -> Try reaching its own profile with wrong jwt.', () => {
    cy.request({
      method: 'GET',
      url: '/api/profile',
      failOnStatusCode: false,
      auth: {
        bearer: 'wrong_token',
      },
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('User -> Try reaching its own profile.', () => {
    cy.request({
      method: 'GET',
      url: '/api/profile',
      failOnStatusCode: false,
      auth: {
        bearer: jwtUser,
      },
    }).then((response) => {
      expect(response).to.eq({});
      expect(response.status).to.eq(201);
    });
  });*/
});
