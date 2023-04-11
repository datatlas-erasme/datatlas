describe('AUTHENTIFICATION TESTS', () => {
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

  /*
      SENSIBLE DATA MUST BE SENT WITH COMMAND LINE AND OVERRIDE FOLLOWING DEFAULT ONES :
   */
  let jwtUser = {};
  let idUserAdmin;
  let idUserEditor;

  /*
      TESTS
   */
  it('Auth -> Connecting with incorrect user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        username: 'unknown_user_toto', // todo make it random (using faker ?)
        password: 'unknown_user_pw',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
  it('Auth -> Connecting with proper user admin but wrong admin password.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        username: 'admin',
        password: 'unknown_user_pw',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
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
      jwtUser = response.body.access_token;
      idUserAdmin = response.body.user_id;
      expect(response.status).to.eq(201);
    });
  });
  it('Auth -> Check self-profile of admin user with wrong jwt.', () => {
    cy.request({
      method: 'GET',
      url: `/api/user/${idUserAdmin}`,
      failOnStatusCode: false,
      auth: {
        bearer: 'incorrect_jwt',
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Auth -> Check self-profile of admin user with correct jwt.', () => {
    cy.request({
      method: 'GET',
      url: `/api/user/${idUserAdmin}`,
      failOnStatusCode: false,
      auth: {
        bearer: jwtUser,
      },
    }).then((response) => {
      expect(response.body.id).to.eq(idUserAdmin);
      expect(response.body.role).to.eq('ADMIN');
      expect(response.body.active).to.eq(true);
      expect(response.body.username).to.eq('admin');
      expect(response.status).to.eq(200);
    });
  });
  it('Auth -> Connecting with proper editor user but wrong password.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        username: 'editor',
        password: 'unknown_user_pw',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
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
      jwtUser = response.body.access_token;
      idUserEditor = response.body.user_id;
      expect(response.status).to.eq(201);
    });
  });
  it('Auth -> Check self-profile of editor user with wrong jwt.', () => {
    cy.request({
      method: 'GET',
      url: `/api/user/${idUserEditor}`,
      failOnStatusCode: false,
      auth: {
        bearer: 'incorrect_jwt',
      },
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });
  it('Auth -> Check self-profile of editor user with correct jwt.', () => {
    cy.request({
      method: 'GET',
      url: `/api/user/${idUserEditor}`,
      failOnStatusCode: false,
      auth: {
        bearer: jwtUser,
      },
    }).then((response) => {
      expect(response.body.id).to.eq(idUserEditor);
      expect(response.body.role).to.eq('EDITOR');
      expect(response.body.active).to.eq(true);
      expect(response.body.username).to.eq('editor');
      expect(response.status).to.eq(200);
    });
  });
});
