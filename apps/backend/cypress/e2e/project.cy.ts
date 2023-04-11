import { generateFakeProject } from '@datatlas/shared/models';
import { Logger } from '@nestjs/common';

const fakeProject = generateFakeProject();

describe('PROJECT ACTIONS', () => {
  it('Project -> creation of new project (nouveau type projets)', () => {
    cy.request({
      method: 'POST',
      url: '/api/project/',
      body: fakeProject,
      failOnStatusCode: false,
    }).then((response) => {
      Logger.log(response);
    });
  });

  /*
  const test_project = {
    title: 'project_test',
    description: 'project_test_description',
  };
  const modified_test_project = {
    title: 'modified_project_test',
    description: 'modified_project_test_description',
  };
  let id_test_project = null;
  it('Project -> creation of new project (should return new project id)', () => {
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
      url: `/api/projects/${String(1)}`,
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
      url: `/api/projects/${String(1)}`,
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
      url: `/api/projects/${String(1)}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });
});
*/
});
