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

    cy.visit('/');
    cy.get('body').contains('Brand');
    cy.get('body').contains('Wrist Watch');
  });

  context.only('Store > Shopping Cart', () => {
    const quantity = 8;

    beforeEach(() => {
      server.createList('product', quantity);
      cy.visit('/');
    });

    it('should not display shopping cart when page first loads', () => {
      cy.getByTestId('shoppingCart').should(
        'have.class',
        'v-navigation-drawer--close'
      );
    });

    it('should toggle shopping cart visibility when button is clicked', () => {
      cy.getByTestId('cartButton').as('cartButton');

      cy.get('@cartButton').click();

      cy.getByTestId('shoppingCart')
        .should('have.class', 'v-navigation-drawer--open')
        .and('not.have.class', 'v-navigation-drawer--close');

      cy.get('@cartButton').click({ force: true });

      cy.getByTestId('shoppingCart')
        .should('have.class', 'v-navigation-drawer--close')
        .and('not.have.class', 'v-navigation-drawer--open');
    });

    it('should open shopping cart when product is added', () => {
      cy.addToCart({index:2});

      cy.getByTestId('shoppingCart').should(
        'have.class',
        'v-navigation-drawer--open'
      );
    });

    it.only('should add first product to the cart', () => {
      cy.addToCart({index:0});

      cy.getByTestId('cartItem').should('have.length', 1);
    });

    it.only('should add 3 products to the cart', () => {
      cy.addToCart({indexes:[2, 4, 6]});

      cy.getByTestId('cartItem').should('have.length', 3);
    });

    it('should add all products to cart', () => {
      cy.addToCart({indexes: 'all'});

      cy.getByTestId('cartItem').should('have.length', quantity);
    });
  });

  context('Store > Product List', () => {
    it('should display "0 Products" when no product os returned', () => {
      cy.visit('/');
      cy.getByTestId('productCard').should('have.length', 0);
      cy.get('body').contains('0 Products');
    });

    it('should display "1 Product" when 1 product is returned', () => {
      server.create('product');

      cy.visit('/');
      cy.getByTestId('productCard').should('have.length', 1);
      cy.get('body').contains('1 Product');
    });

    it('should display "10 Products" when 10 products are returned', () => {
      server.createList('product', 10);

      cy.visit('/');
      cy.getByTestId('productCard').should('have.length', 10);
      cy.get('body').contains('10 Products');
    });
  });

  context('Store > Search for Products', () => {
    it('should type in the search field', () => {
      cy.visit('/');
      cy.get('[id="searchInput"]')
        .type('Digitando aqui')
        .should('have.value', 'Digitando aqui');
    });

    it('should return 1 product when "Relógio bonito" is used as search term', () => {
      server.create('product', { title: 'Relógio bonito' });
      server.createList('product', 10);

      cy.visit('/');
      cy.get('[id="searchInput"]').type('Relógio bonito');
      cy.getByTestId('searchForm').submit();
      cy.getByTestId('productCard').should('have.length', 1);
    });

    it('should not return any product', () => {
      server.createList('product', 10);

      cy.visit('/');
      cy.get('[id="searchInput"]').type('Relógio bonito');
      cy.getByTestId('searchForm').submit();
      cy.getByTestId('productCard').should('have.length', 0);
      cy.get('body').contains(' 0 Products');
    });
  });
});
