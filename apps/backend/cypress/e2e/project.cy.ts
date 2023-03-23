describe('PROJECT ACTIONS', () => {
  const test_project = {
    title: 'project_test',
    description: 'project_test_description',
    draft: true,
    datasets: 'tutu',
    owner: 'possesseur',
    contributors: 'contributeurs',
    config: 'config',
    version: 'versionNumber',
    createdAt: 'dateCreation',
  };
  const modified_test_project = {
    title: 'modified_project_test',
    description: 'modified_project_test_description',
    draft: true,
    datasets: 'toto',
    owner: 'possesseur',
    contributors: 'contributeurs',
    config: 'config',
    version: 'versionNumber',
    createdAt: 'dateCreation',
  };
  let id_test_project = null;
  it('Project -> creation of new project (should return new project id)', () => {
    cy.request({
      method: 'POST',
      url: '/api/project',
      body: test_project,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.id).to.be.a('number').greaterThan(0);
      id_test_project = response.body.id;
    });
  });
  it('Project -> Get info about project using id', () => {
    cy.request({
      method: 'GET',
      url: '/api/project/' + id_test_project,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // should return a object with the project info
      expect(response.body).to.be.an('object');
    });
  });
  it('Project -> Get all projects', () => {
    cy.request({
      method: 'GET',
      url: '/api/projects',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      // should return an array of projects
      expect(response.body).to.be.an('array');
    });
  });
  it('Project -> Modification', () => {
    cy.request({
      method: 'PUT',
      url: '/api/project/' + id_test_project,
      body: modified_test_project,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.be.a('number').to.eq(id_test_project);
    });
  });
  it('Project -> Delete', () => {
    cy.request({
      method: 'DELETE',
      url: '/api/project/' + id_test_project,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
    });
  });
});
