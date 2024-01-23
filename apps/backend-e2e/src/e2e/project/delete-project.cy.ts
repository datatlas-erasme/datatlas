import { generateFakeCreateProjectDto } from '@datatlas/dtos/generators';
import { createUpdateProjectDtoFromProjectDto } from './update-project.cy';

describe('deleting a project', () => {
  describe('As an editor', () => {
    it('Should succeed', () => {
      // First, find out the contributor id.
      cy.login(Cypress.env('editor_credentials')).then(() => {
        cy.authenticatedRequest({
          method: 'GET',
          url: '/api/users/me',
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).not.to.be.null;
          const contributorId = response.body.id;

          // Then create a project as admin.
          cy.login(Cypress.env('admin_credentials')).then(() => {
            cy.authenticatedRequest({
              method: 'POST',
              url: '/api/projects',
              body: generateFakeCreateProjectDto(),
            }).then((response) => {
              expect(response.status).to.eq(201);
              expect(response.body.id).not.to.be.null;
              const projectDto = response.body;

              // Then add they to the list of contributors.
              cy.authenticatedRequest({
                method: 'PUT',
                url: `/api/projects/${projectDto.id}`,
                body: createUpdateProjectDtoFromProjectDto(projectDto, { contributorsIds: [contributorId] }),
              }).then((response) => {
                expect(response.status).to.eq(200);

                // Finally, attempt to delete the project as they.
                cy.login(Cypress.env('editor_credentials')).then(() => {
                  cy.authenticatedRequest({
                    method: 'DELETE',
                    url: `/api/projects/${response.body.id}`,
                    failOnStatusCode: false,
                  }).then((response) => {
                    expect(response.status).to.eq(403);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
