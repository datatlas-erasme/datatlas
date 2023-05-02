escribe('Backend', () => {
  beforeEach(() => cy.visit('/api/'));

  it('Should display the API documentation', () => {
    cy.get('h2').should('contain.text', 'Datatlas API');
  });
});
