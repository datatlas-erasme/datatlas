import type { CreateUserDto, GetUserDto } from '@datatlas/dtos';
import { Roles } from '@datatlas/models';
import { faker } from '@faker-js/faker';

describe('USER ACTIONS', () => {
  // DATA
  const user_test_editor: CreateUserDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Roles.EDITOR,
    active: true,
  };
  const user_test_admin: CreateUserDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Roles.ADMIN,
    active: true,
  };
  let editorToken: string;
  let adminToken: string;
  let editorId: number;
  let adminId: number;
  let createdEditorId: number;
  let createdAdminId: number;
  // AUTHENTICATION
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
  it('Should fail when trying to connect incomplete credentials 1/2.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'wrong_email',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should fail when trying to connect incomplete credentials 2/2.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        password: 'wrong_password',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should fail when trying to connect incorrect credentials 1.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'wrong@email.org',
        password: 'incoherent_password',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should fail when trying to connect incorrect credentials 2 (incorrect password).', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'editor@example.org',
        password: 'incorrect_password',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should fail when trying to connect incorrect credentials 3 (correct password but incorrect username).', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'editor@example.org_',
        password: 'editor',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Should returns a user id and token when trying to connect with proper editor credentials.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'editor@example.org',
        password: 'editor',
      },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<{ access_token: string; user_id: number }>) => {
      expect(response.status).to.eq(201);
      expect(response.body.access_token).to.be.a('string');
      expect(response.body.user_id).to.be.a('number');
      editorToken = response.body.access_token;
      editorId = response.body.user_id;
    });
  });
  it('Should returns a user id and token when trying to connect with proper admin credentials.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'admin@example.org',
        password: 'admin',
      },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<{ access_token: string; user_id: number }>) => {
      expect(response.status).to.eq(201);
      expect(response.body.access_token).to.be.a('string');
      expect(response.body.user_id).to.be.a('number');
      adminToken = response.body.access_token;
      adminId = response.body.user_id;
    });
  });
  it('Should fail when trying to create user without authentication.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_editor,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when trying to create user with empty bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_editor,
      auth: {
        bearer: '',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when trying to create user with incorrect bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_editor,
      auth: {
        bearer: 'incorrect_token',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when trying to create user with editor bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_editor,
      auth: {
        bearer: editorToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should return new user when trying to create user with admin bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_editor,
      auth: {
        bearer: adminToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.role).to.eq(user_test_editor.role);
      expect(response.body.email).to.eq(user_test_editor.email);
      expect(response.body.active).to.eq(user_test_editor.active);
      createdEditorId = response.body.id;
    });
  });
  it('Should return new user when trying to create an admin user with admin bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_admin,
      auth: {
        bearer: adminToken,
      },
      failOnStatusCode: false,
    }).then((response: Cypress.Response<GetUserDto>) => {
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.role).to.eq(user_test_admin.role);
      expect(response.body.email).to.eq(user_test_admin.email);
      expect(response.body.active).to.eq(user_test_admin.active);
      createdAdminId = response.body.id;
    });
  });
  it('Should fail when trying to add user with already used email (with admin bearer token).', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: user_test_editor,
      auth: {
        bearer: adminToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
  it('Should return data user when requesting info about himself as an editor.', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/${editorId}`,
      failOnStatusCode: false,
      auth: {
        bearer: editorToken,
      },
    }).then((response: Cypress.Response<GetUserDto>) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.email).to.eq('editor@example.org');
      expect(response.body.role).to.eq('EDITOR');
      expect(response.body.active).to.eq('true');
    });
  });
  it('Should fail when requesting info about another user as an editor.', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/${createdEditorId}`,
      failOnStatusCode: false,
      auth: {
        bearer: editorToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should return data user when requesting info about himself as an admin.', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/${adminId}`,
      failOnStatusCode: false,
      auth: {
        bearer: adminToken,
      },
    }).then((response: Cypress.Response<GetUserDto>) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.email).to.eq('admin@example.org');
      expect(response.body.role).to.eq('ADMIN');
      expect(response.body.active).to.eq('true');
    });
  });
  it('Should return data user when requesting info about another user as an admin.', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/${createdEditorId}`,
      failOnStatusCode: false,
      auth: {
        bearer: adminToken,
      },
    }).then((response: Cypress.Response<GetUserDto>) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.email).to.eq(user_test_editor.email);
      expect(response.body.role).to.eq(user_test_editor.role);
      expect(response.body.active).to.eq('true');
    });
  });
  it('Should return data from all users when requesting them as an admin.', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/`,
      failOnStatusCode: false,
      auth: {
        bearer: adminToken,
      },
    }).then((response: Cypress.Response<GetUserDto[]>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('array');
    });
  });
  it('Should fail when trying to get all users as an editor.', () => {
    cy.request({
      method: 'GET',
      url: `/api/users/`,
      failOnStatusCode: false,
      auth: {
        bearer: editorToken,
      },
    }).then((response: Cypress.Response<GetUserDto[]>) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should return data user when updating its data with admin bearer token.', () => {
    const mail = faker.internet.email();
    cy.request({
      method: 'PUT',
      url: `/api/users/${createdEditorId}`,
      body: {
        email: mail,
        password: faker.internet.password(),
        role: Roles.EDITOR,
        active: true,
      },
      auth: {
        bearer: adminToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.email).to.eq(mail);
      expect(response.body.role).to.eq(Roles.EDITOR);
      expect(response.body.active).to.eq(true);
      expect(response.body.id).to.eq(String(createdEditorId));
    });
  });
  it('Should return data user when an editor tries to update his/her own data.', () => {
    const mail = faker.internet.email();
    cy.request({
      method: 'PUT',
      url: `/api/users/${editorId}`,
      body: {
        email: mail,
        password: faker.internet.password(),
        role: Roles.EDITOR,
        active: true,
      },
      auth: {
        bearer: editorToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.email).to.eq(mail);
      expect(response.body.role).to.eq(Roles.EDITOR);
      expect(response.body.active).to.eq(true);
      expect(response.body.id).to.eq(String(editorId));
    });
  });
  it('Should fail when an editor tries to modify another user.', () => {
    const mail = faker.internet.email();
    cy.request({
      method: 'PUT',
      url: `/api/users/${createdEditorId}`,
      body: {
        email: mail,
        password: faker.internet.password(),
        role: Roles.EDITOR,
        active: true,
      },
      auth: {
        bearer: editorToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when updating user with already used email.', () => {
    cy.request({
      method: 'PUT',
      url: `/api/users/${createdEditorId}`,
      body: {
        email: 'admin@example.org',
        password: faker.internet.password(),
        role: Roles.EDITOR,
        active: true,
      },
      auth: {
        bearer: adminToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
  it('Should fail when an editor tries to delete any user.', () => {
    cy.request({
      method: 'DELETE',
      url: `/api/users/${createdEditorId}`,
      auth: {
        bearer: editorToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should return HTML code 204 when admin suppresses a user.', () => {
    cy.request({
      method: 'DELETE',
      url: `/api/users/${createdEditorId}`,
      auth: {
        bearer: adminToken,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
/*
  it('Editor -> Deletion of any user -> should fail.', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/users/' + idUserTestEditor,
      failOnStatusCode: false,
      auth: {
        bearer: jwtEditorUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Admin -> Deletion of editor created for tests -> should not fail.', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/users/' + idUserTestEditor,
      failOnStatusCode: false,
      auth: {
        bearer: jwtAdminUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });*/
