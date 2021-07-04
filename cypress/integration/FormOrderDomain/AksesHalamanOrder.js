const test_base_uri = Cypress.env('baseUrl');
describe('Order Page', function () {
    it('User can see the order page test', function () {
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('h3 > b')
            .contains('Selesaikan orderanmu, Sob!');
        cy.get(':nth-child(1) > .line-step > :nth-child(2)')
            .should('exist');
        cy.get(':nth-child(1) > .line-step > :nth-child(1) > .step')
            .should('have.class','active');
        cy.get('#section-add-domain > .align-items-center')
            .should('exist');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('.col-md-10 > .form-group > .form-control')
            .should('exist')
            .and('have.attr','placeholder','Enter domain');
        cy.get('.col-md-2 > .btn')
            .should('exist')
            .and('to.contain','Cari');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('exist');
        cy.get('#tambahLayanan')
            .should('exist')
            .and('to.contain','Tambah Layanan');
        
        // Form Order Layanan
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobabelidomaintesting.com{enter}');
        cy.wait(1000);
        cy.get('.section-tambah-domain > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#item-cart > :nth-child(1) > :nth-child(4) > :nth-child(1)')
            .contains('cobabelidomaintesting.com');

        // Halaman Domain
        cy.visit(test_base_uri+'/orders/domains');
        cy.get('#section-add-domain > .align-items-center')
            .should('exist');
        cy.get('#section-add-domain > .align-items-center > .form-title')
            .contains('Tambah Domain');
        cy.get('#tambah-layanan-baru > .align-items-center')
            .should('exist');
        cy.get('#tambahLayanan')
            .contains('Tambah Layanan');
        cy.get('#item-cart > .item > :nth-child(2) > :nth-child(1)')
            .contains('ID FAME');
        cy.get('#item-cart > .item > :nth-child(4) > :nth-child(1)')
            .contains('cobabelidomaintesting.com');

        //Buy domain
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cobacypressss.com');
        cy.get('.align-items-center > .input_pencarian_domain > .col-md-2 > .btn')
            .click();
        cy.wait(5000);
        cy.get('.panel-penawaran > .hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('.show-domain-serupa > :nth-child(1) > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        cy.get('#panel1 > .panel-heading')
            .contains('Domain Baru');
        cy.get('#panel2 > .panel-heading')
            .contains('Domain Baru');
        //cart
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get('#item-cart > :nth-child(3) > :nth-child(1) > .title')
            .contains('Registrasi Domain');

        //Halaman form order layanan
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get('#panel1 > .panel-heading')
            .contains('Domain Baru');
        cy.get('#panel2 > .panel-heading')
            .contains('Domain Baru');
        //cart
        cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
            .contains('Registrasi Domain');
        cy.get('#item-cart > :nth-child(3) > :nth-child(1) > .title')
            .contains('Registrasi Domain');
    });

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});