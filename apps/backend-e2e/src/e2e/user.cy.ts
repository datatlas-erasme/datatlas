import type { CreateUserDto, GetUserDto } from '@datatlas/dtos';
import { Roles } from '@datatlas/models';
import { faker } from '@faker-js/faker';

describe('User operations', () => {
  // DATA
  const createEditorPayload: CreateUserDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Roles.EDITOR,
    active: true,
  };
  const createAdminPayload: CreateUserDto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Roles.ADMIN,
    active: true,
  };

  // CREATE
  it('Should fail when trying to create user without authentication.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: createEditorPayload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when trying to create user with empty bearer token.', () => {
    cy.request({
      method: 'POST',
      url: '/api/users',
      body: createEditorPayload,
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
      body: createEditorPayload,
      auth: {
        bearer: 'incorrect_token',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when trying to create user as an editor.', () => {
    cy.login(Cypress.env('editor_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: createEditorPayload,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Should fail when sending incomplete data for user creation.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {
        password: faker.internet.password(),
        role: Roles.EDITOR,
        active: true,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
  it('Should return new user when trying to create user with admin bearer token.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: createEditorPayload,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.role).to.eq(createEditorPayload.role);
      expect(response.body.email).to.eq(createEditorPayload.email);
      expect(response.body.active).to.eq(createEditorPayload.active);
    });
  });
  it('Should return new user when trying to create an admin user, as an admin.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: createAdminPayload,
    }).then((response: Cypress.Response<GetUserDto>) => {
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      expect(response.body.role).to.eq(createAdminPayload.role);
      expect(response.body.email).to.eq(createAdminPayload.email);
      expect(response.body.active).to.eq(createAdminPayload.active);
    });
  });
  it('Should fail when trying to add user with already used email, as an admin', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: createEditorPayload,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
  // READ
  it('Request self data as an editor.', () => {
    cy.login(Cypress.env('editor_credentials')).then(() => {
      cy.authenticatedRequest({
        method: 'GET',
        url: `/api/users/${window.localStorage.getItem('userId')}`,
      }).then((response: Cypress.Response<GetUserDto>) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.be.a('number').greaterThan(0);
        expect(response.body.email).to.eq(Cypress.env('editor_credentials').email);
        expect(response.body.role).to.eq(Roles.EDITOR);
        expect(response.body.active).to.eq(true);
      });
    });
  });
  it('Should succeed when requesting info about another user as an editor.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: { ...createEditorPayload, email: faker.internet.email() },
    }).then((response: Cypress.Response<GetUserDto>) => {
      cy.login(Cypress.env('editor_credentials'));
      cy.authenticatedRequest({
        method: 'GET',
        url: `/api/users/${response.body.id}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  it('Should return data user when requesting info about himself as an admin.', () => {
    cy.login(Cypress.env('admin_credentials')).then(() => {
      cy.authenticatedRequest({
        method: 'GET',
        url: `/api/users/${window.localStorage.getItem('userId')}`,
      }).then((response: Cypress.Response<GetUserDto>) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.be.a('number').greaterThan(0);
        expect(response.body.email).to.eq(Cypress.env('admin_credentials').email);
        expect(response.body.role).to.eq(Roles.ADMIN);
        expect(response.body.active).to.eq(true);
      });
    });
  });
  it('Should return data user when requesting info about another user as an admin.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: { ...createEditorPayload, email: faker.internet.email() },
    }).then((response: Cypress.Response<GetUserDto>) => {
      expect(response.body.id).to.be.a('number').greaterThan(0);
      cy.authenticatedRequest({
        method: 'GET',
        url: `/api/users/${response.body.id}`,
      }).then((response: Cypress.Response<GetUserDto>) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  it('Should return data from all users when requesting them as an admin.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'GET',
      url: `/api/users/`,
      failOnStatusCode: false,
    }).then((response: Cypress.Response<GetUserDto[]>) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
  it('Should succeed when trying to get all users as an editor.', () => {
    cy.login(Cypress.env('editor_credentials'));
    cy.authenticatedRequest({
      method: 'GET',
      url: `/api/users/`,
    }).then((response: Cypress.Response<GetUserDto[]>) => {
      expect(response.status).to.eq(200);
    });
  });
  // UPDATE
  it('An admin may update his/her own data.', () => {
    cy.login(Cypress.env('admin_credentials')).then(() => {
      const name = faker.name.fullName();
      cy.authenticatedRequest({
        method: 'PUT',
        url: `/api/users/${window.localStorage.getItem('userId')}`,
        body: {
          name,
          ...Cypress.env('admin_credentials'),
          active: true,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(name);
      });
    });
  });
  it('An admin may NOT update another user data.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: { ...createEditorPayload, email: faker.internet.email() },
    }).then((response) => {
      const name = faker.name.fullName();
      cy.authenticatedRequest({
        method: 'PUT',
        url: `/api/users/${response.body.id}`,
        body: {
          name,
          email: faker.internet.email(),
          password: faker.internet.password(),
          active: true,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(name);
      });
    });
  });
  it('And editor may update his/her own data', () => {
    cy.login(Cypress.env('editor_credentials')).then(() => {
      const name = faker.name.fullName();
      cy.authenticatedRequest({
        method: 'PUT',
        url: `/api/users/${window.localStorage.getItem('userId')}`,
        body: {
          name,
          ...Cypress.env('editor_credentials'),
          active: true,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(name);
      });
    });
  });
  it('Should fail when an editor tries to modify another user', () => {
    const mail = faker.internet.email();
    cy.login(Cypress.env('editor_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: { ...createEditorPayload, email: faker.internet.email() },
    }).then((response) => {
      cy.authenticatedRequest({
        method: 'PUT',
        url: `/api/users/${response.body.id}`,
        body: {
          email: mail,
          password: faker.internet.password(),
          role: Roles.EDITOR,
          active: true,
        },
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });
  it('Should fail when updating user with already used email.', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: createEditorPayload,
    }).then((response) => {
      cy.authenticatedRequest({
        method: 'PUT',
        url: `/api/users/${response.body.id}`,
        body: {
          email: 'admin@example.org',
          password: faker.internet.password(),
          role: Roles.EDITOR,
          active: true,
        },
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });
  // DELETE
  it('Should fail when an editor tries to delete any user', () => {
    cy.login(Cypress.env('admin_credentials'));
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: { ...createEditorPayload, email: faker.internet.email() },
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.body.id).to.be.a('number').greaterThan(0);
      cy.login(Cypress.env('editor_credentials')).then(() => {
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `/api/users/${response.body.id}`,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(403);
        });
      });
    });
  });
  it('An admin may delete any user', () => {
    cy.login(Cypress.env('admin_credentials')).then(() => {
      cy.authenticatedRequest({
        method: 'POST',
        url: '/api/users',
        body: { ...createEditorPayload, email: faker.internet.email() },
      }).then((response: Cypress.Response<GetUserDto>) => {
        expect(response.body.id).to.be.a('number').greaterThan(0);
        cy.authenticatedRequest({
          method: 'DELETE',
          url: `/api/users/${response.body.id}`,
        }).then((response) => {
          expect(response.status).to.eq(204);
        });
      });
    });
  });
});
