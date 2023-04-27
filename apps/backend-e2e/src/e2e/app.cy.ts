import { getHeading } from '../support/app.po';

describe('backend', () => {
  beforeEach(() => cy.visit('/api/'));

  it('should display the API documentation', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getHeading().contains('Datatlas API');
  });
});
