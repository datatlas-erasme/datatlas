import { generateFakeCreateProjectDto } from '@datatlas/dtos/generators';
import { ProjectDto, UpdateProjectDto } from '@datatlas/dtos';

export const createUpdateProjectDtoFromProjectDto = (
  projectDto: ProjectDto,
  updateProjectDto?: Partial<UpdateProjectDto>
): UpdateProjectDto => {
  return {
    ...projectDto,
    ...updateProjectDto,
  };
};

describe('Updating a project', () => {
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
              let projectDto = response.body;
              const updateProjectDto = createUpdateProjectDtoFromProjectDto(projectDto, {
                contributorsIds: [contributorId],
              });
              // Then add they to the list of contributors.
              cy.authenticatedRequest({
                method: 'PUT',
                url: `/api/projects/${projectDto.id}`,
                body: updateProjectDto,
              }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.contributorsIds).not.to.be.undefined;
                expect(response.body.contributorsIds.length).to.eq(1);
                projectDto = response.body;

                // Finally, attempt to edit the project again as they.
                cy.login(Cypress.env('editor_credentials')).then(() => {
                  cy.authenticatedRequest({
                    method: 'PUT',
                    url: `/api/projects/${projectDto.id}`,
                    body: createUpdateProjectDtoFromProjectDto(projectDto),
                  }).then((response) => {
                    expect(response.status).to.eq(200);
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
