// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserPublicDTO } from '../../../shared/models';

describe('USER ACTIONS', () => {
  const test_user = {
    username: 'utilisateur_test',
    password: 'utilisateur_test_pw',
    role: 'editor',
    active: true,
  };
  const modified_test_user = {
    username: 'modified_utilisateur_test',
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
  it('User -> Get all', () => {
    // TODO
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
      const userToReceive = new UserPublicDTO(id_test_user, test_user.username, test_user.role, test_user.active);
      expect(response.status).to.eq(200);
      assert.isObject(response.body, userToReceive);
    });
  });
  it('User -> Modification', () => {
    cy.request({
      // todo to finish
      method: 'PUT',
      url: '/api/user/' + id_test_user,
      body: { user_id: id_test_user, ...modified_test_user },
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
