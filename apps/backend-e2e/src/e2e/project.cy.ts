import type { CreateProjectDto, ProjectDto, UpdateProjectDto } from '@datatlas/dtos';

describe('PROJECT ACTIONS', () => {
  const testCreateProject: CreateProjectDto = {
    title: 'titre projet test 2',
    draft: true,
    datasets: [],
    description: 'description du projet 2',
    config: undefined,
    version: 'v1' as const,
    ownerId: 1,
    contributors: [63, 64], // Shall we really send IDs ? Maybe usernames instead ?
  };
  const testUpdateProjectDto: UpdateProjectDto = {
    id: 1,
    title: 'titre projet test 2_',
    draft: false,
    datasets: [],
    description: 'description du projet 2_',
    config: undefined,
    version: 'v1' as const,
    ownerId: 1,
    contributors: [63], // Shall we really send IDs ? Maybe usernames instead ?
  };
  let jwtUserAdmin;
  let idUserAdmin;
  it('Auth -> Connecting correctly with admin user.', () => {
    cy.request({
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'admin@example.org',
        password: 'admin',
      },
      failOnStatusCode: false,
    }).then((response) => {
      jwtUserAdmin = response.body.access_token;
      idUserAdmin = response.body.user_id;
      expect(response.status).to.eq(201);
    });
  });
  it('Project -> creation of new project -> should not fail.', () => {
    cy.request({
      method: 'POST',
      url: '/api/projects',
      body: testCreateProject,
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
      url: `/api/projects/${String(testUpdateProjectDto.id)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // should return an object with the project info
      expect(response.body).to.be.an('object');
    });
  });
  it('Project -> Modification', () => {
    cy.request({
      method: 'PUT',
      url: `/api/projects/${String(testUpdateProjectDto.id)}`,
      body: testUpdateProjectDto,
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
      url: `/api/projects/${String(1)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });
});
