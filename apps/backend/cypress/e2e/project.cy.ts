import { ProjectDto } from '@datatlas/shared/models';

describe('PROJECT ACTIONS', () => {
  const test_project = new ProjectDto({
    title: 'titre projet test 2',
    draft: true,
    datasets: { toto: 'test 2' },
    description: 'description du projet 2',
    config: { toto: 'test 2' },
    version: 'version test',
    contributors: [63, 64], // Shall we really send IDs ? Maybe usernames instead ?
  });
  const test_project_modified = new ProjectDto({
    title: 'titre projet test 2_',
    draft: false,
    datasets: { toto: 'test 2_' },
    description: 'description du projet 2_',
    config: { toto: 'test 2_' },
    version: 'version test_',
    contributors: [63], // Shall we really send IDs ? Maybe usernames instead ?
  });
  let jwtUserAdmin;
  let idUserAdmin;
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
      jwtUserAdmin = response.body.access_token;
      idUserAdmin = response.body.user_id;
      test_project.owner = idUserAdmin;
      expect(response.status).to.eq(201);
    });
  });
  it('Project -> creation of new project -> should not fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects',
      body: test_project,
      auth: {
        bearer: jwtUserAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it('Project -> get all projects -> should not fail.', () => {
    cy.request({
      method: 'GET',
      url: '/api/projects',
      auth: {
        bearer: jwtUserAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
  it('Project -> Get info about project using id', () => {
    cy.request({
      method: 'GET',
      url: '/api/projects/' + 1,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // should return a object with the project info
      expect(response.body).to.be.an('object');
    });
  });
  it('Project -> Modification', () => {
    cy.request({
      method: 'PUT',
      url: '/api/projects/' + 1,
      body: test_project_modified,
      auth: {
        bearer: jwtUserAdmin,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
  it('Project -> Delete', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/projects/' + 1,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });
});
