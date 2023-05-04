import type { CreateUserDto, GetUserDto } from '@datatlas/dtos';
import { Roles } from '@datatlas/models';
import { number } from 'prop-types';

describe('USER ACTIONS', () => {
  // RANDOM
  const random = 'x'
    .repeat(5)
    .replace(
      /./g,
      (c) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 62)]
    );
  // DATA
  const user_test_editor: CreateUserDto = {
    email: 'user_test_editor_' + random + '@example.org',
    password: 'user_test_pw',
    role: Roles.EDITOR,
    active: true,
  };
  const user_test_admin: CreateUserDto = {
    email: 'user_test_admin_' + random + '@example.org',
    password: 'user_test_pw',
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
      url: '/api/user',
      body: user_test_editor,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when trying to create user with empty bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
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
      url: '/api/user',
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
      url: '/api/user',
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
      url: '/api/user',
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
      url: '/api/user',
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
      url: '/api/user',
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
      url: `/api/user/${editorId}`,
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
      url: `/api/user/${createdEditorId}`,
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
      url: `/api/user/${adminId}`,
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
      url: `/api/user/${createdEditorId}`,
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
      url: `/api/user/`,
      failOnStatusCode: false,
      auth: {
        bearer: adminToken,
      },
    }).then((response: Cypress.Response<GetUserDto[]>) => {
      expect(response.status).to.eq(200);
    });
  });
});

/*
      TEST TO MAKE IN THIS ORDER :
      - Test reaching API (really useful).
      - Creating, reading, updating and deleting a new user as editor wth fake jwt.
      - Creating, reading, updating and deleting a new user as editor with correct jwt.
      - Creating, reading, updating and deleting a new user as admin with fake jwt.
      - Creating, reading, updating and deleting a new user as admin with correct jwt
   */
/*
  const user_test_editor: CreateUserDto = {
    email: 'user_test_editor_20@example.org',
    password: 'user_test_pw',
    role: Roles.EDITOR,
    active: true,
  };
  const user_test_admin: CreateUserDto = {
    email: 'user_test_admin_20@example.org',
    password: 'user_test_pw',
    role: Roles.ADMIN,
    active: true,
  };
  let jwtEditorUser;
  let idEditorUser;
  let jwtAdminUser;
  let idUserTestEditor;


  // READING
  it('Editor -> Get info about another user as an editor -> should fail.', () => {
    cy.request({
      method: 'GET',
      url: '/api/user/' + idUserTestEditor,
      failOnStatusCode: false,
      auth: {
        bearer: jwtEditorUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Admin -> Get info about another user as an admin -> should not fail.', () => {
    cy.request({
      method: 'GET',
      url: '/api/user/' + idEditorUser,
      failOnStatusCode: false,
      auth: {
        bearer: jwtAdminUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(idEditorUser);
      expect(response.body.email).to.eq('editor@example.org');
      expect(response.body.role).to.eq(Roles.EDITOR);
      expect(response.body.active).to.eq(true);
    });
  });
  // UPDATING
  it('Editor -> Modification of self is forbidden (for now)-> should fail.', () => {
    const body: UpdateUserDto = {
      id: idEditorUser,
      email: 'editor@example.org',
      password: 'editor_pw_modified',
      role: Roles.EDITOR,
      active: true,
    };
    cy.request({
      method: 'PUT',
      url: '/api/user/' + idEditorUser,
      body,
      failOnStatusCode: false,
      auth: {
        bearer: jwtEditorUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Editor -> Modification of other users is forbidden -> should fail.', () => {
    const body: UpdateUserDto = {
      id: idUserTestEditor,
      email: 'editor@example.org',
      password: 'editor_pw_modified',
      role: Roles.EDITOR,
      active: true,
    };

    cy.request({
      method: 'PUT',
      url: '/api/user/' + idUserTestEditor,
      body,
      failOnStatusCode: false,
      auth: {
        bearer: jwtEditorUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Admin -> Modification of other users with existing username -> should fail.', () => {
    const body: UpdateUserDto = {
      id: idUserTestEditor,
      email: 'editor@example.org',
      password: 'editor_pw_modified',
      role: Roles.EDITOR,
      active: true,
    };
    cy.request({
      method: 'PUT',
      url: '/api/user/' + idUserTestEditor,
      body,
      failOnStatusCode: false,
      auth: {
        bearer: jwtAdminUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
  it('Admin -> Modification of other users -> should not fail.', () => {
    const body: UpdateUserDto = {
      id: idUserTestEditor,
      email: 'random_name_jkclsbdkj@example.org',
      password: 'editor_pw_modified',
      role: Roles.EDITOR,
      active: true,
    };
    cy.request({
      method: 'PUT',
      url: '/api/user/' + idUserTestEditor,
      body,
      failOnStatusCode: false,
      auth: {
        bearer: jwtAdminUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
  it('Editor -> Deletion of any user -> should fail.', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/user/' + idUserTestEditor,
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
      url: '/api/user/' + idUserTestEditor,
      failOnStatusCode: false,
      auth: {
        bearer: jwtAdminUser,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });*/
