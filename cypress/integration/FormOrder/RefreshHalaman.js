const test_base_uri = Cypress.env('baseUrl');
describe('When the Page is Refreshed', function () {
    it('Cart rules when the page is refreshed test', function () {
        cy.visit(test_base_uri+'/orders/products/421');
        cy.get(':nth-child(8) > .section-tambah-domain > .input_pencarian_domain > .col-md-10 > .form-group > .form-control')
            .type('cypress-form-order.com{enter}');
        cy.get('.hasilpencarian-domain > .wrapper-domain-available > .col-md-12 > .display-domain > .flex-row > .btn-orange')
            .click();
        //Tambah Layanan dan gunakan domain
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.get('[data-index="1"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .click();
        cy.wait(5000);
        cy.get('.btn-gunakan-domain')
            .click();
        cy.get('.btn-gunakan-domain').should('be.disabled');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'ID FAME');
        cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'qw.com');

        //Tambah layanan dan transfer domain
        cy.get('#tambahLayanan')
            .click();
        cy.get('.modal-body > .dropdown_select_wrapper > .default_option > li')
            .click();
        cy.get(':nth-child(1) > .accordion > .accordion__item > .accordion__item__header')
            .click();
        cy.get('[data-groupid="1"]')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-10 > .form-group > .form-control')
            .type('qw.com');
        cy.wait(3000);
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .row > .col-md-2 > .btn')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .wrapper-domain-nonavailable > .col-md-12 > .display-domain > .flex > .btn-transfer-domain')
            .click();
        cy.get('[data-index="2"] > .panel-body > .maximize-panel > :nth-child(8) > .section-tambah-domain > .hasilpencarian-domain > .row > .col-md-12 > .display-domain > .flex-row > .form-control')
            .type('12345');
        cy.get('.submit-eppcode')
            .click();
        cy.get('#item-cart > :nth-child(3) > :nth-child(2) > :nth-child(1)')
            .should('to.contain', 'ID FAME');
        cy.get('#item-cart > :nth-child(3) > :nth-child(2) > :nth-child(2)')
            .should('to.contain', 'Rp. 144.000');
        cy.get(':nth-child(3) > :nth-child(4)')
            .should('to.contain', 'qw.com');
        cy.get(':nth-child(3) > :nth-child(4) > :nth-child(2)')
            .should('to.contain', 'Rp. 145.000');

        cy.get('.price')
            .should('to.contain', 'Rp. 790.900');

        cy.reload()
            .should(() => {
                expect('[data-index="0"]').to.exist;
                expect('[data-index="1"]').to.exist;
                expect('.cart-summary-wrapper > .panel').to.exist;
                cy.get('.item > :nth-child(1) > .title')
                    .should('to.contain', 'Cloud Hosting');
                cy.get('#item-cart > :nth-child(1) > :nth-child(2) > :nth-child(1)')
                    .should('to.contain', 'ID FAME');
                cy.get('#item-cart > :nth-child(1) > :nth-child(2) > :nth-child(2)')
                    .should('to.contain', 'Rp. 144.000');
                cy.get('#item-cart > :nth-child(1) > :nth-child(4) > :nth-child(1)')
                    .should('to.contain','cypress-form-order.com');
                cy.get(':nth-child(1) > :nth-child(4) > :nth-child(2)')
                    .should('to.contain','Rp. 142.000');
                cy.get('#item-cart > :nth-child(2) > :nth-child(1) > .title')
                    .should('to.contain','Cloud Hosting');
                cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
                    .should('to.contain','ID FAME');
                cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(2)')
                    .should('to.contain','Rp. 144.000');
                cy.get('#item-cart > :nth-child(2) > :nth-child(2) > :nth-child(1)')
                    .should('to.contain','qw.com');
                cy.get('#panel1 > .panel-heading > .flex-row > .header-right-panel > .flex > .maximize-icon > .fas')
                    .click();
                cy.get('.btn-gunakan-domain').should('be.disabled');
                cy.get('#item-cart > :nth-child(3) > :nth-child(1) > .title')
                    .should('to.contain','Cloud Hosting');
                cy.get('#item-cart > :nth-child(3) > :nth-child(2) > :nth-child(1)')
                    .should('to.contain', 'ID FAME');
                cy.get('#item-cart > :nth-child(3) > :nth-child(2) > :nth-child(2)')
                    .should('to.contain', 'Rp. 144.000');
                cy.get(':nth-child(3) > :nth-child(4)')
                    .should('to.contain', 'qw.com');
                cy.get(':nth-child(3) > :nth-child(4) > :nth-child(2)')
                    .should('to.contain', 'Rp. 145.000');
                cy.get('.price')
                    .should('to.contain', 'Rp. 790.900');
            });
    });
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });
});