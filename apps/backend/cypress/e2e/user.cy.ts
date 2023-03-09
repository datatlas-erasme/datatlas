import { UserPublicDTO } from '@datatlas/shared/models';
import { Logger } from '@nestjs/common';

describe('USER ACTIONS', () => {
  const test_user = {
    username: 'utilisateur_test13',
    password: 'utilisateur_test_pw',
    role: 'editor',
    active: true,
  };
  const modified_test_user = {
    username: 'modified_utilisateur_test13',
    password: 'modified_utilisateur_test_pw',
    role: 'editor',
    active: false,
  };
  let id_test_user = null;
  it('User -> can reach API', () => {
    cy.request('GET', '/api/user').then((response) => {
      expect(response.status).equal(200);
      expect(response.body).equal('ok');
    });
  });
  it('User -> creation of new user (should return new user id)', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
      body: test_user,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.a('number').greaterThan(0);
      id_test_user = response.body;
    });
  });
  it('User -> creation of same user (should return 0)', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
      body: test_user,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.a('number').to.eq(0);
    });
  });
  it('User -> Get info about user using id', () => {
    cy.request({
      method: 'GET',
      url: '/api/user/' + id_test_user,
      failOnStatusCode: false,
    }).then((response) => {
      const userToReceive = new UserPublicDTO(id_test_user, { test_user });
      expect(response.status).to.eq(200);
      assert.isObject(response.body, userToReceive);
    });
  });
  it('User -> Modification', () => {
    cy.request({
      method: 'PUT',
      url: '/api/user/' + id_test_user,
      body: { userId: id_test_user, ...modified_test_user },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
  it('User -> Deletion', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/user/' + id_test_user,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
