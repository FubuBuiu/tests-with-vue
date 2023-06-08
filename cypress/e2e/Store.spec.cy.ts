import { makeServer } from '../../miragejs/server';

context('Store', () => {
  let server: any;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should display the store', () => {
    server.createList('product', 10);

    cy.visit('http://localhost:3000');
    cy.get('body').contains('Brand');
    cy.get('body').contains('Wrist Watch');
  });

  context('Store > Search for Products', () => {
    it('should type in the search field', () => {
      cy.visit('http://localhost:3000');
      cy.get('[id="searchInput"]')
        .type('Digitando aqui')
        .should('have.value', 'Digitando aqui');
    });

    it('should return 1 product when "Relógio bonito" is used as search term', () => {
      server.create('product', { title: 'Relógio bonito' });
      server.createList('product', 10);

      cy.visit('http://localhost:3000');
      cy.get('[id="searchInput"]').type('Relógio bonito');
      cy.get('[data-testid="searchForm"]').submit();
      cy.get('[data-testid="productCard"]').should('have.length', 1);
    });

    it('should not return any product', () => {
      server.createList('product', 10);

      cy.visit('http://localhost:3000');
      cy.get('[id="searchInput"]').type('Relógio bonito');
      cy.get('[data-testid="searchForm"]').submit();
      cy.get('[data-testid="productCard"]').should('have.length', 0);
      cy.get('body').contains(' 0 Products');
    });
  });
});
