describe('USER ACTIONS', () => {
  /*
      TEST TO MAKE IN THIS ORDER :
      - Test reaching API (really useful).
      - Creating, reading, updating and deleting a new user as editor wth fake jwt.
      - Creating, reading, updating and deleting a new user as editor with correct jwt.
      - Creating, reading, updating and deleting a new user as admin with fake jwt.
      - Creating, reading, updating and deleting a new user as admin with correct jwt
   */
  const user_test_editor = {
    username: 'utilisateur_test_editor_0',
    password: 'utilisateur_test_pw',
    role: 'EDITOR',
    active: true,
  };
  const user_test_admin = {
    username: 'utilisateur_test_admin_0',
    password: 'utilisateur_test_pw',
    role: 'ADMIN',
    active: true,
  };
  let jwtEditorUser;
  let idEditorUser;
  let jwtAdminUser;
  let idAdminUser;

  it('User -> can reach API', () => {
    cy.request('GET', '/api/user').then((response) => {
      expect(response.status).equal(200);
      expect(response.body).equal('ok');
    });
  });
  // EDITOR
  it('Auth -> Connecting correctly with editor user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        username: 'editor',
        password: 'editor',
      },
      failOnStatusCode: false,
    }).then((response) => {
      jwtEditorUser = response.body.access_token;
      idEditorUser = response.body.user_id;
      expect(response.status).to.eq(201);
    });
  });
  it('Editor -> creation of new user -> should fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
      body: user_test_editor,
      auth: {
        bearer: jwtEditorUser,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

  // ADMIN
  it('Auth -> Connecting correctly with admin user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        username: 'admin',
        password: 'admin',
      },
      failOnStatusCode: false,
    }).then((response) => {
      jwtAdminUser = response.body.access_token;
      idAdminUser = response.body.user_id;
      expect(response.status).to.eq(201);
    });
  });
  it('Admin -> creation of new editor user -> should not fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
      body: user_test_editor,
      auth: {
        bearer: jwtAdminUser,
      },
      failOnStatusCode: false,
    }).then((response) => {
      idEditorUser = response.body;
      expect(response.status).to.eq(201);
      expect(response.body).to.be.a('number').greaterThan(0);
    });
  });
  it('Admin -> creation of same new editor user -> should not fail but returns 0.', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
      body: {
        username: user_test_editor.username,
        password: 'random_string',
        role: 'WHATEVER',
        active:false,
      },
      auth: {
        bearer: jwtAdminUser,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.a('number').to.eq(0);
    });
  });
  it('Admin -> creation of new admin user -> should not fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/user',
      body: user_test_admin,
      auth: {
        bearer: jwtAdminUser,
      },
      failOnStatusCode: false,
    }).then((response) => {
      idAdminUser = response.body;
      expect(response.status).to.eq(201);
      expect(response.body).to.be.a('number').greaterThan(0);
    });
  });

  /*

  const modified_test_user = {
    username: 'modified_utilisateur_test13',
    password: 'modified_utilisateur_test_pw',
    role: 'editor',
    active: false,
  };
  let id_test_user = null;
  */
  /*
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

   */
});
